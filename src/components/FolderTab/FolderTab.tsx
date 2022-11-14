import { IResponse } from '@app-types/api';
import { IStaffDocument } from '@app-types/staff';
import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import { Stack, Title, Button, Loader, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilePlus } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import FileItem from './FileItem';
import FolderModal from './FolderModal';

function FolderTab() {
  const authHeader = useAuthHeader();
  const [opened, handlers] = useDisclosure(false);
  const { id: staffId } = useParams();

  const { isLoading, data } = useQuery(['documents', staffId], async () => {
    const response = await axiosClient.get<IResponse<IStaffDocument[]>>(
      `/company/staff_documents?staff_id=${staffId}`,
      { headers: authHeader }
    );

    return response.data;
  });

  if (isLoading)
    return (
      <Stack align="center" mt="xl">
        <Loader />
        <Text>Loading...</Text>
      </Stack>
    );

  return (
    <>
      <FolderModal opened={opened} onClose={handlers.close} />

      {data?.data?.length === 0 ? (
        <Stack mt={32} align="center">
          <Title order={3} size="h2">
            No Files Yet
          </Title>

          <Button leftIcon={<IconFilePlus />} size="md" variant="light">
            Add File
          </Button>
        </Stack>
      ) : (
        <Stack align="start">
          <Button leftIcon={<IconFilePlus />} size="md" onClick={handlers.open}>
            Add File
          </Button>

          <Stack sx={{ width: '100%' }}>
            {data?.data?.map(doc => (
              <FileItem key={doc.id} doc={doc} />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default FolderTab;
