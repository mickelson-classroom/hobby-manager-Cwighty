import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DawContextType } from "../../@types/daw";
import { DawContext } from "../../context/dawContext";
import { AddFeatureOrSong } from "./AddFeatureOrSong";
import {
  addCommentForDaw,
  deleteCommentForDaw,
  editCommentForDaw,
  fetchCommentsForDaw,
} from "../../features/daws/commentsApiService";
import { Spinner } from "../../components/Spinner";
import { DawComment } from "../../@types/dawComment";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDaws } from "../../features/daws/dawsSlice";

export const DawDetail = () => {
  const dispatch = useAppDispatch();
  const daws = useAppSelector((state: any) => state.daws.daws);
  const { dawId: dawIdStr } = useParams<{ dawId: string }>();
  const dawId = parseInt(dawIdStr, 10);
  const [comments, setComments] = useState<DawComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");

  if (!dawId) {
    return <div>Invalid Daw ID</div>;
  }

  const daw = daws.find((d) => d.id === dawId);
  useEffect(() => {
    // If the daws aren't in the store yet, fetch them
    if (!daw) {
      dispatch(fetchDaws());
    }
  });

  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      const commentsForDaw = await fetchCommentsForDaw(daw.id);
      setComments(commentsForDaw);
      setIsLoading(false);
    };
    loadComments();
  }, [daw.id]);

  const startEditingComment = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      return;
    }
    setIsLoading(true);
    await addCommentForDaw(daw.id, newComment);
    const updatedComments = await fetchCommentsForDaw(daw.id);
    setComments(updatedComments);
    setIsLoading(false);
    setNewComment("");
  };

  const saveEditedComment = async () => {
    if (editingCommentId !== null && editingContent !== "") {
      setIsLoading(true);
      await editCommentForDaw(daw.id, editingCommentId, editingContent);
      const updatedComments = await fetchCommentsForDaw(daw.id);
      setComments(updatedComments);
      setIsLoading(false);
      // Reset editing state
      setEditingCommentId(null);
      setEditingContent("");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setIsLoading(true);
      await deleteCommentForDaw(daw.id, commentId);
      const updatedComments = await fetchCommentsForDaw(daw.id);
      setComments(updatedComments);
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded my-3 p-3 bg-dark">
      <div className="row">
        <div className="col-md-6">
          <img
            src={daw.image}
            alt={daw.name}
            className="img-fluid rounded mx-auto d-block"
            style={{ maxHeight: "220px" }}
          />
          <hr />
          <h1>{daw.name}</h1>
          <hr />
          <p>{daw.description}</p>
          <p>
            <strong>Price: </strong>
            <span className="badge bg-success">{daw.price}</span>
          </p>
        </div>
        <div className="col-md-6">
          <h3>Best Features:</h3>
          <ul className="list-group m-3">
            {daw.features.map((feature) => (
              <li className="list-group-item" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
          <h3>Famous Songs:</h3>
          <ul className="list-group m-3">
            {daw.famousSongs.map((song) => (
              <li className="list-group-item" key={song}>
                {song}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddFeatureOrSong id={daw.id} />
      <div className="mt-4">
        <h4>Comments:</h4>
        {isLoading ? (
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
    </div>
  );
};
