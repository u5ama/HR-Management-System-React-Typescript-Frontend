import { useStaffRoles } from '@api/staff/roles';
import { useStaffOne } from '@api/staff/staff';
import { IResponse } from '@app-types/api';
import { IStaff } from '@app-types/staff';
import StaffRolesManagerModal from '@components/StaffRolesManager/StaffRolesManager';
import useAuth, { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import {
  Text,
  Container,
  Title,
  Button,
  Select,
  Box,
  Grid,
  TextInput,
  Divider,
  Radio,
  Checkbox,
  Center,
  Anchor,
  PasswordInput,
  Stack,
  NumberInput,
  Group,
  Loader,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  IconUserPlus,
  IconCurrencyDollar,
  IconArrowLeft,
  IconCheck,
  IconX,
} from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

function DashboardStaffForm() {
  const { user } = useAuth();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();
  const staffRolesQuery = useStaffRoles(user!.id);
  const [showFormError, setShowFormError] = useState(false);
  const navigate = useNavigate();

  const { id: staffId } = useParams();
  const isEditing = !!staffId;
  const { isLoading, data } = useStaffOne(parseInt(staffId!));

  const staffRoleSelectData = staffRolesQuery.isSuccess
    ? staffRolesQuery.data.data!.map(r => ({
        value: r.id.toString(),
        label: r.role_name,
      }))
    : [];

  const [opened, handlers] = useDisclosure(false);

  const staffFormSchema = z.object({
    first_name: z.string().min(2, { message: 'Enter at least 2 characters' }),
    last_name: z.string().min(2, { message: 'Enter at least 2 characters' }),
    email: z.string().email({ message: 'Invalid Email' }),
    password: isEditing
      ? z.string().optional()
      : z
          .string()
          .min(8, { message: 'Password should be at least 8 characters long' }),
    phone_number: z.string().min(1, { message: 'Provide a Phone Number' }),
    last_4_of_SNN: z.string().optional(),
    type_of_worker: z.enum(['employee', 'contractor']),
    type_of_employee: z.enum(['full_time', 'part_time']),
    type_of_contractor: z.enum(['individual', 'business']),
    business_name: z.string().optional(),
    start_date: z
      .date({ invalid_type_error: 'Please provide a starting date' })
      .optional(),
    state_working_in: z.string().optional(),
    pay_rate_type: z.enum(['per_hour', 'salary']),
    pay_rate_amount: z.number().min(0),
    date_of_birth: z.date().or(z.string()).optional(),
    home_address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip_code: z.string().optional(),
    assigned_role_id: z.string().length(1, { message: 'Please select a role' }),
  });

  const form = useForm({
    initialValues: {
      company_id: user!.id,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_number: '',
      type_of_worker: 'employee',
      type_of_employee: 'full_time',
      type_of_contractor: 'individual',
      business_name: '',
      start_date: '',
      state_working_in: '',
      pay_rate_type: 'per_hour',
      pay_rate_amount: 0,
      date_of_birth: '',
      home_address: '',
      city: '',
      state: '',
      zip_code: '',
      assigned_role_id: '',
    },
    transformValues: values => ({
      ...values,
      date_of_birth: dayjs(values.date_of_birth).format('YYYY-MM-DD'),
      start_date: dayjs(values.start_date).format('YYYY-MM-DD'),
    }),
    validate: zodResolver(staffFormSchema),
  });

  useEffect(() => {
    if (data?.data) {
      const staff = data.data as IStaff;

      for (const key in staff) {
        if (Object.prototype.hasOwnProperty.call(staff, key)) {
          // @ts-ignore
          staff[key] = staff[key] || '';
        }
      }

      form.setValues({
        ...data?.data!,
        start_date: (data?.data?.start_date
          ? new Date(data.data.start_date!)
          : '') as string,
        date_of_birth: (data?.data?.date_of_birth
          ? new Date(data.data.date_of_birth!)
          : '') as string,
        pay_rate_amount: data?.data
          ? parseFloat(data.data.pay_rate_amount!)
          : 0,
        assigned_role_id: data?.data?.assigned_role_id?.toString(),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const staffMutation = useMutation(
    async (values: typeof form.values) => {
      if (isEditing)
        return await axiosClient.post<IResponse<IStaff>>(
          `/company/staff/${staffId}`,
          values,
          {
            headers: authHeader,
          }
        );
      else
        return await axiosClient.post<IResponse<IStaff>>(
          '/company/staff',
          values,
          {
            headers: authHeader,
          }
        );
    },
    {
      onSuccess(response) {
        if (!response.data.success) throw response.data.message;

        form.reset();

        showNotification({
          title: 'Success',
          message: 'Staff saved successfully',
          icon: <IconCheck size={18} />,
          color: 'teal',
        });

        if (data)
          isEditing
            ? navigate(`../staff/${staffId}?tab=profile`)
            : navigate('../staff');
      },
      onError(err) {
        showNotification({
          title: 'Oops!',
          message: typeof err === 'string' ? err : 'Something went wrong',
          icon: <IconX size={18} />,
          color: 'red',
        });
      },
      onSettled() {
        queryClient.invalidateQueries(['staff', user?.id]);
      },
    }
  );

  const formSubmitHandler = useCallback(
    async (values: typeof form.values) => {
      setShowFormError(false);

      console.log(values);

      staffMutation.mutate(values);
    },
    [form, staffMutation]
  );

  return (
    <Container fluid px={48} py="xl" pb="96px">
      <StaffRolesManagerModal opened={opened} onClose={handlers.close} />

      <Anchor component="span">
        <Link to={isEditing ? `../staff/${staffId}?tab=profile` : '../staff'}>
          <Button leftIcon={<IconArrowLeft />} variant="subtle">
            {isEditing ? 'Back to Profile' : 'Back to all Staff'}
          </Button>
        </Link>
      </Anchor>

      <Container mt="xl">
        <form
          onSubmit={form.onSubmit(formSubmitHandler, (errors, values) => {
            setShowFormError(true);
            console.log(errors);
            console.log(values);
          })}
        >
          {isEditing ? (
            <Group>
              <Title>
                Edit {data?.data?.first_name} {data?.data?.last_name}
              </Title>
              {isLoading && <Loader />}
            </Group>
          ) : (
            <Title>Add Staff</Title>
          )}

          <Text>All fields are required unless specified as optional.</Text>

          <Box
            p="xl"
            mt="xl"
            sx={theme => ({
              backgroundColor: theme.colors.dark[6],
              borderRadius: theme.radius.md,
            })}
          >
            <Title order={3} mb="sm">
              Basic Info
            </Title>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="First name"
                  placeholder="John"
                  withAsterisk
                  {...form.getInputProps('first_name')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Last name"
                  placeholder="Doe"
                  withAsterisk
                  {...form.getInputProps('last_name')}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="Email"
                  placeholder="hello@example.com"
                  withAsterisk
                  {...form.getInputProps('email')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Phone Number"
                  placeholder="+1 (234) 567 89"
                  withAsterisk
                  {...form.getInputProps('phone_number')}
                />
              </Grid.Col>

              {!isEditing && (
                <Grid.Col span={6}>
                  <PasswordInput
                    label="Password"
                    placeholder="Staff password"
                    {...form.getInputProps('password')}
                  />
                </Grid.Col>
              )}
            </Grid>

            <Divider my="xl" />

            <Title order={3} mb="sm">
              Personal Info
            </Title>

            <Grid>
              <Grid.Col span={6}>
                <DatePicker
                  placeholder="Pick a date"
                  label="Date of Birth (optional)"
                  inputFormat="MM-DD-YY"
                  labelFormat="MM/YYYY"
                  {...form.getInputProps('date_of_birth')}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  label="Home Address (optional)"
                  placeholder="132, My Street, Kingston, New York 12401"
                  {...form.getInputProps('home_address')}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="City (optional)"
                  placeholder="New York"
                  {...form.getInputProps('city')}
                />
              </Grid.Col>

              <Grid.Col span={3}>
                <Select
                  label="State (optional)"
                  placeholder="Type to search"
                  searchable
                  nothingFound="No options"
                  data={['AL', 'AK', 'AR', 'AZ', 'IA', 'IN']}
                  {...form.getInputProps('state')}
                />
              </Grid.Col>

              <Grid.Col span={3}>
                <TextInput
                  label="Zip Code (optional)"
                  placeholder="12401"
                  {...form.getInputProps('zip_code')}
                />
              </Grid.Col>
            </Grid>

            <Divider my="xl" />

            <Title order={3} mb="sm">
              Employment Info
            </Title>

            <Grid>
              <Grid.Col span={12}>
                <Radio.Group
                  name="workerType"
                  label="What type of worker are they?"
                  withAsterisk
                  {...form.getInputProps('type_of_worker')}
                >
                  <Radio value="employee" label="Employee (W-2)" />
                  <Radio value="contractor" label="Contractor (1099)" />
                </Radio.Group>
              </Grid.Col>

              <Grid.Col span={12}>
                {form.values.type_of_worker === 'employee' ? (
                  <Radio.Group
                    name="employee"
                    label="What type of employee (w2) are they?"
                    withAsterisk
                    {...form.getInputProps('type_of_employee')}
                  >
                    <Radio value="full_time" label="Full Time" />
                    <Radio value="part_time" label="Part Time" />
                  </Radio.Group>
                ) : (
                  <Radio.Group
                    name="contractor"
                    label="What type of contractor (1099) are they?"
                    withAsterisk
                    {...form.getInputProps('type_of_contractor')}
                  >
                    <Radio value="individual" label="Individual" />
                    <Radio value="business" label="Business" />
                  </Radio.Group>
                )}
              </Grid.Col>

              {form.values.type_of_worker === 'contractor' &&
                form.values.type_of_contractor === 'business' && (
                  <Grid.Col span={12}>
                    <TextInput
                      label="Contractor Business Name (optional)"
                      placeholder="Google Inc."
                      {...form.getInputProps('business_name')}
                    />
                  </Grid.Col>
                )}

              <Grid.Col span={6}>
                <DatePicker
                  label="Start Date"
                  placeholder="Pick a date"
                  inputFormat="MM/DD/YYYY"
                  labelFormat="MM/YYYY"
                  {...form.getInputProps('start_date')}
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Select
                  label="State Working In"
                  placeholder="Type to search"
                  searchable
                  nothingFound="No options"
                  data={['Alaska', 'Georgia', 'Florida']}
                  {...form.getInputProps('state_working_in')}
                />
              </Grid.Col>

              <Grid.Col span={7}>
                <Select
                  label="Primary Role"
                  placeholder="Select Role"
                  withAsterisk
                  searchable
                  nothingFound="No options"
                  data={staffRoleSelectData}
                  disabled={staffRolesQuery.isLoading}
                  {...form.getInputProps('assigned_role_id')}
                />

                <Button variant="subtle" onClick={handlers.open} mt="xs">
                  Manage Roles
                </Button>
              </Grid.Col>

              <Grid.Col span={5}>
                <NumberInput
                  type="number"
                  placeholder="35"
                  label="Pay Rate"
                  min={0}
                  icon={<IconCurrencyDollar size={14} />}
                  {...form.getInputProps('pay_rate_amount')}
                  rightSectionWidth={100}
                  rightSection={
                    <Select
                      data={[
                        { value: 'per_hour', label: 'Per Hour' },
                        { value: 'salary', label: 'Salary' },
                      ]}
                      {...form.getInputProps('pay_rate_type')}
                    />
                  }
                />
              </Grid.Col>
            </Grid>

            <Divider my="xl" />

            <Checkbox label="Don't Send Email" />
          </Box>

          <Stack mt="lg" spacing="xs">
            {showFormError && (
              <Text color="red">
                Please fix the issues above and try again.
              </Text>
            )}

            <Center>
              <Button
                size="lg"
                leftIcon={<IconUserPlus size={22} />}
                type="submit"
                loading={staffMutation.isLoading}
              >
                {isEditing ? 'Update Staff' : 'Add Staff'}
              </Button>
            </Center>
          </Stack>
        </form>
      </Container>
    </Container>
  );
}

export default DashboardStaffForm;
