import { Grid, Paper, Text, Title, Group, Box } from '@mantine/core'
import { IconShield, IconLeaf, IconUsersGroup } from '@tabler/icons-react'

function FeatureCards() {
  const features = [
    {
      icon: IconShield,
      title: 'Crisis Management',
      description: 'Evaluate candidates on their ability to handle production disruptions, make quick decisions, and coordinate teams during emergencies.',
      color: '#4caf50'
    },
    {
      icon: IconLeaf,
      title: 'Sustainability Knowledge',
      description: 'Assess understanding of recycling processes, environmental regulations, and commitment to sustainable practices.',
      color: '#66bb6a'
    },
    {
      icon: IconUsersGroup,
      title: 'Team Motivation',
      description: 'Measure leadership capabilities, employee development skills, and ability to maintain team morale in production environments.',
      color: '#81c784'
    }
  ]

  return (
    <Grid gutter="xl" mt="xl">
      {features.map((feature, index) => (
        <Grid.Col key={index} span={{ base: 12, md: 4 }}>
          <Paper
            p="xl"
            radius="md"
            style={{
              height: '100%',
              backgroundColor: 'white',
              border: `2px solid ${feature.color}20`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: `0 8px 24px ${feature.color}30`,
                borderColor: feature.color
              }
            }}
          >
            <Group gap="md" mb="md">
              <Box
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: `${feature.color}20`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <feature.icon size={32} style={{ color: feature.color }} />
              </Box>
              <Title order={3} style={{ color: 'var(--text-dark)' }}>
                {feature.title}
              </Title>
            </Group>
            <Text size="sm" c="dimmed" style={{ lineHeight: '1.7' }}>
              {feature.description}
            </Text>
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default FeatureCards
