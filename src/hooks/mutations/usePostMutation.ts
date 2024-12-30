import { useMutation } from "@tanstack/react-query";
import { FetchAddPost, FetchUpdatePost } from "@/services/postApi";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { findPostCategoryUrl, queryKeys } from "@/constants";
import axios from "axios";
import queryClient from "@/services/queryClient";

const useAddPost = () => {
  return useMutation({
    mutationFn: FetchAddPost,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_POST_LIST],
      });
      let categoryListUrl = findPostCategoryUrl(variables.postCategory);
      confirmAlert("success", "게시물이 등록되었습니다.").then((res) => {
        if (res.isConfirmed) window.location.href = categoryListUrl;
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_POST_LIST],
      });
    },
    onError: async (error) => {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data.detailMessage;
        if (message === "제목은 필수입니다.")
          await confirmAlert("error", "제목을 입력해주세요");
        else if (message === "내용은 필수입니다.")
          await confirmAlert("error", "내용을 입력해주세요");
        else if (message === "Title Duplication")
          await confirmAlert("error", "중복된 제목입니다");
      }
    },
  });
};

const useUpdatePost = () => {
  return useMutation({
    mutationFn: FetchUpdatePost,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_POST_LIST],
      });
      let categoryListUrl = findPostCategoryUrl(variables.postCategory);
      confirmAlert("success", "게시물이 수정되었습니다.").then((res) => {
        if (res.isConfirmed) window.location.href = categoryListUrl;
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_POST_LIST],
      });
    },
    onError: async (error, variables) => {
      let categoryListUrl = findPostCategoryUrl(variables.postCategory);
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data.detailMessage;
        if (message === "제목은 필수입니다.")
          await confirmAlert("error", "제목을 입력해주세요");
        else if (message === "내용은 필수입니다.")
          await confirmAlert("error", "내용을 입력해주세요");
        else if (message === "Title Duplication")
          await confirmAlert("error", "중복된 제목입니다");
        else if (message === "Post Not Found")
          await confirmAlert("error", "게시글을 찾을 수 없습니다.").then(
            (res) => {
              if (res.isConfirmed) window.location.href = categoryListUrl;
            },
          );
      }
    },
  });
};

const usePostMutation = () => {
  const addPost = useAddPost();
  const updatePost = useUpdatePost();
  return {
    updatePost,
    addPost,
  };
};

export default usePostMutation;
