import { useState } from 'react'
import { Paper, Button, Group, Text, Select, Stack, Alert, Loader, Progress, Table, Badge, Accordion, ScrollArea, Divider } from '@mantine/core'
import { IconRobot, IconCheck, IconAlertCircle, IconTrophy, IconShield, IconLeaf, IconUsersGroup } from '@tabler/icons-react'
import { evaluateCandidate, evaluateCandidates, API_CONFIG } from '../services/aiEvaluationService'

function AIEvaluationPanel({ candidates, onEvaluationComplete }) {
  const [provider, setProvider] = useState('auto')
  const [evaluating, setEvaluating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])

  const handleEvaluateAll = async () => {
    setEvaluating(true)
    setError(null)
    setStatus('Starting evaluation...')
    setProgress(0)

    try {
      const results = []
      const total = candidates.length

      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i]
        setStatus(`Evaluating ${candidate.name} (${i + 1}/${total})...`)
        setProgress(((i + 1) / total) * 100)

        try {
          const evaluation = await evaluateCandidate(candidate, provider)
          results.push({
            candidate_id: candidate.id,
            ...evaluation
          })
        } catch (err) {
          console.error(`Failed to evaluate ${candidate.name}:`, err)
          results.push({
            candidate_id: candidate.id,
            error: err.message
          })
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      setStatus('Evaluation complete!')
      setResults(results)
      if (onEvaluationComplete) {
        onEvaluationComplete(results)
      }
    } catch (err) {
      setError(err.message)
      setStatus('Evaluation failed')
    } finally {
      setEvaluating(false)
      setTimeout(() => {
        setProgress(0)
        setStatus(null)
      }, 3000)
    }
  }

  const handleEvaluateSingle = async (candidate) => {
    setEvaluating(true)
    setError(null)
    setStatus(`Evaluating ${candidate.name}...`)

    try {
      const evaluation = await evaluateCandidate(candidate, provider)
      setStatus('Evaluation complete!')
      const singleResult = [{
        candidate_id: candidate.id,
        ...evaluation
      }]
      setResults(singleResult)
      if (onEvaluationComplete) {
        onEvaluationComplete(singleResult)
      }
    } catch (err) {
      setError(err.message)
      setStatus('Evaluation failed')
    } finally {
      setEvaluating(false)
      setTimeout(() => {
        setStatus(null)
      }, 3000)
    }
  }

  const getProviderStatus = () => {
    if (API_CONFIG.gemini.apiKey) {
      return { label: 'Google Gemini', color: 'green' }
    }
    return { label: 'Mock Evaluation (No API Key)', color: 'yellow' }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'green'
    if (score >= 70) return 'blue'
    if (score >= 60) return 'yellow'
    return 'red'
  }

  const getScoreBadge = (score) => {
    const color = getScoreColor(score)
    return (
      <Badge color={color} variant="light" size="lg">
        {score.toFixed(0)}
      </Badge>
    )
  }

  const findCandidateName = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId)
    return candidate ? candidate.name : `Candidate ${candidateId}`
  }

  const providerStatus = getProviderStatus()

  return (
    <Paper shadow="sm" p="xl" radius="md" style={{ backgroundColor: 'white', border: '1px solid var(--border-color)' }}>
      <Stack gap="md">
        <Group gap="md">
          <IconRobot size={28} style={{ color: 'var(--primary-green)' }} />
          <div>
            <Text size="lg" fw={700} style={{ color: 'var(--text-dark)' }}>
              AI Evaluation System
            </Text>
            <Text size="sm" c="dimmed">
              Evaluate candidates using AI-powered analysis
            </Text>
          </div>
        </Group>

        <Alert
          icon={providerStatus.color === 'yellow' ? <IconAlertCircle size={16} /> : <IconCheck size={16} />}
          title={providerStatus.label}
          color={providerStatus.color}
          variant="light"
        >
          {providerStatus.color === 'yellow' ? (
            <Text size="sm">
              Using mock evaluations. Add API keys in <code>.env</code> file to use real AI evaluation.
            </Text>
          ) : (
            <Text size="sm">
              Connected to {providerStatus.label}. Ready to evaluate candidates.
            </Text>
          )}
        </Alert>

        <Select
          label="AI Provider"
          placeholder="Select provider"
          value={provider}
          onChange={setProvider}
          data={[
            { value: 'auto', label: 'Auto (Use Gemini if available)' },
            { value: 'gemini', label: 'Google Gemini' },
            { value: 'mock', label: 'Mock (Testing)' }
          ]}
          disabled={evaluating}
        />

        {status && (
          <Alert color="blue" variant="light">
            <Group gap="xs">
              {evaluating && <Loader size="sm" />}
              <Text size="sm">{status}</Text>
            </Group>
            {evaluating && progress > 0 && (
              <Progress value={progress} mt="sm" size="sm" color="green" />
            )}
          </Alert>
        )}

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="light">
            <Text size="sm">{error}</Text>
          </Alert>
        )}

        <Group>
          <Button
            onClick={handleEvaluateAll}
            disabled={evaluating || candidates.length === 0}
            style={{
              backgroundColor: 'var(--primary-green)',
              '&:hover': {
                backgroundColor: 'var(--dark-green)'
              },
              '&:disabled': {
                opacity: 0.6
              }
            }}
            leftSection={<IconRobot size={18} />}
          >
            Evaluate All Candidates ({candidates.length})
          </Button>
        </Group>

        <Text size="xs" c="dimmed">
          Note: Real AI evaluations may take time and incur API costs. Mock evaluations are instant and free.
        </Text>

        {results.length > 0 && (
          <>
            <Divider my="md" />
            <div>
              <Group mb="md" justify="space-between">
                <Group>
                  <IconTrophy size={20} style={{ color: 'var(--primary-green)' }} />
                  <Text size="lg" fw={700} style={{ color: 'var(--text-dark)' }}>
                    Evaluation Results ({results.length} candidates)
                  </Text>
                </Group>
                <Button
                  size="xs"
                  variant="light"
                  onClick={() => setResults([])}
                >
                  Clear Results
                </Button>
              </Group>

              {/* Summary Table */}
              <Paper withBorder radius="md" p="md" mb="md" style={{ backgroundColor: 'var(--bg-light)' }}>
                <ScrollArea>
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Candidate</Table.Th>
                        <Table.Th>Crisis Mgmt</Table.Th>
                        <Table.Th>Sustainability</Table.Th>
                        <Table.Th>Team Mot.</Table.Th>
                        <Table.Th>Average</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {results
                        .map(result => ({
                          ...result,
                          avgScore: (result.crisis_management_score + result.sustainability_score + result.team_motivation_score) / 3
                        }))
                        .sort((a, b) => b.avgScore - a.avgScore)
                        .map((result, index) => (
                          <Table.Tr key={result.candidate_id || index}>
                            <Table.Td>
                              <Text fw={600}>{findCandidateName(result.candidate_id)}</Text>
                            </Table.Td>
                            <Table.Td>{getScoreBadge(result.crisis_management_score)}</Table.Td>
                            <Table.Td>{getScoreBadge(result.sustainability_score)}</Table.Td>
                            <Table.Td>{getScoreBadge(result.team_motivation_score)}</Table.Td>
                            <Table.Td>
                              <Badge color={getScoreColor(result.avgScore)} variant="filled" size="lg">
                                {result.avgScore.toFixed(1)}
                              </Badge>
                            </Table.Td>
                          </Table.Tr>
                        ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              </Paper>

              {/* Detailed Results */}
              <Text size="sm" fw={600} mb="sm" style={{ color: 'var(--text-dark)' }}>
                Detailed Feedback
              </Text>
              <ScrollArea h={400}>
                <Accordion variant="separated" radius="md">
                  {results.map((result, index) => {
                    const candidateName = findCandidateName(result.candidate_id)
                    const totalScore = result.crisis_management_score + result.sustainability_score + result.team_motivation_score
                    const avgScore = totalScore / 3

                    return (
                      <Accordion.Item key={result.candidate_id || index} value={`result-${index}`}>
                        <Accordion.Control>
                          <Group justify="space-between" pr="md">
                            <Text fw={600}>{candidateName}</Text>
                            <Group gap="xs">
                              <Badge color={getScoreColor(avgScore)} variant="filled" size="lg">
                                Avg: {avgScore.toFixed(1)}
                              </Badge>
                            </Group>
                          </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Stack gap="md">
                            {/* Scores Summary */}
                            <Group grow>
                              <Paper p="sm" withBorder radius="md" style={{ backgroundColor: 'var(--bg-light)' }}>
                                <Group gap="xs">
                                  <IconShield size={18} style={{ color: 'var(--primary-green)' }} />
                                  <div>
                                    <Text size="xs" c="dimmed">Crisis Management</Text>
                                    <Text fw={700} size="lg" style={{ color: getScoreColor(result.crisis_management_score) }}>
                                      {result.crisis_management_score.toFixed(0)}
                                    </Text>
                                  </div>
                                </Group>
                              </Paper>
                              <Paper p="sm" withBorder radius="md" style={{ backgroundColor: 'var(--bg-light)' }}>
                                <Group gap="xs">
                                  <IconLeaf size={18} style={{ color: 'var(--primary-green)' }} />
                                  <div>
                                    <Text size="xs" c="dimmed">Sustainability</Text>
                                    <Text fw={700} size="lg" style={{ color: getScoreColor(result.sustainability_score) }}>
                                      {result.sustainability_score.toFixed(0)}
                                    </Text>
                                  </div>
                                </Group>
                              </Paper>
                              <Paper p="sm" withBorder radius="md" style={{ backgroundColor: 'var(--bg-light)' }}>
                                <Group gap="xs">
                                  <IconUsersGroup size={18} style={{ color: 'var(--primary-green)' }} />
                                  <div>
                                    <Text size="xs" c="dimmed">Team Motivation</Text>
                                    <Text fw={700} size="lg" style={{ color: getScoreColor(result.team_motivation_score) }}>
                                      {result.team_motivation_score.toFixed(0)}
                                    </Text>
                                  </div>
                                </Group>
                              </Paper>
                            </Group>

                            {/* Feedback Sections */}
                            <div>
                              <Text size="sm" fw={600} mb="xs" style={{ color: 'var(--text-dark)' }}>
                                Crisis Management Feedback
                              </Text>
                              <Text size="sm" c="dimmed" mb="md">
                                {result.crisis_management_feedback}
                              </Text>
                              <Group gap="xs" mb="md">
                                <Text size="xs" fw={600}>Strengths:</Text>
                                {result.key_strengths?.crisis?.map((strength, i) => (
                                  <Badge key={i} color="green" variant="light" size="sm">
                                    {strength}
                                  </Badge>
                                ))}
                              </Group>
                              <Group gap="xs">
                                <Text size="xs" fw={600}>Areas for Development:</Text>
                                {result.areas_for_development?.crisis?.map((area, i) => (
                                  <Badge key={i} color="orange" variant="light" size="sm">
                                    {area}
                                  </Badge>
                                ))}
                              </Group>
                            </div>

                            <Divider />

                            <div>
                              <Text size="sm" fw={600} mb="xs" style={{ color: 'var(--text-dark)' }}>
                                Sustainability Feedback
                              </Text>
                              <Text size="sm" c="dimmed" mb="md">
                                {result.sustainability_feedback}
                              </Text>
                              <Group gap="xs" mb="md">
                                <Text size="xs" fw={600}>Strengths:</Text>
                                {result.key_strengths?.sustainability?.map((strength, i) => (
                                  <Badge key={i} color="green" variant="light" size="sm">
                                    {strength}
                                  </Badge>
                                ))}
                              </Group>
                              <Group gap="xs">
                                <Text size="xs" fw={600}>Areas for Development:</Text>
                                {result.areas_for_development?.sustainability?.map((area, i) => (
                                  <Badge key={i} color="orange" variant="light" size="sm">
                                    {area}
                                  </Badge>
                                ))}
                              </Group>
                            </div>

                            <Divider />

                            <div>
                              <Text size="sm" fw={600} mb="xs" style={{ color: 'var(--text-dark)' }}>
                                Team Motivation Feedback
                              </Text>
                              <Text size="sm" c="dimmed" mb="md">
                                {result.team_motivation_feedback}
                              </Text>
                              <Group gap="xs" mb="md">
                                <Text size="xs" fw={600}>Strengths:</Text>
                                {result.key_strengths?.team?.map((strength, i) => (
                                  <Badge key={i} color="green" variant="light" size="sm">
                                    {strength}
                                  </Badge>
                                ))}
                              </Group>
                              <Group gap="xs">
                                <Text size="xs" fw={600}>Areas for Development:</Text>
                                {result.areas_for_development?.team?.map((area, i) => (
                                  <Badge key={i} color="orange" variant="light" size="sm">
                                    {area}
                                  </Badge>
                                ))}
                              </Group>
                            </div>
                          </Stack>
                        </Accordion.Panel>
                      </Accordion.Item>
                    )
                  })}
                </Accordion>
              </ScrollArea>
            </div>
          </>
        )}
      </Stack>
    </Paper>
  )
}

export default AIEvaluationPanel
