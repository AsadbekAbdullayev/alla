// entities/Categories/api.ts
import request from "@/services/api";
import { useQuery } from "react-query";

export interface Category {
  name: string;
  description: string;
  key: string;
}

export interface CategoryStats {
  totalVideos: number;
  totalViews: number;
  category: string;
}

// ======== Fetch all categories ========
const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await request.get<{
    success: boolean;
    message: string;
    data: Category[];
  }>("/content/categories", { baseURL: "https://api.alla.itic.uz/api" });
  return data.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false,
    cacheTime: 5 * 60 * 1000, // 5 min
  });
};

// ======== Fetch stats by category key ========
const fetchCategoryStats = async (key: string): Promise<CategoryStats> => {
  const { data } = await request.get<{
    success: boolean;
    message: string;
    data: CategoryStats;
  }>(`/content/categories/${key}/stats`, {
    baseURL: "https://api.alla.itic.uz/api",
  });
  return data.data;
};

export const useCategoryStats = (key: string, enabled = true) => {
  return useQuery({
    queryKey: ["categoryStats", key],
    queryFn: () => fetchCategoryStats(key),
    enabled,
    refetchOnWindowFocus: false,
    cacheTime: 2 * 60 * 1000, // 2 min
  });
};
