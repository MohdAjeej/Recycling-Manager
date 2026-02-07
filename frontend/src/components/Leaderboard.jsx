import { Table, Badge, Paper, Title, Text, Box } from '@mantine/core'
import { IconTrophy } from '@tabler/icons-react'

function Leaderboard({ candidates }) {
  // Sort candidates by total score (average of three scores)
  const sortedCandidates = [...candidates]
    .map(candidate => ({
      ...candidate,
      totalScore: (
        candidate.evaluation.crisis_management_score +
        candidate.evaluation.sustainability_score +
        candidate.evaluation.team_motivation_score
      ) / 3
    }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 10) // Top 10

  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50'
    if (score >= 70) return '#66bb6a'
    if (score >= 60) return '#ffd43b'
    return '#ff6b6b'
  }

  const getScoreBadgeColor = (score) => {
    if (score >= 80) return 'green'
    if (score >= 70) return 'blue'
    if (score >= 60) return 'yellow'
    return 'red'
  }

  const rows = sortedCandidates.map((candidate, index) => (
    <Table.Tr 
      key={candidate.id}
      style={{
        '&:hover': {
          backgroundColor: '#f8f9fa'
        }
      }}
    >
      <Table.Td>
        <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {index === 0 && (
            <IconTrophy size={20} style={{ color: '#ffd700' }} />
          )}
          <Badge
            size="lg"
            variant="light"
            style={{
              backgroundColor: index === 0 ? '#ffd70020' : getScoreColor(candidate.totalScore) + '20',
              color: index === 0 ? '#ff8c00' : getScoreColor(candidate.totalScore),
              fontWeight: 700,
              border: `2px solid ${getScoreColor(candidate.totalScore)}`
            }}
          >
            #{index + 1}
          </Badge>
        </Box>
      </Table.Td>
      <Table.Td>
        <Text fw={600} size="md">{candidate.name}</Text>
        <Text size="sm" c="dimmed">{candidate.previous_role}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>{candidate.experience_years} years</Text>
      </Table.Td>
      <Table.Td>
        <Badge
          color={getScoreBadgeColor(candidate.evaluation.crisis_management_score)}
          variant="light"
          size="md"
          style={{
            backgroundColor: getScoreColor(candidate.evaluation.crisis_management_score) + '20',
            color: getScoreColor(candidate.evaluation.crisis_management_score),
            fontWeight: 600
          }}
        >
          {candidate.evaluation.crisis_management_score.toFixed(1)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge
          color={getScoreBadgeColor(candidate.evaluation.sustainability_score)}
          variant="light"
          size="md"
          style={{
            backgroundColor: getScoreColor(candidate.evaluation.sustainability_score) + '20',
            color: getScoreColor(candidate.evaluation.sustainability_score),
            fontWeight: 600
          }}
        >
          {candidate.evaluation.sustainability_score.toFixed(1)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge
          color={getScoreBadgeColor(candidate.evaluation.team_motivation_score)}
          variant="light"
          size="md"
          style={{
            backgroundColor: getScoreColor(candidate.evaluation.team_motivation_score) + '20',
            color: getScoreColor(candidate.evaluation.team_motivation_score),
            fontWeight: 600
          }}
        >
          {candidate.evaluation.team_motivation_score.toFixed(1)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text
          fw={700}
          size="lg"
          style={{
            color: getScoreColor(candidate.totalScore),
            fontSize: '20px'
          }}
        >
          {candidate.totalScore.toFixed(1)}
        </Text>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Paper
      shadow="sm"
      p="xl"
      radius="md"
      style={{
        backgroundColor: 'white',
        border: '1px solid var(--border-color)'
      }}
    >
      <Box style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <IconTrophy size={28} style={{ color: 'var(--primary-green)' }} />
        <Title order={2} style={{ color: 'var(--text-dark)' }}>
          Top 10 Candidates
        </Title>
      </Box>
      <Table.ScrollContainer minWidth={800}>
        <Table
          striped
          highlightOnHover
          style={{
            '& thead tr th': {
              backgroundColor: 'var(--bg-light)',
              fontWeight: 700,
              color: 'var(--text-dark)',
              borderBottom: '2px solid var(--primary-green)'
            }
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Rank</Table.Th>
              <Table.Th>Candidate</Table.Th>
              <Table.Th>Experience</Table.Th>
              <Table.Th>Crisis Mgmt</Table.Th>
              <Table.Th>Sustainability</Table.Th>
              <Table.Th>Team Motivation</Table.Th>
              <Table.Th>Total Score</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  )
}

export default Leaderboard
