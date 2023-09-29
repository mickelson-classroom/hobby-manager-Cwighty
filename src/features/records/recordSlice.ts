import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MusicRecord } from "../../@types/musicRecord";
import { Option } from "../../components/inputs/OptionInput";

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
      genre: "Progressive Rock",
    },
    {
      id: 2,
      title: "The Wall",
      artist: "Pink Floyd",
      year: 1979,
      genre: "Progressive Rock",
    },
    {
      id: 3,
      title: "Wish You Were Here",
      artist: "Pink Floyd",
      year: 1975,
      genre: "Progressive Rock",
    },
    {
      id: 4,
      title: "Abbey Road",
      artist: "The Beatles",
      year: 1969,
      genre: "Rock",
    },
    {
      id: 5,
      title: "Revolver",
      artist: "The Beatles",
      year: 1966,
      genre: "Rock",
    },
  ],
};

export const genreOptions: Option[] = [
  { value: "Progressive Rock", label: "Progressive Rock" },
  { value: "Rock", label: "Rock" },
  { value: "Jazz", label: "Jazz" },
  { value: "Blues", label: "Blues" },
  { value: "Classical", label: "Classical" },
  { value: "Country", label: "Country" },
  { value: "Electronic", label: "Electronic" },
  { value: "Folk", label: "Folk" },
  { value: "Hip Hop", label: "Hip Hop" },
  { value: "Pop", label: "Pop" },
  { value: "R&B", label: "R&B" },
  { value: "Soul", label: "Soul" },
  { value: "Reggae", label: "Reggae" },
  { value: "World", label: "World" },
];

export const recordSlice = createSlice({
  name: "recordStore",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<MusicRecord>) => {
      const maxId = Math.max(...state.records.map((record) => record.id));
      action.payload.id = maxId + 1;
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
