import dayjs from 'dayjs';
import { IStaffNote } from '@app-types/staff';
import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import {
  Group,
  Button,
  Grid,
  Modal,
  Select,
  Textarea,
  Title,
  Text,
  createStyles,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconEye, IconPencil } from '@tabler/icons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { ModalMode } from '@app-types/utils';

const IconMap = {
  add: IconPencil,
  edit: IconPencil,
  view: IconEye,
};

const useStyles = createStyles(() => {
  return {
    disabledGlow: {
      cursor: 'auto !important',
      color: `#fff !important`,
    },
  };
});

function NoteModal({ note, onClose, opened, mode = 'add' }: Props) {
  const queryClient = useQueryClient();
  const authHeader = useAuthHeader();
  const { id: staff_id } = useParams();
  const { classes } = useStyles();

  const isViewing = mode === 'view';

  const formSchema = z.object({
    note_type: z.string(),
    note_description: z
      .string()
      .min(1, { message: 'Please enter the note contents' }),
    note_date: z.date(),
  });

  const form = useForm({
    initialValues: {
      note_type: note?.note_type || 'Incident',
      note_description: note?.note_description || '',
      note_date: new Date(),
    },
    validate: zodResolver(formSchema),
    transformValues: values => ({
      ...values,
      note_date: dayjs(values.note_date).format('YYYY-MM-DD'),
    }),
  });

  useEffect(() => {
    form.reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  useEffect(() => {
    if (note)
      form.setValues({
        note_type: note.note_type,
        note_description: note.note_description,
        note_date: new Date(),
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  const saveNoteMutation = useMutation(
    async (values: typeof form.values) => {
      if (mode === 'add')
        await axiosClient.post(
          '/company/staff_notes/',
          { ...values, staff_id },
          { headers: authHeader }
        );
      else if (mode === 'edit' && note)
        await axiosClient.post(
          `/company/staff_notes/${note.id}`,
          { ...values, staff_id },
          { headers: authHeader }
        );
    },
    {
      onSuccess() {
        showNotification({
          title: 'Success',
          message: 'Staff Note saved successfully',
          icon: <IconCheck size={18} />,
          color: 'teal',
        });
      },

      onSettled() {
        onClose();

        queryClient.invalidateQueries(['notes', staff_id]);
      },
    }
  );

  const formSubmitHandler = useCallback(
    async (values: any) => {
      saveNoteMutation.mutate(values);
    },
    [saveNoteMutation]
  );

  const Icon = IconMap[mode];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <Icon size={26} stroke={2} />
          <Title order={3}>
            <Text component="span" transform="capitalize">
              {mode}
            </Text>
            &nbsp;Note
          </Title>
        </Group>
      }
    >
      <form onSubmit={form.onSubmit(formSubmitHandler)}>
        <Grid>
          <Grid.Col span={7}>
            <Select
              label="Note Type"
              defaultValue="Incident"
              data={[
                { value: 'Incident', label: 'Incident' },
                { value: 'General Note', label: 'General Note' },
              ]}
              {...form.getInputProps('note_type')}
              disabled={isViewing}
              styles={{ disabled: classes.disabledGlow }}
            />
          </Grid.Col>

          <Grid.Col span={5}>
            <DatePicker
              placeholder="Pick a date"
              label="Note Date"
              inputFormat="MM-DD-YY"
              labelFormat="MM/YYYY"
              defaultValue={new Date()}
              {...form.getInputProps('note_date')}
              disabled={isViewing}
              styles={{ disabled: classes.disabledGlow }}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              placeholder="Note"
              label="Note Content"
              withAsterisk
              minRows={isViewing ? 12 : 6}
              maxRows={15}
              autosize
              data-autofocus
              {...form.getInputProps('note_description')}
              disabled={isViewing}
              styles={{ disabled: classes.disabledGlow }}
            />
          </Grid.Col>
        </Grid>

        {!isViewing && (
          <Group mt="lg" position="right">
            <Button variant="light" size="md" onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              size="md"
              loading={saveNoteMutation.isLoading}
            >
              Save
            </Button>
          </Group>
        )}
      </form>
    </Modal>
  );
}

export default NoteModal;

interface Props {
  mode?: ModalMode;
  note?: IStaffNote;
  opened: boolean;
  onClose: () => void;
}
