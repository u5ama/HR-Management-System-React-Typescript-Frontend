import { IStaffDocument } from '@app-types/staff';
import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import {
  Box,
  Group,
  Menu,
  ActionIcon,
  Text,
  Loader,
  Stack,
  Title,
  ThemeIcon,
  Button,
  useMantineTheme,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  IconCalendarEvent,
  IconCheck,
  IconDots,
  IconFile,
  IconTrash,
} from '@tabler/icons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from '@utils/constants';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

function FileItem({ doc }: Props) {
  const queryClient = useQueryClient();
  const authHeader = useAuthHeader();
  const { id: staff_id } = useParams();
  const theme = useMantineTheme();

  const deleteFileMutation = useMutation(
    async () => {
      await axiosClient.delete(`/company/staff_documents/${doc.id}`, {
        headers: authHeader,
      });
    },
    {
      onSuccess() {
        showNotification({
          title: 'Success',
          message: 'File deleted successfully',
          icon: <IconCheck size={18} />,
          color: 'teal',
        });
      },
      onSettled() {
        queryClient.invalidateQueries(['documents', staff_id]);
      },
    }
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.dark[6],
        borderRadius: theme.radius.sm,
        overflow: 'hidden',
      }}
    >
      <Group align="stretch" noWrap>
        <Box sx={{ minHeight: 100 }}>
          <ThemeIcon variant="light" sx={{ height: '100%', width: 100 }}>
            <IconFile size={72} stroke={1} />
          </ThemeIcon>
        </Box>

        <Stack spacing={0} justify="end" py="sm">
          <Title order={3}>{doc.document_title}</Title>

          <Group spacing={0} mt={4}>
            <IconCalendarEvent size={16} color={theme.colors.dark[1]} />
            <Text size="sm" color="dimmed" ml={4}>
              {dayjs(doc.created_at).format('MMMM DD, YYYY')}
            </Text>
          </Group>
        </Stack>

        <Group ml="auto" mr="md" sx={{ flexShrink: 0 }}>
          <Button
            variant="light"
            onClick={() => window.open(`${API_BASE_URL}${doc.document_file}`)}
          >
            View
          </Button>

          <Menu transition="pop" withArrow position="bottom-start">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={32} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                closeMenuOnClick={false}
                icon={
                  deleteFileMutation.isLoading ? (
                    <Loader size={16} color="red" />
                  ) : (
                    <IconTrash size={16} />
                  )
                }
                color="red"
                disabled={deleteFileMutation.isLoading}
                onClick={() => deleteFileMutation.mutate()}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Box>
  );
}

export default FileItem;

interface Props {
  doc: IStaffDocument;
  onDelete?: () => void;
}
