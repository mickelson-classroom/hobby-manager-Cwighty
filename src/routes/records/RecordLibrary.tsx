import { useState } from "react";
import { MusicRecord, RecordContextType } from "../../@types/musicRecord";
import { RecordItem } from "./RecordItem";
import { TextInput } from "../../components/TextInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addRecord, removeRecord } from "../../features/records/recordSlice";

export const RecordLibrary = () => {
  const records = useAppSelector((state) => state.recordStore.records);
  const dispatch = useAppDispatch();

  const defaultRecord: MusicRecord = {
    id: 0,
    title: "",
    artist: "",
    year: 0,
  };

  const [newRecord, setNewRecord] = useState<MusicRecord>(defaultRecord);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({
      ...newRecord,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div>
      <h1>Record Library</h1>
      <div className="row">
        <div className="col-12 col-lg-6">
          {records.map((record) => (
            <div className="mb-3">
              <RecordItem
                key={record.id}
                record={record}
                onRemove={() => dispatch(removeRecord(record))}
              />
            </div>
          ))}
        </div>

        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">Add Record</div>
            <div className="card-body">
              <TextInput
                label="Title"
                value={newRecord.title}
                onChange={handleInput}
              />
              <TextInput
                label="Artist"
                value={newRecord.artist}
                onChange={handleInput}
              />
              <TextInput
                label="Year"
                value={newRecord.year.toString()}
                onChange={handleInput}
              />
              <button
                className="btn btn-primary my-2"
                onClick={() => {
                  dispatch(addRecord(newRecord));
                  setNewRecord(defaultRecord);
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
