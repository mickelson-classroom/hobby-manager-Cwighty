import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateDaw } from "../../features/daws/dawsSlice";

export const AddFeatureOrSong = ({ id: number }: { id: number }) => {
  const dispatch = useAppDispatch();
  const daws = useAppSelector((s) => s.dawStore.daws);
  const status = useAppSelector((s) => s.dawStore.status);
  const [newFeature, setNewFeature] = useState("");
  const [newSong, setNewSong] = useState("");
  const daw = daws.find((daw) => daw.id === number);

  if (!daw) {
    return <div>Daw not found</div>;
  }

  const handleAddFeature = () => {
    if (status === "loading") return;
    if (newFeature.trim() !== "") {
      const updatedFeatures = [...daw.features, newFeature];
      dispatch(updateDaw({ ...daw, features: updatedFeatures }));
      setNewFeature("");
    }
  };

  const handleAddSong = () => {
    if (status === "loading") return;
    if (newSong.trim() !== "") {
      const updatedSongs = [...daw.famousSongs, newSong];
      dispatch(updateDaw({ ...daw, famousSongs: updatedSongs }));
      setNewSong("");
    }
  };

  return (
    <div>
      <hr />
      <label htmlFor="newFeature" className="form-label">
        New Feature:
      </label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New Feature"
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddFeature}>
          Add
        </button>
      </div>
      <label htmlFor="newSong" className="form-label">
        New Famous Song:
      </label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New Song"
          value={newSong}
          onChange={(e) => setNewSong(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddSong}>
          Add
        </button>
      </div>
      <hr />
    </div>
  );
};
