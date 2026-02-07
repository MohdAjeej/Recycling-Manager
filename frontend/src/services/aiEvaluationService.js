/**
 * AI Evaluation Service
 * Uses Google Gemini API for evaluations, with mock fallback
 */

// Configuration - Set your Gemini API key in environment variables
const API_CONFIG = {
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
    baseURL: 'https://generativelanguage.googleapis.com/v1',
  },
  useMock: !import.meta.env.VITE_GEMINI_API_KEY,
}

// Track if API has been tested and failed (to avoid repeated attempts)
let apiTested = false
let apiWorking = false
let apiTestPromise = null // Promise to track ongoing API test

/**
 * Crisis Management Evaluation Prompt
 */
const CRISIS_MANAGEMENT_PROMPT = `You are an expert HR evaluator specializing in production line management roles. Your task is to evaluate candidates' crisis management capabilities for a recycling production line manager position.

Rate the candidate on a scale of 0-100 based on:
1. Experience with Production Disruptions (30 points) - Years of experience handling equipment failures, supply chain interruptions, or quality issues
2. Decision-Making Under Pressure (30 points) - Evidence of quick, effective decision-making in high-stress situations
3. Communication & Coordination (25 points) - Skill in coordinating cross-functional teams during emergencies
4. Problem-Solving Approach (15 points) - Systematic approach to identifying root causes

Candidate Profile:
- Name: {name}
- Experience: {experience_years} years
- Previous Role: {previous_role}
- Skills: {skills}
- Education: {education}

Provide a JSON response with:
{
  "score": <number 0-100>,
  "feedback": "<2-3 sentence evaluation>",
  "key_strengths": ["<strength1>", "<strength2>"],
  "areas_for_development": ["<area1>", "<area2>"]
}`

/**
 * Sustainability Knowledge Evaluation Prompt
 */
const SUSTAINABILITY_PROMPT = `You are an expert evaluator assessing candidates' knowledge and commitment to sustainability practices, specifically for recycling and waste management operations.

Rate the candidate on a scale of 0-100 based on:
1. Environmental Knowledge (35 points) - Understanding of recycling processes, material sorting, and waste reduction
2. Sustainability Experience (30 points) - Direct experience with recycling operations, waste management, or environmental compliance
3. Commitment & Values (20 points) - Alignment with sustainability goals and evidence of environmental responsibility
4. Innovation in Sustainability (15 points) - Ability to identify opportunities for waste reduction and creative solutions

Candidate Profile:
- Name: {name}
- Experience: {experience_years} years
- Previous Role: {previous_role}
- Skills: {skills}
- Education: {education}

Provide a JSON response with:
{
  "score": <number 0-100>,
  "feedback": "<2-3 sentence evaluation>",
  "key_strengths": ["<strength1>", "<strength2>"],
  "areas_for_development": ["<area1>", "<area2>"]
}`

/**
 * Team Motivation Evaluation Prompt
 */
const TEAM_MOTIVATION_PROMPT = `You are an expert evaluator assessing candidates' ability to lead, motivate, and develop production teams in a recycling facility environment.

Rate the candidate on a scale of 0-100 based on:
1. Leadership Experience (30 points) - Years of experience managing teams, team size and complexity
2. Motivation Techniques (25 points) - Evidence of effective motivation strategies and maintaining morale
3. Employee Development (25 points) - Commitment to training, skill development, and mentoring
4. Communication & Engagement (20 points) - Clear communication with diverse teams and conflict resolution skills

Candidate Profile:
- Name: {name}
- Experience: {experience_years} years
- Previous Role: {previous_role}
- Skills: {skills}
- Education: {education}

Provide a JSON response with:
{
  "score": <number 0-100>,
  "feedback": "<2-3 sentence evaluation>",
  "key_strengths": ["<strength1>", "<strength2>"],
  "areas_for_development": ["<area1>", "<area2>"]
}`

/**
 * Replace placeholders in prompt template
 */
function formatPrompt(template, candidate) {
  return template
    .replace('{name}', candidate.name)
    .replace('{experience_years}', candidate.experience_years)
    .replace('{previous_role}', candidate.previous_role)
    .replace('{skills}', candidate.skills)
    .replace('{education}', candidate.education)
}

/**
 * Mock AI evaluation (used when no API key is provided)
 */
function mockEvaluation(candidate, evaluationType) {
  // Generate scores correlated with experience
  const baseScore = 50 + (candidate.experience_years * 1.5) + Math.random() * 20 - 10
  const score = Math.min(100, Math.max(0, Math.round(baseScore)))
  
  const feedbacks = {
    crisis: `Demonstrates ${score >= 70 ? 'strong' : score >= 50 ? 'moderate' : 'developing'} crisis management capabilities. ${candidate.experience_years} years of experience in ${candidate.previous_role.toLowerCase()} provides foundation for handling production disruptions.`,
    sustainability: `Shows ${score >= 70 ? 'excellent' : score >= 50 ? 'good' : 'basic'} understanding of sustainability principles. Background in ${candidate.previous_role.toLowerCase()} aligns with recycling operations.`,
    team: `Exhibits ${score >= 70 ? 'strong' : score >= 50 ? 'adequate' : 'developing'} team leadership skills. Experience level suggests ${score >= 70 ? 'proven' : 'growing'} ability to motivate production teams.`
  }

  return {
    score: score,
    feedback: feedbacks[evaluationType] || 'Evaluation completed.',
    key_strengths: [
      `${candidate.experience_years} years of experience`,
      `Background in ${candidate.previous_role.toLowerCase()}`
    ],
    areas_for_development: [
      'Continued professional development',
      'Expanded industry knowledge'
    ]
  }
}

/**
 * Evaluate using Google Gemini API
 * 
 * Note: The Gemini API endpoint (https://generativelanguage.googleapis.com/v1beta/...)
 * is an API endpoint, not a webpage. It's used for programmatic requests only.
 * 
 * Authentication: Uses x-goog-api-key header (recommended by Google)
 * API Documentation: https://ai.google.dev/gemini-api/docs
 */
async function evaluateWithGemini(candidate, promptTemplate) {
  if (!API_CONFIG.gemini.apiKey) {
    throw new Error('Gemini API key not configured')
  }

  // If API was tested and doesn't work, skip API calls immediately
  if (apiTested && !apiWorking) {
    throw new Error('Gemini API not available')
  }

  // If API test is in progress, wait for it to complete
  if (apiTestPromise) {
    await apiTestPromise
    // After waiting, check again
    if (apiTested && !apiWorking) {
      throw new Error('Gemini API not available')
    }
  }

  const prompt = formatPrompt(promptTemplate, candidate)

  // If not tested yet, create a test promise to prevent parallel tests
  if (!apiTested) {
    apiTestPromise = (async () => {
      try {
        // Try only the most reliable combination first
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent`
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': API_CONFIG.gemini.apiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt + '\n\nPlease respond with valid JSON only, no additional text.'
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        })

        if (response.ok) {
          const data = await response.json()
          
          if (data.error) {
            throw new Error(`Gemini API error: ${data.error.message || JSON.stringify(data.error)}`)
          }
          
          if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response structure from Gemini')
          }
          
          const content = data.candidates[0].content.parts[0].text
          const jsonMatch = content.match(/\{[\s\S]*\}/)
          
          if (jsonMatch) {
            const result = JSON.parse(jsonMatch[0])
            apiTested = true
            apiWorking = true
            apiTestPromise = null
            return result
          }
          
          throw new Error('Invalid response format from Gemini - no JSON found')
        } else {
          // API failed - mark as not working
          apiTested = true
          apiWorking = false
          apiTestPromise = null
          console.warn('Gemini API not available. Using mock evaluations. Please check your API key and ensure the Generative Language API is enabled in Google Cloud Console.')
          throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
        }
      } catch (error) {
        apiTested = true
        apiWorking = false
        apiTestPromise = null
        if (!error.message.includes('Gemini API not available')) {
          console.warn('Gemini API not available. Using mock evaluations. Please check your API key and ensure the Generative Language API is enabled in Google Cloud Console.')
        }
        throw error
      }
    })()
    
    // Wait for the test to complete
    try {
      return await apiTestPromise
    } catch (error) {
      throw error
    }
  }

  // If API is working, make the actual call
  if (apiWorking) {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_CONFIG.gemini.apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt + '\n\nPlease respond with valid JSON only, no additional text.'
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    })

    if (response.ok) {
      const data = await response.json()
      
      if (data.error) {
        throw new Error(`Gemini API error: ${data.error.message || JSON.stringify(data.error)}`)
      }
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response structure from Gemini')
      }
      
      const content = data.candidates[0].content.parts[0].text
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      throw new Error('Invalid response format from Gemini - no JSON found')
    } else {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
    }
  }

  throw new Error('Gemini API not available')
}

/**
 * Main evaluation function
 */
export async function evaluateCandidate(candidate, provider = 'auto') {
  const evaluations = {}

  // Determine which provider to use (only Gemini or mock)
  let useProvider = provider
  if (provider === 'auto') {
    if (API_CONFIG.gemini.apiKey) {
      useProvider = 'gemini'
    } else {
      useProvider = 'mock'
    }
  }

  // Evaluate Crisis Management
  try {
    if (useProvider === 'gemini') {
      evaluations.crisis_management = await evaluateWithGemini(candidate, CRISIS_MANAGEMENT_PROMPT)
    } else {
      evaluations.crisis_management = mockEvaluation(candidate, 'crisis')
    }
  } catch (error) {
    // Silently fall back to mock (error already logged if needed)
    evaluations.crisis_management = mockEvaluation(candidate, 'crisis')
  }

  // Evaluate Sustainability
  try {
    if (useProvider === 'gemini') {
      evaluations.sustainability = await evaluateWithGemini(candidate, SUSTAINABILITY_PROMPT)
    } else {
      evaluations.sustainability = mockEvaluation(candidate, 'sustainability')
    }
  } catch (error) {
    // Silently fall back to mock (error already logged if needed)
    evaluations.sustainability = mockEvaluation(candidate, 'sustainability')
  }

  // Evaluate Team Motivation
  try {
    if (useProvider === 'gemini') {
      evaluations.team_motivation = await evaluateWithGemini(candidate, TEAM_MOTIVATION_PROMPT)
    } else {
      evaluations.team_motivation = mockEvaluation(candidate, 'team')
    }
  } catch (error) {
    // Silently fall back to mock (error already logged if needed)
    evaluations.team_motivation = mockEvaluation(candidate, 'team')
  }

  return {
    crisis_management_score: evaluations.crisis_management.score,
    sustainability_score: evaluations.sustainability.score,
    team_motivation_score: evaluations.team_motivation.score,
    crisis_management_feedback: evaluations.crisis_management.feedback,
    sustainability_feedback: evaluations.sustainability.feedback,
    team_motivation_feedback: evaluations.team_motivation.feedback,
    key_strengths: {
      crisis: evaluations.crisis_management.key_strengths,
      sustainability: evaluations.sustainability.key_strengths,
      team: evaluations.team_motivation.key_strengths
    },
    areas_for_development: {
      crisis: evaluations.crisis_management.areas_for_development,
      sustainability: evaluations.sustainability.areas_for_development,
      team: evaluations.team_motivation.areas_for_development
    }
  }
}

/**
 * Batch evaluate multiple candidates
 */
export async function evaluateCandidates(candidates, provider = 'auto') {
  const results = []
  
  for (const candidate of candidates) {
    try {
      const evaluation = await evaluateCandidate(candidate, provider)
      results.push({
        candidate_id: candidate.id,
        ...evaluation
      })
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Failed to evaluate candidate ${candidate.id}:`, error)
      results.push({
        candidate_id: candidate.id,
        error: error.message
      })
    }
  }
  
  return results
}

export { API_CONFIG }

export default {
  evaluateCandidate,
  evaluateCandidates,
  API_CONFIG
}
