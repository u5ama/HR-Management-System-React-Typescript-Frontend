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
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  IconUserPlus,
  IconCurrencyDollar,
  IconArrowLeft,
  IconCheck,
  IconX,
} from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

function DashboardAddStaff() {
  const { user } = useAuth();
  const authHeader = useAuthHeader();
  const queryClient = useQueryClient();

  const formSchema = z.object({
    company_id: z.number(),
    first_name: z.string().min(2, { message: 'Enter at least 2 characters' }),
    last_name: z.string().min(2, { message: 'Enter at least 2 characters' }),
    email: z.string().email({ message: 'Invalid Email' }),
    password: z
      .string()
      .min(8, { message: 'Password should be at least 8 characters long' }),
    phone_number: z.string().min(1, { message: 'Provide a Phone Number' }),
    // last_4_of_SNN: z.string(),
    type_of_worker: z.enum(['employee', 'contractor']),
    type_of_employee: z.enum(['full_time', 'part_time']),
    type_of_contractor: z.enum(['individual', 'business']),
    business_name: z.string().optional(),
    start_date: z.string().optional(),
    state_working_in: z.string().optional(),
    pay_rate_type: z.enum(['per_hour', 'salary']),
    pay_rate_amount: z.number().min(0),
    date_of_birth: z.string().optional(),
    home_address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip_code: z.string().optional(),
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
    },
    validate: zodResolver(formSchema),
  });

  const staffMutation = useMutation(
    async (values: typeof form.values) => {
      await axiosClient.post('/company/staff', values, { headers: authHeader });
    },
    {
      onSuccess() {
        form.reset();

        showNotification({
          title: 'Success',
          message: 'Staff successfully added',
          icon: <IconCheck size={18} />,
          color: 'teal',
        });
      },
      onError() {
        showNotification({
          title: 'Oops!',
          message: 'Something went wrong',
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
      staffMutation.mutate(values);
    },
    [form, staffMutation]
  );

  return (
    <Container fluid px={48} py="xl" pb="96px">
      <Anchor component="span">
        <Link to="../staff">
          <Button leftIcon={<IconArrowLeft />} variant="subtle">
            Back to all Staff
          </Button>
        </Link>
      </Anchor>

      <Container mt="xl">
        <form
          onSubmit={form.onSubmit(formSubmitHandler, (errors, values) => {
            console.log(errors);
            console.log(values);
          })}
        >
          <Title>Add Staff</Title>
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

              <Grid.Col span={6}>
                <PasswordInput
                  label="Password"
                  placeholder="Staff password"
                  {...form.getInputProps('password')}
                />
              </Grid.Col>
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
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  label="Home Address (optional)"
                  placeholder="132, My Street, Kingston, New York 12401"
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <TextInput
                  label="Home Address Line 2 (optional)"
                  placeholder="132, My Street, Kingston, New York 12401"
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
                  // withAsterisk
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
                  placeholder="Add Roles"
                  // withAsterisk
                  searchable
                  nothingFound="No options"
                  data={['Designer', 'Manager', 'Worker']}
                />
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
            {form.isTouched() && !form.isValid() && (
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
                Add Staff
              </Button>
            </Center>
          </Stack>
        </form>
      </Container>
    </Container>
  );
}

export default DashboardAddStaff;
