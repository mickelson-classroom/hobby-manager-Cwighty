import { useContext, useState } from "react";
import { MusicRecord, RecordContextType } from "../../@types/musicRecord";
import { RecordContext } from "../../context/recordContext";
import { TextInput } from "../../components/TextInput";
import { NumberInput } from "../../components/NumberInput";

export const RecordItem = ({
  record,
  onRemove,
}: {
  record: MusicRecord;
  onRemove: () => void;
}) => {
  const { updateRecord } = useContext(RecordContext) as RecordContextType;
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState<MusicRecord>(record);

  const handleSave = () => {
    setIsEditing(false);
    updateRecord(editedRecord);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRecord({
      ...editedRecord,
      [event.target.id]: event.target.value,
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
        <div className="card-body">
          <h3>{record.title}</h3>
          <p>{record.artist}</p>
          <p>{record.year}</p>
        </div>
      )}
    </div>
  );
};
