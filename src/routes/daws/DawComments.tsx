// CommentComponent.tsx
import React, { useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner";
import { DawComment } from "../../@types/dawComment";
import {
  addCommentForDaw,
  deleteCommentForDaw,
  editCommentForDaw,
  fetchCommentsForDaw,
} from "../../features/daws/commentsApiService";

type DawCommentProps = {
  dawId: number;
};

export const DawComments: React.FC<DawCommentProps> = ({ dawId }) => {
  const [comments, setComments] = useState<DawComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoadingComments, setIsLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");

  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      const commentsForDaw = await fetchCommentsForDaw(dawId);
      setComments(commentsForDaw);
      setIsLoading(false);
    };
    loadComments();
  }, [dawId]);

  const startEditingComment = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      return;
    }
    setIsLoading(true);
    await addCommentForDaw(dawId, newComment);
    const updatedComments = await fetchCommentsForDaw(dawId);
    setComments(updatedComments);
    setIsLoading(false);
    setNewComment("");
  };

  const saveEditedComment = async () => {
    if (editingCommentId !== null && editingContent !== "") {
      setIsLoading(true);
      await editCommentForDaw(dawId, editingCommentId, editingContent);
      const updatedComments = await fetchCommentsForDaw(dawId);
      setComments(updatedComments);
      setIsLoading(false);
      setEditingCommentId(null);
      setEditingContent("");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setIsLoading(true);
      await deleteCommentForDaw(dawId, commentId);
      const updatedComments = await fetchCommentsForDaw(dawId);
      setComments(updatedComments);
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h4>Comments:</h4>
      {isLoadingComments ? (
        <Spinner />
      ) : (
        <div>
          {comments.length === 0 && <p>No comments yet.</p>}
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-2 border rounded p-2 d-flex align-items-start"
            >
              {editingCommentId === comment.id ? (
                <>
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="form-control mb-2"
                  ></textarea>
                  <div className="ml-auto d-flex">
                    <button
                      onClick={saveEditedComment}
                      className="btn btn-success btn-sm mr-2 bi bi-save me-2"
                    ></button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="btn btn-secondary btn-sm bi bi-x-square"
                    ></button>
                  </div>
                </>
              ) : (
                <>
                  <p
                    style={{
                      wordWrap: "break-word",
                      width: "300px",
                      flex: "1 1 auto",
                    }}
                  >
                    {comment.content}
                  </p>
                  <div className="ml-auto">
                    <button
                      onClick={() =>
                        startEditingComment(comment.id, comment.content)
                      }
                      className="btn btn-warning btn-sm mr-2 bi bi-pencil-square me-2"
                    ></button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="btn btn-danger btn-sm bi bi-trash"
                    ></button>
                  </div>
                </>
              )}
            </div>
          ))}
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="form-control mb-2"
              placeholder="Add a comment..."
            ></textarea>
            <button onClick={handleAddComment} className="btn btn-primary">
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
