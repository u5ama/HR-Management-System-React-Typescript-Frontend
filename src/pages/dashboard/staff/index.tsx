import SearchBar from '@components/SearchBar/SearchBar';
import useAuth, { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import { useQuery } from '@tanstack/react-query';

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
  Loader,
  Stack,
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
  IconX,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
import { IResponse } from '@app-types/api';
import { Staff } from '@app-types/staff';
import { showNotification } from '@mantine/notifications';

function DashboardStaff() {
  const { user } = useAuth()!;
  const authHeader = useAuthHeader();

  const { isLoading, data, isSuccess } = useQuery(
    ['staff', user?.id],
    async () => {
      const response = await axiosClient.get<IResponse<Staff[]>>(
        `/company/staff?company_id=${user?.id}`,
        { headers: authHeader }
      );

      return response.data;
    },
    {
      onError(error: any) {
        showNotification({
          title: 'Oops!',
          message: error.response?.data?.message || 'Something went wrong',
          icon: <IconX size={18} />,
          color: 'red',
        });
      },
    }
  );

  const Rows = !isSuccess
    ? null
    : data.data?.map(item => (
        <tr key={item.id}>
          <td>
            <Link
              to={`${item.id}`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Group spacing="sm">
                <Avatar size={40} radius={40} color="indigo">
                  {item.first_name?.charAt(0).toUpperCase()}
                  {item.last_name?.charAt(0).toUpperCase()}
                </Avatar>

                <div>
                  <Text size="sm" weight={500}>
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text color="dimmed" size="xs">
                    {item.type_of_worker}
                  </Text>
                </div>
              </Group>
            </Link>
          </td>

          <td>
            <Text size="sm">{item.email}</Text>
            <Text size="xs" color="dimmed">
              Email
            </Text>
          </td>
          <td>
            <Text size="sm">${item.pay_rate_amount} / hr</Text>
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
                  <Link to={`${item.id}`} style={{ textDecoration: 'none' }}>
                    <Menu.Item icon={<IconPencil size={16} />}>
                      Edit Details
                    </Menu.Item>
                  </Link>
                  <Menu.Item icon={<IconMessages size={16} />}>
                    Send message
                  </Menu.Item>
                  <Menu.Item icon={<IconFiles size={16} />}>
                    View Documents
                  </Menu.Item>
                  <Menu.Item icon={<IconUser size={16} />}>
                    Edit Profile
                  </Menu.Item>

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
        {isLoading ? (
          <Stack mt="xl" align="center">
            <Loader />
            <Text>Loading...</Text>
          </Stack>
        ) : (
          <Table sx={{ minWidth: 800 }} verticalSpacing="md">
            <tbody>{Rows}</tbody>
          </Table>
        )}
      </Container>
    </Container>
  );
}

export default DashboardStaff;
