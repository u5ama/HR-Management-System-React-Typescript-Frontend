import { IStaffNote } from '@app-types/staff';
import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import {
  Box,
  Group,
  Badge,
  Menu,
  ActionIcon,
  Text,
  Loader,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  IconCheck,
  IconDots,
  IconEye,
  IconPencil,
  IconTrash,
} from '@tabler/icons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

function Note({ note, onEdit, onView }: Props) {
  const queryClient = useQueryClient();
  const authHeader = useAuthHeader();
  const { id: staff_id } = useParams();

  const deleteNoteMutation = useMutation(
    async () => {
      await axiosClient.delete(`/company/staff_notes/${note.id}`, {
        headers: authHeader,
      });
    },
    {
      onSuccess() {
        showNotification({
          title: 'Success',
          message: 'Staff Note deleted successfully',
          icon: <IconCheck size={18} />,
          color: 'teal',
        });
      },
      onSettled() {
        queryClient.invalidateQueries(['notes', staff_id]);
      },
    }
  );

  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.colors.dark[6],
        borderRadius: theme.radius.sm,
        minWidth: 300,
      })}
      p="lg"
    >
      <Group position="apart">
        <Badge size="sm">{note.note_type}</Badge>
        <Menu transition="pop" withArrow position="bottom-start">
          <Menu.Target>
            <ActionIcon>
              <IconDots size={24} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconEye size={16} />} onClick={onView}>
              View
            </Menu.Item>

            <Menu.Item icon={<IconPencil size={16} />} onClick={onEdit}>
              Edit
            </Menu.Item>

            <Menu.Item
              closeMenuOnClick={false}
              icon={
                deleteNoteMutation.isLoading ? (
                  <Loader size={16} color="red" />
                ) : (
                  <IconTrash size={16} />
                )
              }
              color="red"
              disabled={deleteNoteMutation.isLoading}
              onClick={() => deleteNoteMutation.mutate()}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Group mt="sm">
        <Text size="sm" color="dimmed">
          {dayjs(note.note_date).format('MMMM DD, YYYY')}
        </Text>
      </Group>

      <Box>
        <Text lineClamp={15}>{note.note_description}</Text>
      </Box>
    </Box>
  );
}

export default Note;

interface Props {
  note: IStaffNote;
  onDelete?: () => void;
  onEdit?: () => void;
  onView?: () => void;
}
