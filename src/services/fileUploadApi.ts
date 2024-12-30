import { Api } from "@/services/axios/api";

export const FetchUploadFile = (files: File[]) => {
  const formData: FormData = new FormData();
  files.forEach((file) => {
    formData.append("uploadFiles", file);
  });
  return Api.post("v1/api/disk/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
