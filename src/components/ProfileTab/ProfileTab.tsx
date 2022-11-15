import { IStaff } from '@app-types/staff';
import { Stack, Group, Title, Grid, Button } from '@mantine/core';
import {
  IconUser,
  TablerIcon,
  IconMail,
  IconPhone,
  IconCake,
  IconHome,
  IconCalendarTime,
  IconUserExclamation,
  IconCash,
  IconPencil,
} from '@tabler/icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface DetailItemProps {
  Icon: TablerIcon;
  title: string;
  value?: string;
}

function DetailItem({ Icon, title, value }: DetailItemProps) {
  return (
    <>
      <Grid.Col span={4}>
        <Group spacing="xs">
          <Icon size={22} />

          <Title order={6} size="h5">
            {title}
          </Title>
        </Group>
      </Grid.Col>

      <Grid.Col span={8}>{value || 'No Data'}</Grid.Col>
    </>
  );
}

function ProfileTab({ staff }: Props) {
  const navigate = useNavigate();

  return (
    <Stack spacing="md">
      <Group>
        <Button
          size="md"
          leftIcon={<IconPencil />}
          onClick={() => navigate('edit')}
        >
          Edit Profile
        </Button>
      </Group>

      <Stack
        p="xl"
        sx={theme => ({
          backgroundColor: theme.colors.dark[6],
          borderRadius: theme.radius.md,
        })}
      >
        <Group>
          <Title order={3} mb="sm">
            Basic Info
          </Title>
        </Group>

        <Grid>
          <DetailItem
            Icon={IconUser}
            title="Name"
            value={`${staff?.first_name} ${staff?.last_name}`}
          />

          <DetailItem Icon={IconMail} title="Email" value={staff?.email} />
          <DetailItem
            Icon={IconPhone}
            title="Phone"
            value={staff?.phone_number}
          />
        </Grid>
      </Stack>

      <Stack
        p="xl"
        sx={theme => ({
          backgroundColor: theme.colors.dark[6],
          borderRadius: theme.radius.md,
        })}
      >
        <Group>
          <Title order={3} mb="sm">
            Personal Info
          </Title>
        </Group>

        <Grid>
          <DetailItem
            Icon={IconCake}
            title="Date of Birth"
            value={
              staff?.date_of_birth &&
              dayjs(staff?.date_of_birth).format('DD/MM/YYYY')
            }
          />

          <DetailItem
            Icon={IconHome}
            title="Home Address"
            value={staff?.home_address}
          />
        </Grid>
      </Stack>

      <Stack
        p="xl"
        sx={theme => ({
          backgroundColor: theme.colors.dark[6],
          borderRadius: theme.radius.md,
        })}
      >
        <Group>
          <Title order={3} mb="sm">
            Employment Info
          </Title>
        </Group>

        <Grid>
          <DetailItem
            Icon={IconUser}
            title="Employment Type"
            value={`${staff?.type_of_worker} - ${
              staff?.type_of_worker === 'employee'
                ? staff?.type_of_employee
                : staff?.type_of_contractor
            }`}
          />

          <DetailItem
            Icon={IconCalendarTime}
            title="Start Date"
            value={
              staff?.start_date && dayjs(staff?.start_date).format('DD/MM/YYYY')
            }
          />

          <DetailItem
            Icon={IconUserExclamation}
            title="Assigned Role"
            value={staff?.assigned_role}
          />

          <DetailItem
            Icon={IconCash}
            title="Pay Rate"
            value={`${
              staff?.pay_rate_amount &&
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(parseFloat(staff?.pay_rate_amount))
            }/${staff?.pay_rate_type === 'per_hour' ? 'hr' : 'salary'}`}
          />
        </Grid>
      </Stack>
    </Stack>
  );
}

export default ProfileTab;

interface Props {
  staff?: Partial<IStaff>;
}
