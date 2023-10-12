import { useState } from "react";
import { MusicRecord, } from "../../@types/musicRecord";
import { TextInput, useTextInput } from "../../components/inputs/TextInput";
import { useAppDispatch } from "../../app/hooks";
import { genreOptions, updateRecord } from "../../features/records/recordSlice";
import { ImageInput } from "../../components/inputs/ImageInput";
import {
  OptionInput,
  useOptionInput,
} from "../../components/inputs/OptionInput";

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

  const titleTextControl = useTextInput({
    initialValue: record.title,
    onChange: (value) => {
      setEditedRecord({
        ...editedRecord,
        title: value,
      });
    },
  });

  const artistTextControl = useTextInput({
    initialValue: record.artist,
    onChange: (value) => {
      setEditedRecord({
        ...editedRecord,
        artist: value,
      });
    },
  });

  const genreOptionControl = useOptionInput({
    initialLabel: "Genre",
    initialOptions: genreOptions,
    initialValue: record.genre,
    onChange: (value: string) => {
      setEditedRecord({
        ...editedRecord,
        genre: value,
      });
    },
    initialType: "select",
  });

  const yearTextControl = useTextInput({
    initialValue: record.year.toString(),
    onChange: (value) => {
      setEditedRecord({
        ...editedRecord,
        year: parseInt(value),
      });
    },
  });

  const handleSave = () => {
    setIsEditing(false);
    dispatch(updateRecord(editedRecord));
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
            <TextInput control={titleTextControl} label={"Title"} />
            <TextInput control={artistTextControl} label={"Artist"} />
            <TextInput control={yearTextControl} label={"Year"} />
            <OptionInput control={genreOptionControl} />
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
            <p>{record.genre}</p>
          </div>
        </>
      )}
    </div>
  );
};
