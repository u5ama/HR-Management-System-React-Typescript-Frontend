import SearchBar from '@components/SearchBar/SearchBar';
import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  Container,
  Title,
  Button,
  Tooltip,
  Select,
} from '@mantine/core';
import {
  IconPencil,
  IconMessages,
  IconDots,
  IconFiles,
  IconUser,
  IconUserX,
  IconUserCheck,
  IconMessage,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
import staff from './staff.json';

function DashboardStaff() {
  const Rows = staff.data.map(item => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
            <Text color="dimmed" size="xs">
              {item.job}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Text size="sm">{item.email}</Text>
        <Text size="xs" color="dimmed">
          Email
        </Text>
      </td>
      <td>
        <Text size="sm">${item.rate.toFixed(1)} / hr</Text>
        <Text size="xs" color="dimmed">
          Rate
        </Text>
      </td>

      <td>
        <Group spacing="sm" position="right">
          <Tooltip label="Message Staff" position="left" withArrow>
            <ActionIcon>
              <IconMessage size={24} stroke={1.5} />
            </ActionIcon>
          </Tooltip>

          <Menu transition="pop" withArrow position="bottom-end">
            <Menu.Target>
              <Tooltip label="More Actions" position="right" withArrow>
                <ActionIcon>
                  <IconDots size={24} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconPencil size={16} />}>
                Edit Details
              </Menu.Item>
              <Menu.Item icon={<IconMessages size={16} />}>
                Send message
              </Menu.Item>
              <Menu.Item icon={<IconFiles size={16} />}>
                View Documents
              </Menu.Item>
              <Menu.Item icon={<IconUser size={16} />}>Edit Profile</Menu.Item>

              <Menu.Divider />

              <Menu.Item icon={<IconUserCheck size={16} />}>
                Begin Corrective Action
              </Menu.Item>
              <Menu.Item icon={<IconUserX size={16} />} color="red">
                Begin Resignation/Termination
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Container fluid px={48} py="xl">
      <Title>Staff</Title>

      <Container size="lg">
        <Group spacing="sm">
          <SearchBar sx={{ flexGrow: 1 }} />

          <Link to="add">
            <Button size="md" leftIcon={<IconUserPlus size={20} />}>
              Add Staff
            </Button>
          </Link>

          <Button size="md" leftIcon={<IconUsers size={20} />} variant="light">
            Bulk Add
          </Button>

          <Button
            size="md"
            leftIcon={<IconMessages size={20} />}
            variant="light"
          >
            Bulk Message
          </Button>
        </Group>
      </Container>

      <Container
        size="lg"
        p="xl"
        mt="xl"
        sx={theme => ({
          backgroundColor: theme.colors.dark[6],
          borderRadius: theme.radius.md,
        })}
      >
        <Group position="apart">
          <Group spacing="sm">
            <Select
              size="md"
              label="Status"
              placeholder="Current"
              data={[
                { value: '0', label: 'Not Invited' },
                { value: '1', label: 'Invited' },
                { value: '2', label: 'Active' },
                { value: '3', label: 'Former' },
              ]}
              clearable
            />

            <Select
              size="md"
              label="Role"
              placeholder="Any"
              data={[
                { value: '0', label: 'Employee' },
                { value: '1', label: 'Manager' },
                { value: '2', label: 'Contractor' },
              ]}
              clearable
            />
          </Group>

          <Select
            size="md"
            label="Sort"
            placeholder="None"
            data={[
              { value: '0', label: 'A - Z' },
              { value: '1', label: 'Z - A' },
            ]}
            clearable
          />
        </Group>
      </Container>

      <Container size="lg" mt="xl">
        <Title order={2}>Staff List</Title>
        <Table sx={{ minWidth: 800 }} verticalSpacing="md">
          <tbody>{Rows}</tbody>
        </Table>
      </Container>
    </Container>
  );
}

export default DashboardStaff;
