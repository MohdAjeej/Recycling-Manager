import { useState, useEffect } from 'react'
import { Container, Tabs, Box, Loader, Center, Text, Group, Button } from '@mantine/core'
import { IconFileTypeCsv, IconFileTypeJson, IconFileTypePdf } from '@tabler/icons-react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeatureCards from './components/FeatureCards'
import Leaderboard from './components/Leaderboard'
import SkillHeatmap from './components/SkillHeatmap'
import CandidateCards from './components/CandidateCards'
import CandidateComparison from './components/CandidateComparison'
import Footer from './components/Footer'
import AIEvaluationPanel from './components/AIEvaluationPanel'
import { mockCandidates } from './data/mockData'
import { exportToCSV, exportToJSON, exportToPDF } from './utils/exportUtils'

function App() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        // Try to load from JSON file first, fallback to mock data
        let data = []
        try {
          const jsonData = await import('./data/candidates.json')
          data = jsonData.default?.candidates || jsonData.candidates || []
        } catch (jsonError) {
          // If JSON file doesn't exist, use mock data
          console.log('Using mock candidate data')
          data = mockCandidates || []
        }
        
        setCandidates(data)
        setError(null)
      } catch (err) {
        console.error('Error loading candidates:', err)
        // Fallback to mock data on error
        setCandidates(mockCandidates || [])
        setError(null)
      } finally {
        setLoading(false)
      }
    }
    
    loadCandidates()
  }, [])

  const stats = {
    topCandidates: 10,
    total: candidates.length,
    active: candidates.length
  }

  if (loading) {
    return (
      <Box style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Header />
        <Center h={400}>
          <Loader size="lg" color="green" />
        </Center>
      </Box>
    )
  }

  if (error) {
    return (
      <Box style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Header />
        <Container size="xl" py="xl">
          <Center h={400}>
            <Text c="red" size="lg">Error loading data: {error}</Text>
          </Center>
        </Container>
      </Box>
    )
  }

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Header />
      <HeroSection stats={stats} />
      
      <Container size="xl" py="xl">
        <FeatureCards />
        
        <Box mt="xl" mb="xl">
          <AIEvaluationPanel 
            candidates={candidates} 
            onEvaluationComplete={(results) => {
              // Results are automatically displayed in the AIEvaluationPanel component
              // In a real app, you would update the candidates data here
            }}
          />
        </Box>
        
        <Box mt="xl" mb="xl">
          <Tabs 
            defaultValue="leaderboard"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}
          >
            <Tabs.List 
              style={{
                borderBottom: '2px solid #e0e0e0',
                marginBottom: '24px'
              }}
            >
              <Tabs.Tab 
                value="leaderboard"
                style={{
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Top 10 Leaderboard
              </Tabs.Tab>
              <Tabs.Tab 
                value="heatmap"
                style={{
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Skill Heatmap
              </Tabs.Tab>
              <Tabs.Tab 
                value="candidates"
                style={{
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                All Candidates
              </Tabs.Tab>
              <Tabs.Tab 
                value="comparison"
                style={{
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Compare Candidates
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="leaderboard" pt="xl">
              <Leaderboard candidates={candidates} />
            </Tabs.Panel>

            <Tabs.Panel value="heatmap" pt="xl">
              <SkillHeatmap candidates={candidates} />
            </Tabs.Panel>

            <Tabs.Panel value="candidates" pt="xl">
              <CandidateCards candidates={candidates} />
            </Tabs.Panel>

            <Tabs.Panel value="comparison" pt="xl">
              <CandidateComparison candidates={candidates} />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Container>

      <Footer />
    </Box>
  )
}

export default App
