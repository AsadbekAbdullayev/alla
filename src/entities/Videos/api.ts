// entities/Videos/api.ts
import request from "@/services/api";
import { useQuery } from "react-query";

export interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  category: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const fetchVideosByCategory = async (
  category: string,
  page = 0,
  size = 20
): Promise<any> => {
  const { data } = await request.get<ApiResponse<Video[]>>(
    `/videos/category/${category}?page=${page}&size=${size}`
  );
  return data.data;
};

export const useVideosByCategory = (
  category: string,
  page = 0,
  size = 20,
  enabled = true
) => {
  return useQuery({
    queryKey: ["videosByCategory", category, page, size],
    queryFn: () => fetchVideosByCategory(category, page, size),
    enabled,
    refetchOnWindowFocus: false,
    cacheTime: 5 * 60 * 1000,
  });
};
