import { Paper, Title, Grid, Text, Tooltip, Box } from '@mantine/core'
import { IconChartBar } from '@tabler/icons-react'

function SkillHeatmap({ candidates }) {
  // Prepare data for heatmap
  const heatmapData = candidates.map(candidate => ({
    name: candidate.name.split(' ')[0], // First name only for readability
    fullName: candidate.name,
    crisis: candidate.evaluation.crisis_management_score,
    sustainability: candidate.evaluation.sustainability_score,
    teamMotivation: candidate.evaluation.team_motivation_score,
    total: (
      candidate.evaluation.crisis_management_score +
      candidate.evaluation.sustainability_score +
      candidate.evaluation.team_motivation_score
    ) / 3
  }))

  // Sort by total score
  heatmapData.sort((a, b) => b.total - a.total)

  // Create a simple heatmap visualization using colored cells
  const getColor = (value) => {
    if (value >= 80) return '#4caf50' // green
    if (value >= 70) return '#66bb6a' // light green
    if (value >= 60) return '#ffd43b' // yellow
    return '#ff6b6b' // red
  }

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
        <IconChartBar size={28} style={{ color: 'var(--primary-green)' }} />
        <Title order={2} style={{ color: 'var(--text-dark)' }}>
          Skill Heatmap
        </Title>
      </Box>
      <Text size="sm" c="dimmed" mb="lg">
        Visual representation of candidate scores across all three evaluation dimensions
      </Text>
      
      <Box style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--bg-light)',
                borderBottom: '2px solid var(--primary-green)'
              }}
            >
              <th
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  borderBottom: '2px solid var(--primary-green)'
                }}
              >
                Candidate
              </th>
              <th
                style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  borderBottom: '2px solid var(--primary-green)'
                }}
              >
                Crisis Management
              </th>
              <th
                style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  borderBottom: '2px solid var(--primary-green)'
                }}
              >
                Sustainability
              </th>
              <th
                style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  borderBottom: '2px solid var(--primary-green)'
                }}
              >
                Team Motivation
              </th>
              <th
                style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  borderBottom: '2px solid var(--primary-green)'
                }}
              >
                Average
              </th>
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  '&:hover': {
                    backgroundColor: 'var(--bg-light)'
                  }
                }}
              >
                <td style={{ padding: '16px' }}>
                  <Text size="sm" fw={600} style={{ color: 'var(--text-dark)' }}>
                    {item.fullName}
                  </Text>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <Tooltip label={`${item.crisis.toFixed(1)}/100`}>
                    <Box
                      style={{
                        backgroundColor: getColor(item.crisis),
                        color: 'white',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        minWidth: '70px',
                        display: 'inline-block',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      {item.crisis.toFixed(0)}
                    </Box>
                  </Tooltip>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <Tooltip label={`${item.sustainability.toFixed(1)}/100`}>
                    <Box
                      style={{
                        backgroundColor: getColor(item.sustainability),
                        color: 'white',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        minWidth: '70px',
                        display: 'inline-block',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      {item.sustainability.toFixed(0)}
                    </Box>
                  </Tooltip>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <Tooltip label={`${item.teamMotivation.toFixed(1)}/100`}>
                    <Box
                      style={{
                        backgroundColor: getColor(item.teamMotivation),
                        color: 'white',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        minWidth: '70px',
                        display: 'inline-block',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      {item.teamMotivation.toFixed(0)}
                    </Box>
                  </Tooltip>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <Text
                    fw={700}
                    size="md"
                    style={{
                      color: getColor(item.total),
                      fontSize: '18px'
                    }}
                  >
                    {item.total.toFixed(1)}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Box
        style={{
          marginTop: '32px',
          padding: '20px',
          backgroundColor: 'var(--bg-light)',
          borderRadius: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center'
        }}
      >
        <Text size="sm" fw={600} style={{ color: 'var(--text-dark)' }}>
          Legend:
        </Text>
        {[
          { color: '#4caf50', label: '80-100 (Excellent)' },
          { color: '#66bb6a', label: '70-79 (Very Good)' },
          { color: '#ffd43b', label: '60-69 (Good)' },
          { color: '#ff6b6b', label: '0-59 (Developing)' }
        ].map((item, idx) => (
          <Box key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Box
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: item.color,
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Text size="xs" style={{ color: 'var(--text-dark)' }}>
              {item.label}
            </Text>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}

export default SkillHeatmap
