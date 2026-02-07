import { Container, Grid, Text, Group, Box, TextInput, Button, Stack, Title } from '@mantine/core'
import { IconMail, IconPhone, IconClock, IconMapPin, IconBrandFacebook, IconBrandTwitter, IconBrandLinkedin, IconBrandInstagram } from '@tabler/icons-react'

function Footer() {
  return (
    <Box
      style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '60px 0 30px 0',
        marginTop: '60px'
      }}
    >
      <Container size="xl">
        <Grid gutter="xl">
          {/* About Section */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="md">
              <Group gap={12}>
                <Box
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#4caf50',
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
                <Text size="xl" fw={700} style={{ color: 'white' }}>
                  Recycling Manager
                </Text>
              </Group>
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8' }}>
                Find the best candidates for your recycling production line manager role. 
                Our AI-powered evaluation system helps you make informed hiring decisions.
              </Text>
              <Group gap="md" mt="md">
                <Box
                  component="a"
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#4caf50',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <IconBrandFacebook size={18} />
                </Box>
                <Box
                  component="a"
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#4caf50',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <IconBrandTwitter size={18} />
                </Box>
                <Box
                  component="a"
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#4caf50',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <IconBrandLinkedin size={18} />
                </Box>
                <Box
                  component="a"
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#4caf50',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <IconBrandInstagram size={18} />
                </Box>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Useful Links */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="md">
              <Title order={4} style={{ color: 'white', marginBottom: '8px' }}>
                Useful Links
              </Title>
              <Stack gap="xs">
                <Text
                  component="a"
                  href="#"
                  size="sm"
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': { color: '#4caf50' }
                  }}
                >
                  About Us
                </Text>
                <Text
                  component="a"
                  href="#"
                  size="sm"
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': { color: '#4caf50' }
                  }}
                >
                  Services
                </Text>
                <Text
                  component="a"
                  href="#"
                  size="sm"
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': { color: '#4caf50' }
                  }}
                >
                  FAQ
                </Text>
                <Text
                  component="a"
                  href="#"
                  size="sm"
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': { color: '#4caf50' }
                  }}
                >
                  Privacy Policy
                </Text>
                <Text
                  component="a"
                  href="#"
                  size="sm"
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': { color: '#4caf50' }
                  }}
                >
                  Terms & Conditions
                </Text>
                <Text
                  component="a"
                  href="#"
                  size="sm"
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': { color: '#4caf50' }
                  }}
                >
                  Contact Us
                </Text>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Working Hours */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="md">
              <Title order={4} style={{ color: 'white', marginBottom: '8px' }}>
                Working Hours
              </Title>
              <Stack gap="sm">
                <Group gap={12}>
                  <IconClock size={18} style={{ color: '#4caf50' }} />
                  <Box>
                    <Text size="sm" fw={500} style={{ color: 'white' }}>
                      Monday - Friday
                    </Text>
                    <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      8:00 AM - 6:00 PM
                    </Text>
                  </Box>
                </Group>
                <Group gap={12}>
                  <IconClock size={18} style={{ color: '#4caf50' }} />
                  <Box>
                    <Text size="sm" fw={500} style={{ color: 'white' }}>
                      Saturday
                    </Text>
                    <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      9:00 AM - 4:00 PM
                    </Text>
                  </Box>
                </Group>
                <Group gap={12}>
                  <IconClock size={18} style={{ color: '#4caf50' }} />
                  <Box>
                    <Text size="sm" fw={500} style={{ color: 'white' }}>
                      Sunday
                    </Text>
                    <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      Closed
                    </Text>
                  </Box>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Get in Touch / Newsletter */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="md">
              <Title order={4} style={{ color: 'white', marginBottom: '8px' }}>
                Subscribe Our Newsletter
              </Title>
              <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Stay updated with the latest candidate evaluations and hiring insights.
              </Text>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  alert('Thank you for subscribing!')
                }}
              >
                <Stack gap="sm">
                  <TextInput
                    placeholder="Enter your email"
                    type="email"
                    required
                    style={{
                      '& input': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        '&::placeholder': {
                          color: 'rgba(255,255,255,0.5)'
                        },
                        '&:focus': {
                          borderColor: '#4caf50'
                        }
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    style={{
                      backgroundColor: '#4caf50',
                      '&:hover': {
                        backgroundColor: '#45a049'
                      }
                    }}
                  >
                    Subscribe
                  </Button>
                </Stack>
              </form>

              <Box mt="md" pt="md" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Stack gap="sm">
                  <Group gap={12}>
                    <IconMail size={18} style={{ color: '#4caf50' }} />
                    <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      hr@recyclingmanager.com
                    </Text>
                  </Group>
                  <Group gap={12}>
                    <IconPhone size={18} style={{ color: '#4caf50' }} />
                    <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      (239)-543-217-0108
                    </Text>
                  </Group>
                  <Group gap={12} align="flex-start">
                    <IconMapPin size={18} style={{ color: '#4caf50', marginTop: '2px' }} />
                    <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      8302 Preston Rd. Maine 9380
                    </Text>
                  </Group>
                </Stack>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Bottom Bar */}
        <Box
          mt="xl"
          pt="xl"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}
        >
          <Text size="sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            © 2024 Recycling Production Line Manager Selection System. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
