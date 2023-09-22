import { useContext } from "react";
import { RecordContext } from "../../context/recordContext";
import { RecordContextType } from "../../@types/musicRecord";
import { RecordItem } from "./RecordItem";

export const RecordLibrary = () => {
  const { records, deleteRecord } = useContext(
    RecordContext
  ) as RecordContextType;
  return (
    <div>
      <h1>Record Library</h1>
      {records.map((record) => (
        <div>
          <RecordItem
            key={record.id}
            record={record}
            onRemove={() => deleteRecord(record.id)}
          />
        </div>
      ))}

      <div className="card">
        <div className="card-header">Add Record</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="artist">Artist</label>
              <input type="text" id="artist" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input type="text" id="year" className="form-control" />
            </div>
            <button className="btn btn-primary my-2">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};
