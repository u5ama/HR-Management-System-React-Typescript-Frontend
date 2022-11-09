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
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconUserPlus, IconCurrencyDollar, IconArrowLeft } from '@tabler/icons';
import { Link } from 'react-router-dom';

function DashboardAddStaff() {
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
              <TextInput label="First name" placeholder="John" withAsterisk />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Last name" placeholder="Doe" withAsterisk />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Email"
                placeholder="hello@example.com"
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Phone Number"
                placeholder="+1 234 567"
                withAsterisk
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
                inputFormat="MM/DD/YYYY"
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
              <TextInput label="City (optional)" placeholder="New York" />
            </Grid.Col>

            <Grid.Col span={3}>
              <Select
                label="State (optional)"
                placeholder="Type to search"
                searchable
                nothingFound="No options"
                data={['AL', 'AK', 'AR', 'AZ', 'IA', 'IN']}
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <TextInput label="Zip Code (optional)" placeholder="12401" />
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
              >
                <Radio value="emp" label="Employee (W-2)" />
                <Radio value="cont" label="Contractor (1099)" />
              </Radio.Group>
            </Grid.Col>

            <Grid.Col span={12}>
              <Radio.Group
                name="employee"
                label="What type of employee (w2) are they?"
                withAsterisk
              >
                <Radio value="emp" label="Full Time" />
                <Radio value="cont" label="Part Time" />
              </Radio.Group>
            </Grid.Col>

            <Grid.Col span={6}>
              <DatePicker
                label="Start Date"
                placeholder="Pick a date"
                inputFormat="MM/DD/YYYY"
                labelFormat="MM/YYYY"
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
              />
            </Grid.Col>

            <Grid.Col span={7}>
              <Select
                label="Primary Role"
                placeholder="Add Roles"
                withAsterisk
                searchable
                nothingFound="No options"
                data={['Designer', 'Manager', 'Worker']}
              />
            </Grid.Col>

            <Grid.Col span={5}>
              <TextInput
                type="number"
                placeholder="35"
                label="Pay Rate"
                icon={<IconCurrencyDollar size={14} />}
                rightSection={
                  <Select
                    defaultValue="Per Hour"
                    data={['Per Hour', 'Salary']}
                  />
                }
                rightSectionWidth={100}
              />
            </Grid.Col>
          </Grid>

          <Divider my="xl" />

          <Checkbox label="Don't Send Email" />
        </Box>

        <Center mt="lg">
          <Button size="lg" leftIcon={<IconUserPlus size={22} />}>
            Add Staff
          </Button>
        </Center>
      </Container>
    </Container>
  );
}

export default DashboardAddStaff;
