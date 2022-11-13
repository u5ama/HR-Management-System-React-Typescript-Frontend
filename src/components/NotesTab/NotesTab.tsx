import { IResponse } from '@app-types/api';
import { IStaffNote } from '@app-types/staff';
import { ModalMode } from '@app-types/utils';
import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import { Stack, Title, Button, Group, Loader, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import Note from './Note';
import NoteModal from './NoteModal';
interface Props {
  staffId: string;
}

function NotesTab({ staffId }: Props) {
  const authHeader = useAuthHeader();
  const [selectedNote, setSelectedNote] = useState<IStaffNote>();
  const [mode, setMode] = useState<ModalMode>();

  const [opened, handlers] = useDisclosure(false);

  const { isLoading, data } = useQuery(['notes', staffId], async () => {
    const response = await axiosClient.get<IResponse<IStaffNote[]>>(
      `/company/staff_notes?staff_id=${staffId}`,
      { headers: authHeader }
    );

    return response.data;
  });

  const editNoteHandler = useCallback(
    (note: IStaffNote) => {
      setSelectedNote(note);
      handlers.open();
      setMode('edit');
    },
    [handlers]
  );

  const viewNoteHandler = useCallback(
    (note: IStaffNote) => {
      setSelectedNote(note);
      handlers.open();
      setMode('view');
    },
    [handlers]
  );

  const closeModalHandler = useCallback(() => {
    setSelectedNote(undefined);
    handlers.close();
    setMode('add');
  }, [handlers]);

  if (isLoading)
    return (
      <Stack align="center" mt="xl">
        <Loader />
        <Text>Loading...</Text>
      </Stack>
    );

  return (
    <>
      <NoteModal
        note={selectedNote}
        opened={opened}
        onClose={closeModalHandler}
        mode={mode}
      />

      {data?.data?.length === 0 ? (
        <Stack mt={32} align="center">
          <Title order={3} size="h2">
            No Notes Added Yet
          </Title>

          <Button
            leftIcon={<IconPencil />}
            size="md"
            variant="light"
            onClick={handlers.open}
          >
            Add Note
          </Button>
        </Stack>
      ) : (
        <Stack align="start">
          <Button leftIcon={<IconPencil />} size="md" onClick={handlers.open}>
            Add Note
          </Button>

          <Group>
            {data?.data?.map(n => (
              <Note
                key={n.id}
                note={n}
                onView={() => viewNoteHandler(n)}
                onEdit={() => editNoteHandler(n)}
              />
            ))}
          </Group>
        </Stack>
      )}
    </>
  );
}

export default NotesTab;
