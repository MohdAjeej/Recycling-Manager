import { useState } from 'react'
import { Grid, Card, Text, Badge, Group, Stack, Title, Button, Tooltip, Box, Paper, TextInput, Select } from '@mantine/core'
import { IconShare, IconMail, IconMapPin, IconBriefcase, IconSchool, IconSearch, IconPhone } from '@tabler/icons-react'

function CandidateCards({ candidates }) {
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

  const handleShare = (candidate) => {
    const shareText = `Candidate: ${candidate.name}\nScore: ${(
      (candidate.evaluation.crisis_management_score +
      candidate.evaluation.sustainability_score +
      candidate.evaluation.team_motivation_score) / 3
    ).toFixed(1)}/100`
    
    if (navigator.share) {
      navigator.share({
        title: `Candidate: ${candidate.name}`,
        text: shareText
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Candidate information copied to clipboard!')
    }
  }

  // Sort by total score
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

  const [searchQuery, setSearchQuery] = useState('')
  const [filterExperience, setFilterExperience] = useState(null)
  const [filterScore, setFilterScore] = useState(null)

  // Filter candidates
  let filteredCandidates = sortedCandidates.filter(candidate => {
    const matchesSearch = !searchQuery || 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesExperience = !filterExperience || 
      (filterExperience === 'junior' && candidate.experience_years < 5) ||
      (filterExperience === 'mid' && candidate.experience_years >= 5 && candidate.experience_years < 10) ||
      (filterExperience === 'senior' && candidate.experience_years >= 10)
    
    const matchesScore = !filterScore ||
      (filterScore === 'high' && candidate.totalScore >= 80) ||
      (filterScore === 'medium' && candidate.totalScore >= 60 && candidate.totalScore < 80) ||
      (filterScore === 'low' && candidate.totalScore < 60)
    
    return matchesSearch && matchesExperience && matchesScore
  })

  return (
    <Box>
      <Group justify="space-between" mb="xl" wrap="wrap">
        <Title order={2} style={{ color: 'var(--text-dark)' }}>
          All Candidates ({filteredCandidates.length})
        </Title>
      </Group>

      {/* Advanced Filters */}
      <Paper p="md" mb="xl" radius="md" style={{ backgroundColor: 'var(--bg-light)' }}>
        <Group gap="md" wrap="wrap">
          <TextInput
            placeholder="Search by name, email, skills, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, minWidth: 200 }}
            leftSection={<IconSearch size={16} />}
          />
          <Select
            placeholder="Experience Level"
            value={filterExperience}
            onChange={setFilterExperience}
            data={[
              { value: 'junior', label: 'Junior (< 5 years)' },
              { value: 'mid', label: 'Mid (5-10 years)' },
              { value: 'senior', label: 'Senior (10+ years)' }
            ]}
            clearable
            style={{ minWidth: 180 }}
          />
          <Select
            placeholder="Score Range"
            value={filterScore}
            onChange={setFilterScore}
            data={[
              { value: 'high', label: 'High (80+)' },
              { value: 'medium', label: 'Medium (60-79)' },
              { value: 'low', label: 'Low (< 60)' }
            ]}
            clearable
            style={{ minWidth: 150 }}
          />
          {(searchQuery || filterExperience || filterScore) && (
            <Button
              variant="subtle"
              onClick={() => {
                setSearchQuery('')
                setFilterExperience(null)
                setFilterScore(null)
              }}
            >
              Clear Filters
            </Button>
          )}
        </Group>
      </Paper>

      <Grid>
        {filteredCandidates.map((candidate) => (
          <Grid.Col key={candidate.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="md"
              padding="xl"
              radius="md"
              style={{
                height: '100%',
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(45, 134, 89, 0.15)',
                  borderColor: 'var(--primary-green)'
                }
              }}
            >
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Text fw={700} size="lg" style={{ color: 'var(--text-dark)', marginBottom: '4px' }}>
                      {candidate.name}
                    </Text>
                    <Group gap={8} wrap="nowrap">
                      <IconMail size={14} style={{ color: 'var(--text-light)' }} />
                      <Text size="xs" c="dimmed" style={{ wordBreak: 'break-word' }}>
                        {candidate.email}
                      </Text>
                    </Group>
                  </Box>
                  <Badge
                    size="lg"
                    style={{
                      backgroundColor: getScoreColor(candidate.totalScore) + '20',
                      color: getScoreColor(candidate.totalScore),
                      fontWeight: 700,
                      fontSize: '16px',
                      padding: '8px 12px',
                      border: `2px solid ${getScoreColor(candidate.totalScore)}`
                    }}
                  >
                    {candidate.totalScore.toFixed(1)}
                  </Badge>
                </Group>

                <Box
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--bg-light)',
                    borderRadius: '8px'
                  }}
                >
                  <Group gap={8} mb={8}>
                    <IconBriefcase size={16} style={{ color: 'var(--primary-green)' }} />
                    <Text size="sm" fw={500}>{candidate.previous_role}</Text>
                  </Group>
                  <Group gap={8} mb={8}>
                    <IconSchool size={16} style={{ color: 'var(--primary-green)' }} />
                    <Text size="sm" c="dimmed">{candidate.education}</Text>
                  </Group>
                  <Group gap={8}>
                    <IconMapPin size={16} style={{ color: 'var(--primary-green)' }} />
                    <Text size="sm" c="dimmed">{candidate.location}</Text>
                  </Group>
                </Box>

                <Box>
                  <Text size="sm" fw={600} mb="xs" style={{ color: 'var(--text-dark)' }}>
                    Experience: {candidate.experience_years} years
                  </Text>
                  <Text size="sm" fw={500} mb="xs" style={{ color: 'var(--text-dark)' }}>
                    Skills
                  </Text>
                  <Group gap="xs">
                    {candidate.skills.split(', ').slice(0, 3).map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="light"
                        size="sm"
                        style={{
                          backgroundColor: 'var(--primary-green)20',
                          color: 'var(--primary-green)',
                          border: '1px solid var(--primary-green)40'
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.split(', ').length > 3 && (
                      <Badge variant="light" size="sm" color="gray">
                        +{candidate.skills.split(', ').length - 3} more
                      </Badge>
                    )}
                  </Group>
                </Box>

                <Box
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--bg-light)',
                    borderRadius: '8px'
                  }}
                >
                  <Text size="sm" fw={600} mb="xs" style={{ color: 'var(--text-dark)' }}>
                    Evaluation Scores
                  </Text>
                  <Group gap="xs">
                    <Tooltip label="Crisis Management">
                      <Badge
                        color={getScoreBadgeColor(candidate.evaluation.crisis_management_score)}
                        variant="light"
                        style={{
                          backgroundColor: getScoreColor(candidate.evaluation.crisis_management_score) + '20',
                          color: getScoreColor(candidate.evaluation.crisis_management_score),
                          fontWeight: 600
                        }}
                      >
                        CM: {candidate.evaluation.crisis_management_score.toFixed(0)}
                      </Badge>
                    </Tooltip>
                    <Tooltip label="Sustainability">
                      <Badge
                        color={getScoreBadgeColor(candidate.evaluation.sustainability_score)}
                        variant="light"
                        style={{
                          backgroundColor: getScoreColor(candidate.evaluation.sustainability_score) + '20',
                          color: getScoreColor(candidate.evaluation.sustainability_score),
                          fontWeight: 600
                        }}
                      >
                        S: {candidate.evaluation.sustainability_score.toFixed(0)}
                      </Badge>
                    </Tooltip>
                    <Tooltip label="Team Motivation">
                      <Badge
                        color={getScoreBadgeColor(candidate.evaluation.team_motivation_score)}
                        variant="light"
                        style={{
                          backgroundColor: getScoreColor(candidate.evaluation.team_motivation_score) + '20',
                          color: getScoreColor(candidate.evaluation.team_motivation_score),
                          fontWeight: 600
                        }}
                      >
                        TM: {candidate.evaluation.team_motivation_score.toFixed(0)}
                      </Badge>
                    </Tooltip>
                  </Group>
                </Box>

                <Button
                  fullWidth
                  leftSection={<IconShare size={18} />}
                  style={{
                    backgroundColor: 'var(--primary-green)',
                    '&:hover': {
                      backgroundColor: 'var(--dark-green)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(45, 134, 89, 0.3)'
                    },
                    transition: 'all 0.3s ease',
                    marginTop: '8px'
                  }}
                  onClick={() => handleShare(candidate)}
                >
                  Share Candidate
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  )
}

export default CandidateCards
