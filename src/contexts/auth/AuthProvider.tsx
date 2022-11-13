import AuthContext from '.';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { IResponse } from '@app-types/api';
import { IAuthenticatedUser } from '@app-types/auth';
import { authStorageKey } from '@utils/constants';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import axiosClient from '@lib/axios';
import { Button, Group, Modal, Text, ThemeIcon, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const storedUserStr = localStorage.getItem(authStorageKey);
const storedUser: IAuthenticatedUser | null = storedUserStr
  ? JSON.parse(storedUserStr)
  : null;

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IAuthenticatedUser | null>(storedUser);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [opened, handlers] = useDisclosure(false);

  const removeUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem(authStorageKey);
  }, [setUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await axiosClient.post<IResponse<IAuthenticatedUser>>(
          '/login',
          { email, password }
        );

        if (!response.data.success) throw response.data.message;

        setUser(response.data.data!);
        setTokenExpired(false);

        localStorage.setItem(
          authStorageKey,
          JSON.stringify(response.data.data)
        );
      } catch (error: any) {
        showNotification({
          title: 'Oops!',
          message:
            error.response?.data.message || error || 'Something went wrong',
          icon: <IconX size={18} />,
          color: 'red',
        });
      }
    },
    [setUser]
  );

  const logout = useCallback(async () => {
    const response = await axiosClient.post<IResponse<undefined>>(
      '/logout',
      null,
      { headers: { Authorization: `Bearer ${user?.token}` } }
    );

    showNotification({
      title: 'Success',
      message: 'Successfully logged out.' || response.data.message,
      icon: <IconCheck size={18} />,
      color: 'teal',
    });

    removeUser();
  }, [removeUser, user?.token]);

  useEffect(() => {
    if (tokenExpired) handlers.open();
  }, [tokenExpired, removeUser, handlers]);

  const closeModalHandler = useCallback(() => {
    removeUser();
    handlers.close();
    setTokenExpired(false);
  }, [handlers, removeUser]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, removeUser, setTokenExpired }}
    >
      <Modal
        opened={opened}
        onClose={closeModalHandler}
        title={
          <Group>
            <ThemeIcon radius="xl" size="xl" color="red">
              <IconX size={24} stroke={2} />
            </ThemeIcon>
            <Title order={2}>Session Expired</Title>
          </Group>
        }
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
        lockScroll
        radius="md"
      >
        <Text>You'll be logged out now. Please login again.</Text>

        <Group position="right" mt="md">
          <Button ml="auto" onClick={closeModalHandler}>
            Ok
          </Button>
        </Group>
      </Modal>

      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
