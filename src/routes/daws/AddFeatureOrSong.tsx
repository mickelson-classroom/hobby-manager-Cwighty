import { useContext, useState } from "react";
import { DawContext } from "../../context/dawContext";
import { DawContextType } from "../../@types/daw";

export const AddFeatureOrSong = ({ id: number }: { id: number }) => {
  const { daws, updateDaw } = useContext(DawContext) as DawContextType;
  const [newFeature, setNewFeature] = useState("");
  const [newSong, setNewSong] = useState("");
  const daw = daws.find((daw) => daw.id === number);

  if (!daw) {
    return <div>Daw not found</div>;
  }

  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      const updatedFeatures = [...daw.features, newFeature];
      updateDaw({ ...daw, features: updatedFeatures });
      setNewFeature("");
    }
  };

  const handleAddSong = () => {
    if (newSong.trim() !== "") {
      const updatedSongs = [...daw.famousSongs, newSong];
      updateDaw({ ...daw, famousSongs: updatedSongs });
      setNewSong("");
    }
  };

  return (
    <div>
      <h3>Add a Feature:</h3>
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
      <h3>Add a Famous Song:</h3>
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
    </div>
  );
};
