import request from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "react-query";

// =============== INTERFACES ===============

export interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  ageLimit: number;
  duration: number;
  viewCount: number;
  likeCount: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  transcript?: string;
  tags?: string[];
  createdAt?: string;
  isSaved?: boolean;
  watchedDuration?: number;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  pdfUrl: string;
  audioUrl: string;
  ageLimit: number;
  totalPages: number;
  duration: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  tags?: string[];
  createdAt?: string;
  isSaved?: boolean;
  currentPage?: number;
  audioPosition?: number;
}

const BASE_URL = "https://api.alla.itic.uz/api/admin";

// =============== VIDEO APIs ===============

// Get all videos
const fetchVideos = async ({ page = 0, size = 20 }) => {
  const { data } = await request.get(
    `${BASE_URL}/videos?page=${page}&size=${size}`
  );
  return data;
};

// Create new video
const createVideo = async (videoData: Video) => {
  const { data } = await request.post(`${BASE_URL}/videos`, videoData);
  return data;
};

// Update video
const updateVideo = async ({
  id,
  data: videoData,
}: {
  id: number;
  data: Video;
}) => {
  const { data: res } = await request.put(
    `${BASE_URL}/videos/${id}`,
    videoData
  );
  return res;
};

// Delete video
const deleteVideo = async (id: number) => {
  await request.delete(`${BASE_URL}/videos/${id}`);
};

// Approve video
const approveVideo = async (id: number) => {
  const { data } = await request.post(`${BASE_URL}/videos/${id}/approve`);
  return data;
};

// Reject video
const rejectVideo = async (id: number) => {
  const { data } = await request.post(`${BASE_URL}/videos/${id}/reject`);
  return data;
};

// =============== BOOK APIs ===============

// Get books
const fetchBooks = async ({ page = 0, size = 20 }) => {
  const { data } = await request.get(
    `${BASE_URL}/books?page=${page}&size=${size}`
  );
  return data;
};

// Create book
const createBook = async (bookData: Book) => {
  const { data } = await request.post(`${BASE_URL}/books`, bookData);
  return data;
};

// Update book
const updateBook = async ({
  id,
  data: bookData,
}: {
  id: number;
  data: Book;
}) => {
  const { data: res } = await request.put(`${BASE_URL}/books/${id}`, bookData);
  return res;
};

// Delete book
const deleteBook = async (id: number) => {
  await request.delete(`${BASE_URL}/books/${id}`);
};

// Approve book
const approveBook = async (id: number) => {
  const { data } = await request.post(`${BASE_URL}/books/${id}/approve`);
  return data;
};

// Reject book
const rejectBook = async (id: number) => {
  const { data } = await request.post(`${BASE_URL}/books/${id}/reject`);
  return data;
};

// =============== UPLOAD APIs ===============

const uploadFile = async ({
  type,
  file,
}: {
  type: "video" | "pdf" | "image" | "audio";
  file: File;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await request.post(`${BASE_URL}/upload/${type}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// =============== QUERIES & MUTATIONS ===============

// ---- VIDEOS ----
export const useGetVideos = (params: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: ["videos", params],
    queryFn: () => fetchVideos(params),
    refetchOnWindowFocus: false,
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(createVideo, {
    onSuccess: () => queryClient.invalidateQueries(["videos"]),
  });
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(updateVideo, {
    onSuccess: () => queryClient.invalidateQueries(["videos"]),
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteVideo, {
    onSuccess: () => queryClient.invalidateQueries(["videos"]),
  });
};

export const useApproveVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(approveVideo, {
    onSuccess: () => queryClient.invalidateQueries(["videos"]),
  });
};

export const useRejectVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(rejectVideo, {
    onSuccess: () => queryClient.invalidateQueries(["videos"]),
  });
};

// ---- BOOKS ----
export const useGetBooks = (params: { page?: number; size?: number }) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => fetchBooks(params),
    refetchOnWindowFocus: false,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation(createBook, {
    onSuccess: () => queryClient.invalidateQueries(["books"]),
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBook, {
    onSuccess: () => queryClient.invalidateQueries(["books"]),
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBook, {
    onSuccess: () => queryClient.invalidateQueries(["books"]),
  });
};

export const useApproveBook = () => {
  const queryClient = useQueryClient();
  return useMutation(approveBook, {
    onSuccess: () => queryClient.invalidateQueries(["books"]),
  });
};

export const useRejectBook = () => {
  const queryClient = useQueryClient();
  return useMutation(rejectBook, {
    onSuccess: () => queryClient.invalidateQueries(["books"]),
  });
};

// ---- UPLOAD ----
export const useUploadFile = () => {
  return useMutation(uploadFile);
};
