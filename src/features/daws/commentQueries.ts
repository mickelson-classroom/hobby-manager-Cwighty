import { useMutation, useQuery, useQueryClient } from "react-query";
import { DawComment } from "../../@types/dawComment";
import axios from "axios";

const API_URL = "/api/store";
// const API_URL = "http://localhost:5000/api/store";

const COMMENTS_QUERY_KEY = "dawComments";
const getCommentsUrl = (dawId: number) => `${API_URL}?key=dawComments_${dawId}`;

const fetchComments = async (dawId: number): Promise<DawComment[]> => {
  try {
    const response = await axios.get(getCommentsUrl(dawId));
    if (response.status === 404) {
      return [];
    }
    return response.data || [];
  } catch (error: any) {
    throw error;
  }
};

const postComments = async (params: {
  dawId: number;
  comments: DawComment[];
}): Promise<void> => {
  try {
    await axios.post(getCommentsUrl(params.dawId), params.comments, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    throw error;
  }
};

export const useCommentsForDawQuery = (dawId: number) => {
  return useQuery([COMMENTS_QUERY_KEY, dawId], () => fetchComments(dawId));
};

export const useAddCommentForDawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: { dawId: number; content: string }) => {
      const comment = {
        id: Date.now(),
        dawId: params.dawId,
        content: params.content,
      };
      const existingComments =
        queryClient.getQueryData<DawComment[]>([
          COMMENTS_QUERY_KEY,
          params.dawId,
        ]) || [];
      const updatedComments = [...existingComments, comment];
      return postComments({ dawId: params.dawId, comments: updatedComments });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([COMMENTS_QUERY_KEY, variables.dawId]);
      },
    }
  );
};

export const useEditCommentForDawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: { dawId: number; commentId: number; newContent: string }) => {
      const existingComments =
        queryClient.getQueryData<DawComment[]>([
          COMMENTS_QUERY_KEY,
          params.dawId,
        ]) || [];
      const updatedComments = existingComments.map((comment) =>
        comment.id === params.commentId
          ? { ...comment, content: params.newContent }
          : comment
      );
      return postComments({ dawId: params.dawId, comments: updatedComments });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([COMMENTS_QUERY_KEY, variables.dawId]);
      },
    }
  );
};

export const useDeleteCommentForDawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: { dawId: number; commentId: number }) => {
      const existingComments =
        queryClient.getQueryData<DawComment[]>([
          COMMENTS_QUERY_KEY,
          params.dawId,
        ]) || [];
      const updatedComments = existingComments.filter(
        (comment) => comment.id !== params.commentId
      );
      return postComments({ dawId: params.dawId, comments: updatedComments });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([COMMENTS_QUERY_KEY, variables.dawId]);
      },
    }
  );
};
