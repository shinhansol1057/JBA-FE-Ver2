// app/admin/gallery/api.ts
import { authApi } from "@/services/axios/authApi";

export interface GalleryParams {
  page: number;
  size: number;
  keyword?: string;
  searchCriteriaString?: string;
  startDate?: string;
  endDate?: string;
}

export interface GalleryListResponse {
  data: {
    totalPages: number;
    totalGalleries: number;
    galleries: Gallery[];
  };
}

export interface Gallery {
  galleryId: number;
  email: string;
  isOfficial: boolean;
  thumbnail: string;
  title: string;
  files: any[];
  galleryStatus: "normal" | string;
  createAt: string;
  updateAt: string | null;
  deleteAt: string | null;
}

export const getGallery = async (
  params: GalleryParams,
): Promise<GalleryListResponse["data"]> => {
  try {
    const { data } = await authApi.get<GalleryListResponse>(
      "/v1/api/admin/gallery",
      { params },
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};
