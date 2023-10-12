import React, { useState } from "react";
import { Spinner } from "../../components/Spinner";
import {
  useAddCommentForDawMutation,
  useGetCommentsForDawQuery,
  useDeleteCommentForDawMutation,
  useEditCommentForDawMutation,
} from "../../features/daws/commentHooks";

type DawCommentProps = {
  dawId: number;
};

export const DawComments: React.FC<DawCommentProps> = ({ dawId }) => {
  const {
    data: comments = [],
    isLoading: isLoading,
    isError: isError,
    refetch,
  } = useGetCommentsForDawQuery(dawId);

  const addCommentMutation = useAddCommentForDawMutation();
  const editCommentMutation = useEditCommentForDawMutation();
  const deleteCommentMutation = useDeleteCommentForDawMutation();

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");

  const startEditingComment = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      return;
    }
    addCommentMutation.mutate(
      { dawId, content: newComment },
      {
        onSuccess: () => {
          refetch();
          setNewComment("");
        },
      }
    );
  };

  const saveEditedComment = () => {
    if (editingCommentId !== null && editingContent !== "") {
      editCommentMutation.mutate(
        { dawId, commentId: editingCommentId, newContent: editingContent },
        {
          onSuccess: () => {
            refetch();
            setEditingCommentId(null);
            setEditingContent("");
          },
        }
      );
    }
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation.mutate(
        { dawId, commentId },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };

  return (
    <div className="mt-4">
      <h4>Comments:</h4>
      {isError && <p>No Comments at this time</p>}
      {isLoading && <Spinner />}
      {!isLoading && !isError && (
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
