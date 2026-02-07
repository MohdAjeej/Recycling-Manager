import { Container, Group, Text, Button, Box, Modal, TextInput, Textarea } from '@mantine/core'
import { IconPhone, IconMail, IconClock } from '@tabler/icons-react'
import { useState } from 'react'

function Header() {
  const [requestOpened, setRequestOpened] = useState(false)
  const [requestForm, setRequestForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleRequestEvaluation = (e) => {
    e.preventDefault()
    // In a real app, this would submit to a backend API
    alert('Evaluation request submitted!\n\nWe will contact you at ' + requestForm.email + ' shortly.')
    setRequestOpened(false)
    setRequestForm({ name: '', email: '', company: '', message: '' })
  }

  return (
    <>
      {/* Top Info Bar */}
      <Box
        style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '10px 0',
          fontSize: '14px'
        }}
      >
        <Container size="xl">
          <Group justify="space-between" wrap="nowrap">
            <Group gap="xl" wrap="nowrap">
              <Group gap={8} wrap="nowrap">
                <IconClock size={16} />
                <Text size="sm">Open Hours: Mon-Fri 8:00 am-6:00 pm</Text>
              </Group>
              <Group gap={8} wrap="nowrap">
                <IconMail size={16} />
                <Text size="sm">Email: hr@recyclingmanager.com</Text>
              </Group>
              <Group gap={8} wrap="nowrap">
                <IconPhone size={16} />
                <Text size="sm">Phone: (239)-543-217-0108</Text>
              </Group>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Navigation Bar */}
      <Box
        style={{
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <Container size="xl">
          <Group justify="space-between" h={70} wrap="nowrap">
            <Group gap={12} wrap="nowrap">
              <Box
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--primary-green)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}
              >
                ♻
              </Box>
              <Text
                size="xl"
                fw={700}
                style={{
                  background: 'linear-gradient(135deg, var(--primary-green), var(--light-green))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Recycling Manager
              </Text>
            </Group>
            <Group gap="md" wrap="nowrap">
              <Button
                variant="filled"
                onClick={() => setRequestOpened(true)}
                style={{
                  backgroundColor: 'var(--primary-green)',
                  '&:hover': {
                    backgroundColor: 'var(--dark-green)'
                  }
                }}
              >
                Request Evaluation
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Request Evaluation Modal */}
      <Modal
        opened={requestOpened}
        onClose={() => {
          setRequestOpened(false)
          setRequestForm({ name: '', email: '', company: '', message: '' })
        }}
        title="Request Evaluation"
        centered
        size="lg"
      >
        <form onSubmit={handleRequestEvaluation}>
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            required
            value={requestForm.name}
            onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
            mb="md"
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
            value={requestForm.email}
            onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
            mb="md"
          />
          <TextInput
            label="Company"
            placeholder="Enter your company name"
            value={requestForm.company}
            onChange={(e) => setRequestForm({ ...requestForm, company: e.target.value })}
            mb="md"
          />
          <Textarea
            label="Message"
            placeholder="Tell us about your evaluation needs..."
            rows={4}
            value={requestForm.message}
            onChange={(e) => setRequestForm({ ...requestForm, message: e.target.value })}
            mb="xl"
          />
          <Group justify="flex-end">
            <Button
              variant="subtle"
              onClick={() => {
                setRequestOpened(false)
                setRequestForm({ name: '', email: '', company: '', message: '' })
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{
                backgroundColor: 'var(--primary-green)',
                '&:hover': {
                  backgroundColor: 'var(--dark-green)'
                }
              }}
            >
              Submit Request
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}

export default Header
