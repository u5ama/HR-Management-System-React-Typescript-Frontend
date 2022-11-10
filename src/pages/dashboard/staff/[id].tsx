import qs from 'qs';
import {
  Avatar,
  Group,
  Text,
  ActionIcon,
  Container,
  Title,
  Button,
  Anchor,
  Grid,
  Stack,
  Tabs,
  TextInput,
} from '@mantine/core';
import {
  IconPencil,
  IconUserX,
  IconUserCheck,
  IconArrowLeft,
  IconSettings,
  IconChecks,
  IconFolder,
  IconNotes,
  IconUserCircle,
  IconSearch,
  IconFilePlus,
  IconAddressBook,
  IconHierarchy3,
  IconHierarchy,
} from '@tabler/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function DashboardEmployee() {
  const navigate = useNavigate();
  const { tab } = qs.parse(useLocation().search.replace('?', ''));

  return (
    <Container fluid px={48} py="xl" pb="96px">
      <Anchor component="span">
        <Link to="../staff">
          <Button leftIcon={<IconArrowLeft />} variant="subtle">
            Back to all Staff
          </Button>
        </Link>
      </Anchor>

      <Container mt="xl" size="xl">
        <Title order={1}>John Doe</Title>

        <Grid mt="lg" gutter="xl">
          <Grid.Col span={3}>
            <Stack>
              <Stack
                p="xl"
                sx={theme => ({
                  backgroundColor: theme.colors.dark[6],
                  borderRadius: theme.radius.md,
                })}
                spacing={0}
                align="center"
              >
                <Avatar color="indigo" radius={100} size={120} mb="xs">
                  JD
                </Avatar>
                <Title order={3}>John Doe</Title>
                <Text>Design Director</Text>
              </Stack>

              <Button leftIcon={<IconUserCheck />} size="md" fullWidth>
                Begin Corrective Action
              </Button>

              <Button
                color="red"
                variant="light"
                leftIcon={<IconUserX />}
                size="md"
                fullWidth
              >
                Begin Resignation/Termination
              </Button>
            </Stack>
          </Grid.Col>

          <Grid.Col span={8}>
            <Tabs
              variant="pills"
              defaultValue="todo"
              value={tab as string}
              onTabChange={value => navigate(`?tab=${value}`)}
            >
              <Tabs.List>
                <Tabs.Tab value="todo" icon={<IconChecks />}>
                  To Do's
                </Tabs.Tab>

                <Tabs.Tab value="folder" icon={<IconFolder />}>
                  Folder
                </Tabs.Tab>

                <Tabs.Tab value="notes" icon={<IconNotes />}>
                  Notes
                </Tabs.Tab>

                <Tabs.Tab value="profile" icon={<IconUserCircle />}>
                  Profile
                </Tabs.Tab>

                <Tabs.Tab value="settings" icon={<IconSettings />}>
                  Settings
                </Tabs.Tab>

                <ActionIcon
                  radius="md"
                  size="lg"
                  sx={{ height: 44, width: 44 }}
                >
                  <IconSearch />
                </ActionIcon>
              </Tabs.List>

              <Tabs.Panel value="todo" pt="xl">
                <Stack mt={32} align="center" spacing={6}>
                  <Title order={3} size="h2">
                    No Items Yet
                  </Title>
                  <Text>Policies and Corrective Actions Will Appear Here</Text>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="folder" pt="xl">
                <Stack mt={32} align="center">
                  <Title order={3} size="h2">
                    No Files Yet
                  </Title>

                  <Button leftIcon={<IconFilePlus />} size="md" variant="light">
                    Add File
                  </Button>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="notes" pt="xl">
                <Stack mt={32} align="center">
                  <Title order={3} size="h2">
                    No Notes Added Yet
                  </Title>

                  <Button leftIcon={<IconPencil />} size="md" variant="light">
                    Add Note
                  </Button>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="profile" pt="xl">
                <Stack mt={32} align="center">
                  <Title order={3} size="h2">
                    User Profile
                  </Title>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="settings" pt="xl">
                <Stack spacing="md">
                  <Stack
                    align="flex-start"
                    p="xl"
                    sx={theme => ({
                      backgroundColor: theme.colors.dark[6],
                      borderRadius: theme.radius.md,
                    })}
                  >
                    <Group>
                      <IconAddressBook size={32} stroke={1.5} />

                      <Title order={3}>Emergency Contact Information</Title>
                    </Group>

                    <Grid>
                      <Grid.Col span={6}>
                        <TextInput label="Name" placeholder="John Doe" />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          label="Phone Number"
                          placeholder="+1 (234) 567 89"
                        />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput label="Relationship" placeholder="Mother" />
                      </Grid.Col>

                      <Grid.Col span={6}>
                        <TextInput
                          type="email"
                          label="Email"
                          placeholder="example@email.com"
                        />
                      </Grid.Col>
                    </Grid>

                    <Button size="md">Save</Button>
                  </Stack>

                  <Stack
                    align="flex-start"
                    p="xl"
                    sx={theme => ({
                      backgroundColor: theme.colors.dark[6],
                      borderRadius: theme.radius.md,
                    })}
                  >
                    <Group>
                      <IconHierarchy3 size={32} stroke={1.5} />

                      <Title order={3}>Make John a Manager</Title>
                    </Group>

                    <Text>
                      The Manager role allows the user to create performance
                      plans, written warnings, verbal warnings and document
                      incidents for their direct reports.
                    </Text>

                    <Button size="md" variant="light">
                      Make Manager
                    </Button>
                  </Stack>

                  <Stack
                    align="flex-start"
                    p="xl"
                    sx={theme => ({
                      backgroundColor: theme.colors.dark[6],
                      borderRadius: theme.radius.md,
                    })}
                  >
                    <Group>
                      <IconHierarchy size={32} stroke={1.5} />

                      <Title order={3}>John Reports To</Title>
                    </Group>

                    <Text>Jenn Doe</Text>

                    <Button size="md" variant="light">
                      Reassign Manager
                    </Button>
                  </Stack>

                  <Stack
                    align="flex-start"
                    p="xl"
                    sx={theme => ({
                      backgroundColor: theme.colors.dark[6],
                      borderRadius: theme.radius.md,
                    })}
                  >
                    <Group>
                      <IconUserX size={32} stroke={1.5} />

                      <Title order={3}>Account Status</Title>
                    </Group>

                    <Text>Active</Text>

                    <Button size="md" color="red" variant="light">
                      Begin Resignation/Termination
                    </Button>
                  </Stack>
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
}

export default DashboardEmployee;
