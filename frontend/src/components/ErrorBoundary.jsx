import { Component } from 'react'
import { Box, Container, Title, Text, Button } from '@mantine/core'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 0' }}>
          <Container size="md">
            <Box style={{ textAlign: 'center' }}>
              <Title order={1} mb="md" c="red">
                Something went wrong
              </Title>
              <Text size="lg" mb="xl" c="dimmed">
                {this.state.error?.message || 'An unexpected error occurred'}
              </Text>
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.reload()
                }}
                color="green"
                size="lg"
              >
                Reload Page
              </Button>
            </Box>
          </Container>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
