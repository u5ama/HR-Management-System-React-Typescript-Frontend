import { IStaffRole } from '@app-types/staff';
import useAuth, { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import { Group, TextInput, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { z } from 'zod';

function StaffRoleForm({ onClose, role }: Props) {
  const queryClient = useQueryClient();
  const authHeader = useAuthHeader();
  const { user } = useAuth();

  const formSchema = z.object({
    role_name: z.string().min(1, { message: 'Please enter a name' }),
  });

  const form = useForm({
    initialValues: { role_name: '' },
    validate: zodResolver(formSchema),
  });

  useEffect(() => {
    if (role) form.setValues({ role_name: role.role_name });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roleMutation = useMutation(
    async (values: typeof form.values) => {
      if (!role)
        await axiosClient.post(
          '/company/staff_roles/',
          { ...values, company_id: user?.id },
          { headers: authHeader }
        );
      else if (role)
        await axiosClient.post(
          `/company/staff_roles/${role.id}`,
          { ...values, company_id: user?.id },
          { headers: authHeader }
        );
    },
    {
      onSettled() {
        onClose();
        queryClient.invalidateQueries(['roles']);
      },
    }
  );

  const formSubmitHandler = useCallback(
    async (values: typeof form.values) => {
      roleMutation.mutate(values);
    },
    [form, roleMutation]
  );

  return (
    <form onSubmit={form.onSubmit(formSubmitHandler)}>
      <Group
        px="md"
        py="xs"
        sx={theme => ({
          backgroundColor: theme.colors.dark[6],
          borderRadius: theme.radius.sm,
        })}
        position="apart"
      >
        <TextInput
          sx={{ width: 'calc(100% - 200px)' }}
          placeholder="Role Name"
          autoFocus
          {...form.getInputProps('role_name')}
        />

        <Group spacing="xs">
          <Button
            variant="subtle"
            size="xs"
            onClick={onClose}
            disabled={roleMutation.isLoading}
          >
            Cancel
          </Button>

          <Button size="xs" type="submit" loading={roleMutation.isLoading}>
            {role ? 'Save' : 'Add'}
          </Button>
        </Group>
      </Group>
    </form>
  );
}

export default StaffRoleForm;

interface Props {
  role?: IStaffRole;
  onClose: () => void;
}
