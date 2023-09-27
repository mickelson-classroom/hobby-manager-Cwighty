import { useState } from "react";
import { MusicRecord, RecordContextType } from "../../@types/musicRecord";
import { TextInput } from "../../components/TextInput";
import { useAppDispatch } from "../../app/hooks";
import { updateRecord } from "../../features/records/recordSlice";
import { ImageInput } from "../../components/ImageInput";

export const RecordItem = ({
  record,
  onRemove,
}: {
  record: MusicRecord;
  onRemove: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState<MusicRecord>(record);

  const handleSave = () => {
    setIsEditing(false);
    dispatch(updateRecord(editedRecord));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRecord({
      ...editedRecord,
      [event.target.id]: event.target.value,
    });
  };

  const handleBase64Set = (base64: string | null) => {
    setEditedRecord({
      ...editedRecord,
      image: base64,
    });
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-end align-content-center">
        {isEditing ? (
          <button
            className="btn btn-outline-success bi bi-save"
            onClick={() => handleSave()}
          ></button>
        ) : (
          <button
            className="btn btn-outline-info bi bi-pencil"
            onClick={() => setIsEditing(true)}
          ></button>
        )}
        <button className="btn btn-close my-auto ms-3" onClick={onRemove} />
      </div>
      {isEditing ? (
        <div className="card-body">
          <div className="form-group">
            <ImageInput
              base64={editedRecord.image || null}
              setBase64={handleBase64Set}
            />
            <TextInput
              value={editedRecord.title}
              onChange={handleChange}
              label={"Title"}
            />
            <TextInput
              value={editedRecord.artist}
              onChange={handleChange}
              label={"Artist"}
            />
            <TextInput
              value={editedRecord.year.toString()}
              onChange={handleChange}
              label={"Year"}
            />
          </div>
        </div>
      ) : (
        <>
          <img
            className="card-img-top w-50 mx-auto"
            src={
              record.image
                ? `data:image/jpeg;base64,${record.image}`
                : "/placeholder_vinyl.jpg"
            }
            alt={record.title}
          />
          <div className="card-body">
            <h3>{record.title}</h3>
            <p>{record.artist}</p>
            <p>{record.year}</p>
          </div>
        </>
      )}
    </div>
  );
};
