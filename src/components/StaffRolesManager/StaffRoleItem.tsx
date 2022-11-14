import { IStaffRole } from '@app-types/staff';
import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import { Group, ActionIcon, Title, useMantineTheme } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

function StaffRoleItem({ role, onEdit }: Props) {
  const queryClient = useQueryClient();
  const authHeader = useAuthHeader();
  const theme = useMantineTheme();

  const roleDeleteMutation = useMutation(
    async () => {
      await axiosClient.delete(`/company/staff_roles/${role.id}`, {
        headers: authHeader,
      });
    },
    {
      onSettled() {
        queryClient.invalidateQueries(['roles']);
      },
    }
  );

  const deleteRoleHandler = useCallback(() => {
    roleDeleteMutation.mutate();
  }, [roleDeleteMutation]);

  return (
    <Group
      px="md"
      py="xs"
      sx={theme => ({
        backgroundColor: theme.colors.dark[6],
        borderRadius: theme.radius.sm,
      })}
      position="apart"
      key={role.id}
    >
      <Title order={6}>{role.role_name}</Title>

      <Group spacing="xs">
        <ActionIcon
          color={theme.primaryColor}
          variant="subtle"
          onClick={onEdit}
        >
          <IconPencil size={16} />
        </ActionIcon>

        <ActionIcon
          color="red"
          variant="subtle"
          onClick={deleteRoleHandler}
          loading={roleDeleteMutation.isLoading}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </Group>
  );
}

export default StaffRoleItem;

interface Props {
  role: IStaffRole;
  onEdit: () => void;
}
