import { useState } from "react";
import { MusicRecord } from "../../@types/musicRecord";
import { RecordItem } from "./RecordItem";
import { TextInput } from "../../components/inputs/TextInput";
import { useTextInput } from "../../components/inputs/useTextInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addRecord,
  genreOptions,
  removeRecord,
} from "../../features/records/recordSlice";
import { ImageInput } from "../../components/inputs/ImageInput";
import { OptionInput } from "../../components/inputs/OptionInput";
import { useOptionInput } from "../../components/inputs/useOptionInput";

export const RecordLibrary = () => {
  const records = useAppSelector((state) => state.recordStore.records);
  const dispatch = useAppDispatch();

  const defaultRecord: MusicRecord = {
    id: 0,
    title: "",
    artist: "",
    genre: genreOptions[0].value,
    year: 2023,
    image: null,
  };

  const [newRecord, setNewRecord] = useState<MusicRecord>(defaultRecord);

  const titleTextControl = useTextInput({
    initialValue: newRecord.title,
    onChange: (value) => {
      setNewRecord({
        ...newRecord,
        title: value,
      });
    },
  });

  const artistTextControl = useTextInput({
    initialValue: newRecord.artist,
    onChange: (value) => {
      setNewRecord({
        ...newRecord,
        artist: value,
      });
    },
  });

  const yearTextControl = useTextInput({
    initialValue: newRecord.year.toString(),
    onChange: (value) => {
      setNewRecord({
        ...newRecord,
        year: parseInt(value),
      });
    },
  });

  const genreOptionControl = useOptionInput({
    initialLabel: "Genre",
    initialOptions: genreOptions,
    initialValue: newRecord.genre,
    onChange: (value: string) => {
      setNewRecord({
        ...newRecord,
        genre: value,
      });
    },
    initialType: "select",
  });

  const handleBase64Set = (base64: string | null) => {
    setNewRecord({
      ...newRecord,
      image: base64,
    });
  };

  return (
    <div>
      <h1>Record Library</h1>
      <div className="row mb-5">
        <div className="col-12 col-lg-6">
          {records.map((record) => (
            <div key={record.id} className="mb-3">
              <RecordItem
                key={record.id}
                record={record}
                onRemove={() => dispatch(removeRecord(record))}
              />
            </div>
          ))}
        </div>

        <div className="col-12 col-lg-6">
          <div className="card mb-5">
            <div className="card-header">Add Record</div>
            <div className="card-body">
              <ImageInput
                base64={newRecord.image || null}
                setBase64={handleBase64Set}
              />
              <TextInput label="Title" control={titleTextControl} />
              <TextInput label="Artist" control={artistTextControl} />
              <TextInput label="Year" control={yearTextControl} />
              <OptionInput control={genreOptionControl} />
              <button
                className="btn btn-primary my-2"
                onClick={() => {
                  dispatch(addRecord(newRecord));
                  setNewRecord(defaultRecord);
                  titleTextControl.clear();
                  artistTextControl.clear();
                  yearTextControl.setValue(defaultRecord.year.toString());
                  genreOptionControl.setValue(defaultRecord.genre);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
