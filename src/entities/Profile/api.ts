import request from "@/services/api";
import { useMutation, useQuery } from "react-query";

// ======== Update User ========
interface UserProfile {
  firstName?: string;
  lastName?: string;
  age?: number;
  profileImageUrl?: string;
}

const updateUser = async (body: UserProfile): Promise<UserProfile> => {
  const { data } = await request.put<UserProfile>("/user/profile", body);
  return data;
};

const getUser = async (): Promise<any> => {
  const { data } = await request.get<UserProfile>("/user/profile");
  return data;
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["useGetAdminVideos"],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
  });
};
