import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MusicRecord } from "../../@types/musicRecord";

interface RecordState {
  records: MusicRecord[];
}

const initialState: RecordState = {
  records: [
    {
      id: 1,
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      year: 1973,
    },
  ],
};

export const recordSlice = createSlice({
  name: "recordStore",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<MusicRecord>) => {
      state.records.push(action.payload);
    },
    removeRecord: (state, action: PayloadAction<MusicRecord>) => {
      state.records = state.records.filter(
        (record) => record.id !== action.payload.id
      );
    },
    updateRecord: (state, action: PayloadAction<MusicRecord>) => {
      state.records = state.records.map((record) => {
        if (record.id === action.payload.id) {
          return action.payload;
        }
        return record;
      });
    },
  },
});

export const { addRecord, removeRecord, updateRecord } = recordSlice.actions;

export default recordSlice.reducer;
