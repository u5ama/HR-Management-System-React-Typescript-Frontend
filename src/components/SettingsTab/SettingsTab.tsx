import { IResponse } from '@app-types/api';
import { IStaffContact } from '@app-types/staff';
import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import {
  Stack,
  Group,
  Title,
  Grid,
  TextInput,
  Button,
  Text,
  Loader,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  IconAddressBook,
  IconHierarchy3,
  IconHierarchy,
  IconUserX,
  IconCheck,
} from '@tabler/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

function SettingsTab() {
  const { id: staff_id } = useParams();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(
    ['contact', staff_id],
    async () => {
      const response = await axiosClient.get<IResponse<IStaffContact>>(
        `/company/staff_emergency?staff_id=${staff_id}`,
        { headers: authHeader }
      );

      return response.data;
    },
    {
      onSuccess(data) {
        if (data.success)
          form.setValues({
            name: data.data?.name,
            relationship: data?.data?.relationship,
            phone_number: data?.data?.phone_number,
          });
      },
    }
  );

  const contactFormSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Name should be at least 2 characters long' }),
    relationship: z.string().optional(),
    phone_number: z.string().optional(),
    email: z.string().optional(),
  });

  const form = useForm({
    initialValues: {
      name: '',
      relationship: '',
      phone_number: '',
      email: '',
    },
    validate: zodResolver(contactFormSchema),
  });

  const saveContactMutation = useMutation(
    async (values: typeof form.values) => {
      if (!data)
        await axiosClient.post(
          '/company/staff_emergency/',
          { ...values, staff_id },
          { headers: authHeader }
        );
      else
        await axiosClient.post(
          `/company/staff_emergency/${data.data?.id}`,
          values,
          { headers: authHeader }
        );
    },
    {
      onSuccess() {
        showNotification({
          title: 'Success',
          message: 'Emergency Contact updated successfully',
          icon: <IconCheck size={18} />,
          color: 'teal',
        });
      },

      onSettled() {
        queryClient.invalidateQueries(['contact', staff_id]);
      },
    }
  );

  const formSubmitHandler = useCallback(
    async (values: any) => {
      saveContactMutation.mutate(values);
    },
    [saveContactMutation]
  );
  return (
    <Stack spacing="md">
      <form onSubmit={form.onSubmit(formSubmitHandler)}>
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

            <Group>
              <Title order={3}>Emergency Contact Information</Title>
              {isLoading && <Loader />}
            </Group>
          </Group>

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Name"
                placeholder="John Doe"
                {...form.getInputProps('name')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Phone Number"
                placeholder="+1 (234) 567 89"
                {...form.getInputProps('phone_number')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Relationship"
                placeholder="Mother"
                {...form.getInputProps('relationship')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                type="email"
                label="Email"
                placeholder="example@email.com"
                {...form.getInputProps('email')}
              />
            </Grid.Col>
          </Grid>

          <Button
            size="md"
            type="submit"
            loading={saveContactMutation.isLoading}
          >
            Save
          </Button>
        </Stack>
      </form>

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
          The Manager role allows the user to create performance plans, written
          warnings, verbal warnings and document incidents for their direct
          reports.
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
  );
}

export default SettingsTab;
