import { createContext, useEffect, useState } from "react";
import { MusicRecord, RecordContextType } from "../@types/musicRecord";

const recordKey = 'storedRecords';

const saveToLocalStorage = (records: MusicRecord[]) => {
    const stringified = JSON.stringify(records);
    localStorage.setItem(recordKey, stringified);
}

const readFromLocalStorage = (): MusicRecord[] => {
    const stringified = localStorage.getItem(recordKey);
    if (stringified === null) {
        return [{
            id: 1,
            title: "The Dark Side of the Moon",
            artist: "Pink Floyd",
            year: 1973,
        }];
    }
    return JSON.parse(stringified);
}

export const RecordContext = createContext<RecordContextType | null>(null);

export const RecordProvider = ({ children }: { children: React.ReactNode }) => {
    const [records, setRecords] = useState<MusicRecord[]>(readFromLocalStorage());

    useEffect(() => {
        const recordsFromStorage = readFromLocalStorage();
        setRecords(recordsFromStorage);
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            saveToLocalStorage(records);
        }, 1000);
        return () => {
            clearTimeout(handler);
        }
    }, [records]);

    const addRecord = (newRecord: MusicRecord) => {
        const id = Math.max(...records.map((record) => record.id)) + 1;
        newRecord.id = id;

        const newRecords = [...records, newRecord];
        setRecords(newRecords);
    };

    const updateRecord = (updatedRecord: MusicRecord) => {
        setRecords(
            (oldRecords) =>
                oldRecords.map((record) =>
                    record.id === updatedRecord.id ? updatedRecord : record
                ));
    };

    const deleteRecord = (id: number) => {
        setRecords((oldRecords) => oldRecords.filter((record) => record.id !== id));
    };

    return (
        <RecordContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
            {children}
        </RecordContext.Provider>
    );
}
    

