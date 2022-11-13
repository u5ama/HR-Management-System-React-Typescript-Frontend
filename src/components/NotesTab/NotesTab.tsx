import { Stack, Title, Button } from '@mantine/core';
import { IconPencil } from '@tabler/icons';

function NotesTab() {
  // const [notes, setNotes] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const user = useAuthUser()!;

  // const fetchNotes = useCallback(async () => {
  //   setLoading(true);

  //   const response = await axios.post(
  //     '/company/staff_notes',
  //     { staff_id: userId },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     }
  //   );

  //   console.log(response.data.data);

  //   setNotes(response.data.data);

  //   setLoading(false);
  // }, [user?.token, userId]);

  // useEffect(() => {
  //   fetchNotes();
  // }, [fetchNotes]);

  return (
    <Stack mt={32} align="center">
      {/* {loading || !notes ? (
        <Center>
          <Loader />
        </Center>
      ) : notes.length === 0 ? (
        <Title order={3} size="h2">
          No Notes Added Yet
        </Title>
      ) : (
        notes.map(n => (
          <Box>
            <pre>{n}</pre>
          </Box>
        ))
      )} */}

      <Title order={3} size="h2">
        No Notes Added Yet
      </Title>

      <Button leftIcon={<IconPencil />} size="md" variant="light">
        Add Note
      </Button>
    </Stack>
  );
}

export default NotesTab;
