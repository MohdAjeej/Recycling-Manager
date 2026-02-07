import { Container, Title, Text, Button, Group, Box, Grid, Paper } from '@mantine/core'
import { IconTrophy, IconChartBar, IconUsers } from '@tabler/icons-react'

function HeroSection({ stats }) {
  return (
    <Box
      style={{
        background: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative dots pattern */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle, rgba(45, 134, 89, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.5
        }}
      />
      
      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text
              size="sm"
              fw={600}
              style={{
                color: 'var(--primary-green)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '16px'
              }}
            >
              Candidate Selection System
            </Text>
            <Title
              order={1}
              size="3.5rem"
              fw={800}
              style={{
                marginBottom: '24px',
                lineHeight: '1.2',
                color: 'var(--text-dark)'
              }}
            >
              Your Recycling Production Line Manager Selection Solutions
            </Title>
            <Text
              size="lg"
              style={{
                color: 'var(--text-light)',
                marginBottom: '32px',
                lineHeight: '1.8'
              }}
            >
              Find the best candidates for your recycling production line manager role. 
              Our AI-powered evaluation system ranks candidates based on crisis management, 
              sustainability knowledge, and team motivation.
            </Text>
            <Group gap="md">
              <Button
                size="lg"
                style={{
                  backgroundColor: 'var(--primary-green)',
                  padding: '12px 32px',
                  fontSize: '16px',
                  '&:hover': {
                    backgroundColor: 'var(--dark-green)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(45, 134, 89, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                View Top Candidates
              </Button>
              <Button
                size="lg"
                variant="outline"
                style={{
                  borderColor: 'var(--primary-green)',
                  color: 'var(--primary-green)',
                  padding: '12px 32px',
                  fontSize: '16px',
                  '&:hover': {
                    backgroundColor: 'var(--primary-green)',
                    color: 'white'
                  }
                }}
              >
                Learn More
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap'
              }}
            >
              {[
                { icon: IconTrophy, label: 'Top Candidates', value: stats?.topCandidates || 10, color: '#4caf50' },
                { icon: IconChartBar, label: 'Evaluated', value: stats?.total || 40, color: '#66bb6a' },
                { icon: IconUsers, label: 'Active', value: stats?.active || 40, color: '#81c784' }
              ].map((stat, idx) => (
                <Paper
                  key={idx}
                  p="xl"
                  radius="md"
                  style={{
                    backgroundColor: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    minWidth: '150px',
                    border: `2px solid ${stat.color}20`
                  }}
                >
                  <stat.icon size={40} style={{ color: stat.color, marginBottom: '12px' }} />
                  <Text size="2rem" fw={700} style={{ color: stat.color, marginBottom: '8px' }}>
                    {stat.value}
                  </Text>
                  <Text size="sm" c="dimmed" fw={500}>
                    {stat.label}
                  </Text>
                </Paper>
              ))}
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  )
}

export default HeroSection
