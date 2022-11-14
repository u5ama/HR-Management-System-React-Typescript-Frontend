import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import { Group, Button, Modal, Title, Text, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  IconCheck,
  IconFile,
  IconFilePlus,
  IconUpload,
  IconX,
} from '@tabler/icons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dropzone, FileWithPath } from '@mantine/dropzone';

function FolderModal({ onClose, opened }: Props) {
  const queryClient = useQueryClient();
  const authHeader = useAuthHeader();
  const { id: staff_id } = useParams();

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const isFileSelected = files.length !== 0;

  useEffect(() => {
    setFiles([]);
  }, [opened]);

  const uploadFileMutation = useMutation(
    async (file: FileWithPath) => {
      const doc = new FormData();
      doc.append('staff_id', staff_id!);
      doc.append('document_title', file.name);
      doc.append('document_file', file, file.name);

      const response = await axiosClient.post(
        '/company/staff_documents/',
        doc,
        { headers: { ...authHeader, 'Content-Type': 'multipart/form-data' } }
      );

      if (!response.data.success) throw response.data.message;
    },
    {
      onError(error: any) {
        showNotification({
          title: 'Oops!',
          message:
            error.response?.data?.message || error || 'Something went wrong',
          icon: <IconX size={18} />,
          color: 'red',
        });

        console.log(error);
      },
      onSuccess() {
        showNotification({
          title: 'Success',
          message: 'File uploaded successfully',
          icon: <IconCheck size={18} />,
          color: 'teal',
        });
      },

      onSettled() {
        onClose();

        queryClient.invalidateQueries(['documents', staff_id]);
      },
    }
  );

  const fileUploadHandler = useCallback(async () => {
    uploadFileMutation.mutate(files[0]);
  }, [files, uploadFileMutation]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <IconFilePlus size={32} stroke={2} />

          <Title order={3}>Upload File</Title>
        </Group>
      }
      size="lg"
    >
      <Dropzone onDrop={setFiles} multiple={false}>
        <Stack
          align="center"
          justify="center"
          style={{ minHeight: 240, pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload size={96} stroke={1.5} />
          </Dropzone.Accept>

          <Dropzone.Reject>
            <IconX size={96} stroke={1.5} />
          </Dropzone.Reject>

          <Dropzone.Idle>
            <IconFilePlus size={96} stroke={1.5} />
          </Dropzone.Idle>

          <Text size="lg">Drag a file here or click to select a file</Text>
        </Stack>
      </Dropzone>

      {isFileSelected && (
        <Group mt="sm" spacing="xs">
          <IconFile />
          <Text>{files[0].name}</Text>
        </Group>
      )}

      <Group position="right" mt="md">
        <Button size="md" variant="light" onClick={onClose}>
          Cancel
        </Button>

        <Button
          size="md"
          loading={uploadFileMutation.isLoading}
          disabled={!isFileSelected}
          onClick={fileUploadHandler}
        >
          Upload
        </Button>
      </Group>
    </Modal>
  );
}

export default FolderModal;

interface Props {
  opened: boolean;
  onClose: () => void;
}
