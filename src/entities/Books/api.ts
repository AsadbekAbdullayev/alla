// src/api/books.ts
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const api = axios.create({
  baseURL: "https://api.alla.itic.uz/api",
});

// 1️⃣ GET - Get all books
export const getBooks = async (page = 0, size = 20) => {
  const { data } = await api.get(`/books?page=${page}&size=${size}`);
  return data;
};

// 2️⃣ GET - Get single book by ID
export const getBookById = async (id: number) => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

// 3️⃣ GET - Search books
export const searchBooks = async (keyword: string, page = 0, size = 20) => {
  const { data } = await api.get(
    `/books/search?keyword=${keyword}&page=${page}&size=${size}`
  );
  return data;
};

// 4️⃣ POST - Toggle save (bookmark)
export const toggleSaveBook = async (id: number) => {
  const { data } = await api.post(`/books/${id}/toggle-save`);
  return data;
};

// 5️⃣ POST - Update reading progress
export const updateProgress = async ({
  id,
  currentPage,
  audioPosition,
}: {
  id: number;
  currentPage: number;
  audioPosition: number;
}) => {
  const { data } = await api.post(
    `/books/${id}/progress?currentPage=${currentPage}&audioPosition=${audioPosition}`
  );
  return data;
};

// ✅ Get all books
export const useBooks = (page = 0, size = 20) => {
  return useQuery({
    queryKey: ["books", page, size],
    queryFn: () => getBooks(page, size),
  });
};

// ✅ Get single book
export const useBook = (id: number) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
    enabled: !!id,
  });
};

// ✅ Search books
export const useSearchBooks = (keyword: string, page = 0, size = 20) => {
  return useQuery({
    queryKey: ["searchBooks", keyword, page, size],
    queryFn: () => searchBooks(keyword, page, size),
    enabled: !!keyword,
  });
};

// ✅ Toggle save mutation
export const useToggleSave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => toggleSaveBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

// ✅ Update progress mutation
export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProgress,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["book", variables.id] });
    },
  });
};
