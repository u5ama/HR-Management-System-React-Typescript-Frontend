import { IResponse } from '@app-types/api';
import { IStaffRole } from '@app-types/staff';
import { useAuthHeader } from '@hooks/useAuth';
import axiosClient from '@lib/axios';
import { useQuery } from '@tanstack/react-query';

export function useStaffRoles(companyId: number) {
  const authHeader = useAuthHeader();

  return useQuery(['roles'], async () => {
    const response = await axiosClient.get<IResponse<IStaffRole[]>>(
      `/company/staff_roles?company_id=${companyId}`,
      { headers: authHeader }
    );

    return response.data;
  });
}
