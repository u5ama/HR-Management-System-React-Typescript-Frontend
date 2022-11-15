import qs from 'qs';
import {
  Avatar,
  Text,
  ActionIcon,
  Container,
  Title,
  Button,
  Anchor,
  Grid,
  Stack,
  Tabs,
  Loader,
} from '@mantine/core';
import {
  IconUserX,
  IconUserCheck,
  IconArrowLeft,
  IconSettings,
  IconChecks,
  IconFolder,
  IconNotes,
  IconUserCircle,
  IconSearch,
} from '@tabler/icons';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import NotesTab from '@components/NotesTab/NotesTab';
import SettingsTab from '@components/SettingsTab/SettingsTab';
import FolderTab from '@components/FolderTab/FolderTab';
import ProfileTab from '@components/ProfileTab/ProfileTab';
import { useStaffOne } from '@api/staff/staff';

function DashboardEmployee() {
  const navigate = useNavigate();
  const { tab } = qs.parse(useLocation().search.replace('?', ''));
  const { id } = useParams();

  const { isLoading, data } = useStaffOne(parseInt(id!));

  return (
    <Container fluid px={48} py="xl" pb="96px">
      <Anchor component="span">
        <Link to="../staff">
          <Button leftIcon={<IconArrowLeft />} variant="subtle">
            Back to all Staff
          </Button>
        </Link>
      </Anchor>

      {isLoading ? (
        <Stack mt="xl" align="center">
          <Loader />
          <Text>Loading...</Text>
        </Stack>
      ) : (
        <Container mt="xl" size="xl">
          <Title order={1}>
            {data?.data?.first_name} {data?.data?.last_name}
          </Title>

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
                    {data?.data?.first_name?.charAt(0).toUpperCase()}
                    {data?.data?.last_name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Title order={3}>
                    {data?.data?.first_name} {data?.data?.last_name}
                  </Title>
                  <Text transform="capitalize">
                    {data?.data?.type_of_worker}
                  </Text>
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
                    <Text>
                      Policies and Corrective Actions Will Appear Here
                    </Text>
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="folder" pt="xl">
                  <FolderTab />
                </Tabs.Panel>

                <Tabs.Panel value="notes" pt="xl">
                  <NotesTab />
                </Tabs.Panel>

                <Tabs.Panel value="profile" pt="xl">
                  <ProfileTab staff={data?.data} />
                </Tabs.Panel>

                <Tabs.Panel value="settings" pt="xl">
                  <SettingsTab />
                </Tabs.Panel>
              </Tabs>
            </Grid.Col>
          </Grid>
        </Container>
      )}
    </Container>
  );
}

export default DashboardEmployee;
