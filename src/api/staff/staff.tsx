import { IResponse } from '@app-types/api';
import { IStaff } from '@app-types/staff';
import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';

export function useStaffOne(id: number) {
  const authHeader = useAuthHeader();

  return useQuery(
    ['staff', id],
    async () => {
      const response = await axiosClient.post<IResponse<Partial<IStaff>>>(
        '/company/showStaff',
        { id },
        { headers: authHeader }
      );

      return response.data;
    },
    {
      onError() {
        showNotification({
          title: 'Oops!',
          message: 'Something went wrong',
          icon: <IconX size={18} />,
          color: 'red',
        });
      },
    }
  );
}
