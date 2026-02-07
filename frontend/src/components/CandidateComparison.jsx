import { useState } from 'react'
import { Paper, Select, Group, Text, Stack, Badge, Table, Button, Box, Divider, Grid, ScrollArea } from '@mantine/core'
import { IconUsers, IconX, IconChartBar } from '@tabler/icons-react'

function CandidateComparison({ candidates }) {
  const [selectedIds, setSelectedIds] = useState([])

  const candidateOptions = candidates.map(c => ({
    value: String(c.id),
    label: `${c.name} (Score: ${c.evaluation ? ((c.evaluation.crisis_management_score + c.evaluation.sustainability_score + c.evaluation.team_motivation_score) / 3).toFixed(1) : 'N/A'})`
  }))

  const selectedCandidates = selectedIds
    .map(id => candidates.find(c => String(c.id) === id))
    .filter(Boolean)

  const removeCandidate = (id) => {
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== String(id)))
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'green'
    if (score >= 70) return 'blue'
    if (score >= 60) return 'yellow'
    return 'red'
  }

  if (selectedCandidates.length === 0) {
    return (
      <Paper shadow="sm" p="xl" radius="md" style={{ backgroundColor: 'white' }}>
        <Stack gap="md">
          <Group gap="md">
            <IconUsers size={24} style={{ color: 'var(--primary-green)' }} />
            <Text size="lg" fw={700} style={{ color: 'var(--text-dark)' }}>
              Candidate Comparison Tool
            </Text>
          </Group>
          <Text size="sm" c="dimmed">
            Select up to 5 candidates to compare their profiles and scores side-by-side.
          </Text>
          <Select
            placeholder="Select a candidate to compare..."
            data={candidateOptions}
            searchable
            onChange={(value) => {
              if (value && selectedIds.length < 5 && !selectedIds.includes(value)) {
                setSelectedIds([...selectedIds, value])
              }
            }}
          />
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper shadow="sm" p="xl" radius="md" style={{ backgroundColor: 'white' }}>
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="md">
            <IconUsers size={24} style={{ color: 'var(--primary-green)' }} />
            <Text size="lg" fw={700} style={{ color: 'var(--text-dark)' }}>
              Candidate Comparison ({selectedCandidates.length}/5)
            </Text>
          </Group>
          {selectedIds.length < 5 && (
            <Select
              placeholder="Add candidate..."
              data={candidateOptions.filter(opt => !selectedIds.includes(opt.value))}
              searchable
              style={{ width: 300 }}
              onChange={(value) => {
                if (value && !selectedIds.includes(value)) {
                  setSelectedIds([...selectedIds, value])
                }
              }}
            />
          )}
        </Group>

        <Divider />

        {/* Comparison Table */}
        <ScrollArea>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Attribute</Table.Th>
                {selectedCandidates.map(candidate => (
                  <Table.Th key={candidate.id}>
                    <Group justify="space-between">
                      <Text fw={600}>{candidate.name}</Text>
                      <Button
                        size="xs"
                        variant="subtle"
                        color="red"
                        onClick={() => removeCandidate(candidate.id)}
                      >
                        <IconX size={14} />
                      </Button>
                    </Group>
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {/* Scores */}
              <Table.Tr>
                <Table.Td fw={600}>Crisis Management</Table.Td>
                {selectedCandidates.map(candidate => (
                  <Table.Td key={candidate.id}>
                    <Badge color={getScoreColor(candidate.evaluation?.crisis_management_score || 0)} variant="light" size="lg">
                      {candidate.evaluation?.crisis_management_score?.toFixed(1) || 'N/A'}
                    </Badge>
                  </Table.Td>
                ))}
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={600}>Sustainability</Table.Td>
                {selectedCandidates.map(candidate => (
                  <Table.Td key={candidate.id}>
                    <Badge color={getScoreColor(candidate.evaluation?.sustainability_score || 0)} variant="light" size="lg">
                      {candidate.evaluation?.sustainability_score?.toFixed(1) || 'N/A'}
                    </Badge>
                  </Table.Td>
                ))}
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={600}>Team Motivation</Table.Td>
                {selectedCandidates.map(candidate => (
                  <Table.Td key={candidate.id}>
                    <Badge color={getScoreColor(candidate.evaluation?.team_motivation_score || 0)} variant="light" size="lg">
                      {candidate.evaluation?.team_motivation_score?.toFixed(1) || 'N/A'}
                    </Badge>
                  </Table.Td>
                ))}
              </Table.Tr>
              <Table.Tr style={{ backgroundColor: 'var(--bg-light)' }}>
                <Table.Td fw={700}>Average Score</Table.Td>
                {selectedCandidates.map(candidate => {
                  const avgScore = candidate.evaluation
                    ? (candidate.evaluation.crisis_management_score + candidate.evaluation.sustainability_score + candidate.evaluation.team_motivation_score) / 3
                    : 0
                  return (
                    <Table.Td key={candidate.id}>
                      <Badge color={getScoreColor(avgScore)} variant="filled" size="lg">
                        {avgScore.toFixed(1)}
                      </Badge>
                    </Table.Td>
                  )
                })}
              </Table.Tr>

              <Table.Tr>
                <Table.Td colSpan={selectedCandidates.length + 1}>
                  <Divider my="sm" />
                </Table.Td>
              </Table.Tr>

              {/* Profile Info */}
              <Table.Tr>
                <Table.Td fw={600}>Experience</Table.Td>
                {selectedCandidates.map(candidate => (
                  <Table.Td key={candidate.id}>
                    {candidate.experience_years} years
                  </Table.Td>
                ))}
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={600}>Education</Table.Td>
                {selectedCandidates.map(candidate => (
                  <Table.Td key={candidate.id}>
                    {candidate.education || 'N/A'}
                  </Table.Td>
                ))}
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={600}>Previous Role</Table.Td>
                {selectedCandidates.map(candidate => (
                  <Table.Td key={candidate.id}>
                    {candidate.previous_role || 'N/A'}
                  </Table.Td>
                ))}
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={600}>Skills</Table.Td>
                {selectedCandidates.map(candidate => (
                  <Table.Td key={candidate.id}>
                    <Text size="sm" lineClamp={2}>
                      {candidate.skills || 'N/A'}
                    </Text>
                  </Table.Td>
                ))}
              </Table.Tr>
              <Table.Tr>
                <Table.Td fw={600}>Location</Table.Td>
                {selectedCandidates.map(candidate => (
                  <Table.Td key={candidate.id}>
                    {candidate.location || 'N/A'}
                  </Table.Td>
                ))}
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </ScrollArea>

        {/* Visual Comparison Chart */}
        {selectedCandidates.length >= 2 && (
          <Box mt="xl">
            <Text fw={600} mb="md">Score Comparison Chart</Text>
            <Grid>
              {selectedCandidates.map(candidate => {
                const scores = {
                  'Crisis Management': candidate.evaluation?.crisis_management_score || 0,
                  'Sustainability': candidate.evaluation?.sustainability_score || 0,
                  'Team Motivation': candidate.evaluation?.team_motivation_score || 0
                }
                return (
                  <Grid.Col key={candidate.id} span={{ base: 12, sm: 6, md: 4 }}>
                    <Paper p="md" withBorder radius="md">
                      <Text fw={600} size="sm" mb="sm">{candidate.name}</Text>
                      {Object.entries(scores).map(([label, score]) => (
                        <Box key={label} mb="xs">
                          <Group justify="space-between" mb={4}>
                            <Text size="xs">{label}</Text>
                            <Text size="xs" fw={600}>{score.toFixed(1)}</Text>
                          </Group>
                          <Box
                            style={{
                              height: 8,
                              backgroundColor: '#e0e0e0',
                              borderRadius: 4,
                              overflow: 'hidden'
                            }}
                          >
                            <Box
                              style={{
                                height: '100%',
                                width: `${score}%`,
                                backgroundColor: getScoreColor(score) === 'green' ? '#4caf50' : 
                                                 getScoreColor(score) === 'blue' ? '#2196F3' :
                                                 getScoreColor(score) === 'yellow' ? '#ffd43b' : '#ff6b6b'
                              }}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Paper>
                  </Grid.Col>
                )
              })}
            </Grid>
          </Box>
        )}
      </Stack>
    </Paper>
  )
}

export default CandidateComparison
