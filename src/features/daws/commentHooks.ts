import { useMutation, useQuery, useQueryClient } from "react-query";
import { DawComment } from "../../@types/dawComment";
import axios from "axios";

const API_URL = "/api/store";
// const API_URL = "http://localhost:5000/api/store";

const commentKeys = {
  all: ["dawComments"] as const,
  daw: (dawId: number) => [...commentKeys.all, dawId] as const,
  single: (dawId: number, commentId: number) =>
    [...commentKeys.daw(dawId), commentId] as const,
};

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

export const useGetCommentsForDawQuery = (dawId: number) => {
  const thirty_seconds = 30000;
  return useQuery({
    queryKey: commentKeys.daw(dawId),
    queryFn: () => fetchComments(dawId),
    refetchInterval: thirty_seconds,
  });
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

export const useAddCommentForDawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: { dawId: number; content: string }) => {
      const comment = {
        id: Date.now(),
        dawId: newComment.dawId,
        content: newComment.content,
      };
      const existingComments =
        queryClient.getQueryData<DawComment[]>(
          commentKeys.daw(newComment.dawId)
        ) || [];
      const updatedComments = [...existingComments, comment];

      return postComments({
        dawId: newComment.dawId,
        comments: updatedComments,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.daw(variables.dawId),
      });
    },
  });
};

export const useEditCommentForDawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: { dawId: number; commentId: number; newContent: string }) => {
      const existingComments =
        queryClient.getQueryData<DawComment[]>(commentKeys.daw(params.dawId)) ||
        [];
      const updatedComments = existingComments.map((comment) =>
        comment.id === params.commentId
          ? { ...comment, content: params.newContent }
          : comment
      );
      return postComments({ dawId: params.dawId, comments: updatedComments });
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(
          commentKeys.single(variables.dawId, variables.commentId)
        );
      },
    }
  );
};

export const useDeleteCommentForDawMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: { dawId: number; commentId: number }) => {
      const existingComments =
        queryClient.getQueryData<DawComment[]>(commentKeys.daw(params.dawId)) ||
        [];
      const updatedComments = existingComments.filter(
        (comment) => comment.id !== params.commentId
      );
      return postComments({ dawId: params.dawId, comments: updatedComments });
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(commentKeys.daw(variables.dawId));
      },
    }
  );
};
