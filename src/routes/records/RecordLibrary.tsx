import { useContext, useState } from "react";
import { RecordContext } from "../../context/recordContext";
import { MusicRecord, RecordContextType } from "../../@types/musicRecord";
import { RecordItem } from "./RecordItem";
import { TextInput } from "../../components/TextInput";
import { NumberInput } from "../../components/NumberInput";
import { SpinningCircle } from "../../components/svgs/SpinningCircle";

export const RecordLibrary = () => {
  const { records, deleteRecord, addRecord } = useContext(
    RecordContext
  ) as RecordContextType;

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
                onRemove={() => deleteRecord(record.id)}
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
                  addRecord(newRecord);
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
