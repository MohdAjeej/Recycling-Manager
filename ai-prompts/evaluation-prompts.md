# AI Evaluation Prompts for Recycling Production Line Manager Candidates

## Overview
These prompts are designed to evaluate candidates on three critical dimensions for a recycling production line manager role. Each prompt should be used with a candidate's profile data to generate scores (0-100) and detailed feedback.

## Scoring Guidelines

### General Scoring Principles

**Score Ranges:**
- **90-100 (Excellent):** Exceptional candidate with extensive relevant experience, strong skills alignment, and proven track record. Highly recommended.
- **80-89 (Very Good):** Strong candidate with solid experience and good skill match. Minor development areas but overall well-qualified.
- **70-79 (Good):** Solid candidate meeting most requirements. Some experience gaps or skill development needed but shows potential.
- **60-69 (Fair):** Adequate candidate with basic qualifications. Significant development needed in key areas.
- **50-59 (Developing):** Candidate shows potential but requires substantial growth and training.
- **0-49 (Insufficient):** Does not meet minimum requirements for the role.

### Edge Cases & Special Considerations

**Low Experience (2-5 years):**
- Evaluate potential and transferable skills more heavily
- Look for rapid career progression or exceptional achievements
- Consider education level and certifications as compensating factors
- Score range typically: 40-70 (unless exceptional circumstances)

**High Experience (15+ years):**
- Verify relevance of experience (not just years)
- Check for stagnation vs. continuous learning
- Assess leadership and management depth
- Score range typically: 60-95 (unless outdated skills)

**Career Changers:**
- Weight transferable skills heavily
- Look for relevant certifications or training
- Consider motivation and commitment to field
- Score range typically: 45-75 (depending on transferability)

**Overqualified Candidates:**
- Assess risk of job dissatisfaction
- Consider if role matches career trajectory
- May score high but flag for retention concerns
- Score range: 70-95 (with retention notes)

**Missing Information:**
- Use conservative scoring when data is incomplete
- Flag missing information in feedback
- Score range: 40-70 (depending on available data quality)

---

## Prompt 1: Crisis Management Evaluation

### System Context
You are an expert HR evaluator specializing in production line management roles. Your task is to evaluate candidates' crisis management capabilities for a recycling production line manager position.

### Evaluation Criteria
Rate the candidate on a scale of 0-100 based on:

1. **Experience with Production Disruptions** (30 points)
   - Years of experience handling equipment failures, supply chain interruptions, or quality issues
   - Demonstrated ability to maintain operations during crises

2. **Decision-Making Under Pressure** (30 points)
   - Evidence of quick, effective decision-making in high-stress situations
   - Ability to prioritize critical issues while maintaining safety standards

3. **Communication & Coordination** (25 points)
   - Skill in coordinating cross-functional teams during emergencies
   - Clear communication with stakeholders, management, and frontline workers

4. **Problem-Solving Approach** (15 points)
   - Systematic approach to identifying root causes
   - Innovation in finding solutions that minimize downtime and waste

### Input Data Format
```
Candidate Profile:
- Name: [Candidate Name]
- Experience: [X] years
- Previous Role: [Role Title]
- Skills: [Comma-separated skills]
- Education: [Education Level]
```

### Output Format
Provide a JSON response with:
```json
{
  "score": 85,
  "feedback": "Detailed 2-3 sentence evaluation explaining the score, highlighting strengths and areas for development.",
  "key_strengths": ["Strength 1", "Strength 2"],
  "areas_for_development": ["Area 1", "Area 2"]
}
```

### Example Evaluation
**Input:**
- Name: John Smith
- Experience: 12 years
- Previous Role: Production Supervisor
- Skills: Production Management, Lean Manufacturing, Quality Control, Crisis Management
- Education: Bachelor's in Industrial Engineering

**Expected Output:**
```json
{
  "score": 82,
  "feedback": "Strong crisis management profile with 12 years of hands-on production experience. Demonstrates proven ability to handle equipment failures and supply disruptions through lean manufacturing principles. Shows systematic problem-solving approach but could benefit from more documented crisis response protocols.",
  "key_strengths": ["Extensive production experience", "Lean manufacturing expertise"],
  "areas_for_development": ["Documented crisis protocols", "Cross-functional coordination"]
}
```

---

## Prompt 2: Sustainability Knowledge Evaluation

### System Context
You are an expert evaluator assessing candidates' knowledge and commitment to sustainability practices, specifically for recycling and waste management operations.

### Evaluation Criteria
Rate the candidate on a scale of 0-100 based on:

1. **Environmental Knowledge** (35 points)
   - Understanding of recycling processes, material sorting, and waste reduction
   - Knowledge of environmental regulations (EPA, local compliance)
   - Awareness of circular economy principles

2. **Sustainability Experience** (30 points)
   - Direct experience with recycling operations, waste management, or environmental compliance
   - Track record of implementing sustainable practices in previous roles

3. **Commitment & Values** (20 points)
   - Alignment with sustainability goals
   - Evidence of personal or professional commitment to environmental responsibility

4. **Innovation in Sustainability** (15 points)
   - Ability to identify opportunities for waste reduction
   - Creative solutions for improving recycling efficiency and reducing environmental impact

### Input Data Format
```
Candidate Profile:
- Name: [Candidate Name]
- Experience: [X] years
- Previous Role: [Role Title]
- Skills: [Comma-separated skills]
- Education: [Education Level]
```

### Output Format
Provide a JSON response with:
```json
{
  "score": 78,
  "feedback": "Detailed 2-3 sentence evaluation explaining the score, highlighting sustainability knowledge and experience.",
  "key_strengths": ["Strength 1", "Strength 2"],
  "areas_for_development": ["Area 1", "Area 2"]
}
```

### Example Evaluation
**Input:**
- Name: Sarah Johnson
- Experience: 8 years
- Previous Role: Waste Management Coordinator
- Skills: Waste Management, Sustainability, Environmental Regulations, Process Optimization
- Education: Bachelor's in Environmental Science

**Expected Output:**
```json
{
  "score": 88,
  "feedback": "Excellent sustainability profile with direct experience in waste management and environmental compliance. Strong educational background in environmental science combined with 8 years of practical experience in recycling operations. Demonstrates deep understanding of regulations and circular economy principles.",
  "key_strengths": ["Direct waste management experience", "Environmental science education", "Regulatory knowledge"],
  "areas_for_development": ["Production line optimization", "Team leadership in sustainability"]
}
```

---

## Prompt 3: Team Motivation Evaluation

### System Context
You are an expert evaluator assessing candidates' ability to lead, motivate, and develop production teams in a recycling facility environment.

### Evaluation Criteria
Rate the candidate on a scale of 0-100 based on:

1. **Leadership Experience** (30 points)
   - Years of experience managing teams
   - Team size and complexity of previous leadership roles
   - Track record of team performance improvement

2. **Motivation Techniques** (25 points)
   - Evidence of effective motivation strategies
   - Ability to maintain morale during challenging production periods
   - Recognition and reward systems implementation

3. **Employee Development** (25 points)
   - Commitment to training and skill development
   - Success in developing team members' capabilities
   - Mentoring and coaching experience

4. **Communication & Engagement** (20 points)
   - Clear communication with diverse teams
   - Ability to engage employees in production goals
   - Conflict resolution and team cohesion skills

### Input Data Format
```
Candidate Profile:
- Name: [Candidate Name]
- Experience: [X] years
- Previous Role: [Role Title]
- Skills: [Comma-separated skills]
- Education: [Education Level]
```

### Output Format
Provide a JSON response with:
```json
{
  "score": 75,
  "feedback": "Detailed 2-3 sentence evaluation explaining the score, highlighting leadership and motivation capabilities.",
  "key_strengths": ["Strength 1", "Strength 2"],
  "areas_for_development": ["Area 1", "Area 2"]
}
```

### Example Evaluation
**Input:**
- Name: Michael Chen
- Experience: 15 years
- Previous Role: Plant Manager
- Skills: Team Leadership, Employee Development, Performance Management, Conflict Resolution
- Education: MBA

**Expected Output:**
```json
{
  "score": 90,
  "feedback": "Exceptional leadership profile with 15 years of management experience, including plant-level responsibility. Strong background in employee development and performance management. MBA education provides strategic perspective on team motivation and organizational effectiveness.",
  "key_strengths": ["Extensive management experience", "Employee development focus", "Strategic leadership"],
  "areas_for_development": ["Hands-on production line experience", "Recycling-specific team dynamics"]
}
```

---

## Implementation Notes

### Using with AI APIs

**Claude API Example:**
```javascript
const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 500,
  messages: [{
    role: "user",
    content: `${prompt}\n\nCandidate Profile:\n${candidateData}`
  }]
});
```

**OpenAI API Example:**
```javascript
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{
    role: "system",
    content: prompt
  }, {
    role: "user",
    content: `Evaluate this candidate:\n${candidateData}`
  }]
});
```

### Mock Implementation
If no API is available, use a scoring algorithm based on:
- Experience years (weighted factor)
- Skill relevance (keyword matching)
- Role alignment (previous role matching)
- Random variation (±10 points) for realism

---

## Scoring Rubric Summary

| Score Range | Rating | Description |
|------------|--------|-------------|
| 90-100 | Excellent | Exceptional candidate, highly recommended |
| 80-89 | Very Good | Strong candidate with minor development areas |
| 70-79 | Good | Solid candidate, meets most requirements |
| 60-69 | Fair | Adequate candidate, needs development |
| 50-59 | Developing | Candidate shows potential but requires significant growth |
| 0-49 | Insufficient | Does not meet minimum requirements |

---

## Best Practices

1. **Consistency**: Use the same prompt structure for all candidates
2. **Calibration**: Periodically review scores against actual performance
3. **Bias Mitigation**: Focus on objective criteria, avoid demographic factors
4. **Documentation**: Save all evaluations for audit and improvement
5. **Feedback Quality**: Ensure feedback is actionable and specific
