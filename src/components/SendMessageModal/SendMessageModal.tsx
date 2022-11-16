import { Modal, Group, Title, Textarea, Button, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconMessage, IconSend } from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { z } from 'zod';

function SendMessageModal({ receiverName, opened, onClose }: Props) {
  const maxLength = 400;

  const formSchema = z.object({
    message: z
      .string()
      .max(maxLength, 'Your message can only be 400 characters long.'),
  });

  const form = useForm({
    initialValues: {
      message: '',
    },
    validateInputOnChange: true,
    validate: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  const sendMessageMutation = useMutation(
    async (values: typeof form.values) => {
      console.log(values);
    },
    {
      onSuccess() {},
      onSettled() {
        onClose();
      },
    }
  );

  const formSubmitHandler = useCallback(
    async (values: any) => {
      sendMessageMutation.mutate(values);
    },
    [sendMessageMutation]
  );

  const charactersLeft = maxLength - form.values.message.length;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={
        <Group>
          <IconMessage size={26} stroke={2} />
          <Title order={3}>
            <Text component="span" transform="capitalize">
              Send message to <Text component="span">{receiverName}</Text>
            </Text>
          </Title>
        </Group>
      }
    >
      <form onSubmit={form.onSubmit(formSubmitHandler)}>
        <Textarea
          label="Your Message"
          placeholder="Please enter your message here"
          withAsterisk
          minRows={8}
          autosize
          data-autofocus
          {...form.getInputProps('message')}
        />

        <Text align="right" mt="xs" size="sm" weight="500">
          {charactersLeft >= 0 ? charactersLeft : '0'} characters remaining
        </Text>

        <Group mt="lg" position="right">
          <Button variant="light" size="md" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="submit"
            size="md"
            loading={sendMessageMutation.isLoading}
            leftIcon={<IconSend size={20} />}
          >
            Send
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

export default SendMessageModal;

interface Props {
  receiverName: string;
  opened: boolean;
  onClose: () => void;
}
