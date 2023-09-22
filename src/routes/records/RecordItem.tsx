import { MusicRecord } from "../../@types/musicRecord";

export const RecordItem = ({
  record,
  onRemove,
}: {
  record: MusicRecord;
  onRemove: () => void;
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <button className="btn btn-close" onClick={onRemove} />
      </div>
      <div className="card-body">
        <h3>{record.title}</h3>
        <p>{record.artist}</p>
        <p>{record.year}</p>
      </div>
    </div>
  );
};
