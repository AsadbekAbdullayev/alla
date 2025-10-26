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
    cacheTime: 0,
  });
};

const fetchBookById = async (id: number) => {
  const { data } = await request.get(`/books/${id}`);
  return data;
};

export const useGetBookById = (id: number) => {
  return useQuery({
    queryKey: ["fetchBookById", id],
    queryFn: () => fetchBookById(id),
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });
};
