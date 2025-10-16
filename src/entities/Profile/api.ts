import request from "@/services/api";
import { useMutation } from "react-query";

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

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};
