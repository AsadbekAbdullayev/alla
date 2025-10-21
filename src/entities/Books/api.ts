import request from "@/services/api";
import { useQuery } from "react-query";

const fetchBooks = async ({ page = 0, size = 20 }) => {
  const { data } = await request.get(`/books?page=${page}&size=${size}`);
  return data;
};

export const useGetBooks = (params: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: ["useGetBooks", params],
    queryFn: () => fetchBooks(params),
    refetchOnWindowFocus: false,
  });
};
