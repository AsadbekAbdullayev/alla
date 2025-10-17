import request from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchUserById = async (id: number) => {
  const { data } = await request.get(`/admin/users/${id}`);
  return data;
};

export const useUserById = (id?: number) =>
  useQuery(["user", id], () => fetchUserById(id!), { enabled: !!id });

const updateUser = async ({ id, ...user }: any) => {
  const { data } = await request.put(`/admin/users/${id}`, user);
  return data;
};

export const useUpdateUser = () => {
  const q = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => q.invalidateQueries("users"),
  });
};

const deleteUser = async (id: number) => request.delete(`/admin/users/${id}`);

export const useDeleteUser = () =>
  useMutation(deleteUser, { onSuccess: () => console.log("deleted") });

const getUsers = async (params: {
  page?: number;
  size?: number;
  role?: string;
}) => {
  const { data } = await request.get("/admin/users", {
    params,
    baseURL: "https://api.alla.itic.uz/api",
  });
  return data;
};

export const useGetUsers = (params: any) =>
  useQuery(["users", params], () => getUsers(params));

const createUser = async (user: any) => {
  const { data } = await request.post("/admin/users", user);
  return data;
};

export const useCreateUser = () => {
  const q = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => q.invalidateQueries("users"),
  });
};

const unblockUser = async (id: number) =>
  request.post(`/admin/users/${id}/unblock`, "");

export const useUnblockUser = () => useMutation(unblockUser);

const resetPassword = async (id: number) =>
  request.post(`/admin/users/${id}/reset-password`, "");

export const useResetPassword = () => useMutation(resetPassword);

const blockUser = async (id: number) =>
  request.post(`/admin/users/${id}/block`, "");

export const useBlockUser = () => useMutation(blockUser);
