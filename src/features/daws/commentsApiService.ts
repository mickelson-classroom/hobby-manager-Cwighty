import { DawComment } from "../../@types/dawComment";

const API_URL = "/api/store";
// const API_URL = "http://localhost:5000/api/store";

export const fetchCommentsForDaw = async (
  dawId: number
): Promise<DawComment[]> => {
  const response = await fetch(`${API_URL}?key=dawComments_${dawId}`);
  if (response.status === 404) {
    await fetch(`${API_URL}?key=dawComments_${dawId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    });
    return [];
  }
  const data = await response.json();
  return data || [];
};

export const addCommentForDaw = async (
  dawId: number,
  content: string
): Promise<DawComment> => {
  const comment = { id: Date.now(), dawId, content };
  const existingComments = await fetchCommentsForDaw(dawId);
  const updatedComments = [...existingComments, comment];
  await fetch(`${API_URL}?key=dawComments_${dawId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedComments),
  });
  return comment;
};

export const editCommentForDaw = async (
  dawId: number,
  commentId: number,
  newContent: string
): Promise<void> => {
  const existingComments = await fetchCommentsForDaw(dawId);
  const updatedComments = existingComments.map((comment) =>
    comment.id === commentId ? { ...comment, content: newContent } : comment
  );

  await fetch(`${API_URL}?key=dawComments_${dawId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedComments),
  });
};

export const deleteCommentForDaw = async (
  dawId: number,
  commentId: number
): Promise<void> => {
  const existingComments = await fetchCommentsForDaw(dawId);
  const updatedComments = existingComments.filter(
    (comment) => comment.id !== commentId
  );

  await fetch(`${API_URL}?key=dawComments_${dawId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedComments),
  });
};
