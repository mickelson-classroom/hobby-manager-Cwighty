export interface MusicRecord {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: string;
  image?: string?;
}

export type RecordContextType = {
  records: MusicRecord[];
  addRecord: (_record: MusicRecord) => void;
  updateRecord: (_record: MusicRecord) => void;
  deleteRecord: (_id: number) => void;
};
