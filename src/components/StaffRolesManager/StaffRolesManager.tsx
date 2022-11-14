import { useStaffRoles } from '@api/staff/roles';
import { IStaffRole } from '@app-types/staff';
import useAuth from '@hooks/useAuth';
import {
  Modal,
  Group,
  Title,
  Text,
  Stack,
  Button,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import { useCallback, useState } from 'react';
import StaffRoleForm from './StaffRoleForm';
import StaffRoleItem from './StaffRoleItem';

function StaffRolesManagerModal({ opened, onClose }: Props) {
  const { user } = useAuth();
  const staffRolesQuery = useStaffRoles(user!.id);

  const [adding, addingHandlers] = useDisclosure(false);
  const [selectedRole, setSelectedRole] = useState<IStaffRole | null>(null);

  const editRoleHandler = useCallback((role: IStaffRole) => {
    setSelectedRole(role);
  }, []);

  const closeFormHandler = useCallback(() => {
    setSelectedRole(null);
    addingHandlers.close();
  }, [addingHandlers]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <Title order={3}>Manage Company Roles</Title>
        </Group>
      }
      size="lg"
    >
      <Stack>
        <Text>
          Editing roles names will change the name for all staff associated with
          the role.
        </Text>

        <Group position="right">
          <Button
            leftIcon={<IconPlus size={16} />}
            variant="light"
            size="xs"
            onClick={addingHandlers.open}
          >
            Add New Role
          </Button>
        </Group>

        <ScrollArea.Autosize maxHeight={360}>
          <Stack spacing="sm">
            {staffRolesQuery.data?.data?.map(r =>
              r.id !== selectedRole?.id ? (
                <StaffRoleItem
                  key={r.id}
                  role={r}
                  onEdit={() => editRoleHandler(r)}
                />
              ) : (
                <StaffRoleForm key={r.id} role={r} onClose={closeFormHandler} />
              )
            )}

            {adding && <StaffRoleForm onClose={closeFormHandler} />}
          </Stack>
        </ScrollArea.Autosize>

        <Group position="right">
          <Button onClick={onClose}>Done</Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default StaffRolesManagerModal;

interface Props {
  opened: boolean;
  onClose: () => void;
}
