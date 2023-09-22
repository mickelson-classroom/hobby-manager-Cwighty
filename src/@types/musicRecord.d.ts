export interface MusicRecord {
    id: number;
    title: string;
    artist: string;
    year: number;
}

export type RecordContextType = {
    records: MusicRecord[];
    addRecord: (record: MusicRecord) => void;
    updateRecord: (record: MusicRecord) => void;
    deleteRecord: (id: number) => void;
};