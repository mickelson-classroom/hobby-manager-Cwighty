import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Daw } from "../../@types/daw";

const BASE_URL = "http://localhost:5000/api/store?key=daws";

interface DawsState {
  daws: Daw[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}

const initialState: DawsState = {
  daws: [],
  status: "idle",
  error: "",
};

export const fetchDaws = createAsyncThunk<Daw[], void>(
  "daw/fetchDaw",
  async () => {
    const response = await axios.get<{ daws: Daw[] }>(BASE_URL);
    return response.data.daws;
  }
);

export const createDaw = createAsyncThunk<Daw, Daw>(
  "daw/createDaw",
  async (newDaw: Daw) => {
    try {
      const currentData = await axios.get<{ daws: Daw[] }>(BASE_URL);
      const updatedDaws = [...currentData.data.daws, newDaw];
      await axios.post(BASE_URL, { daws: updatedDaws });
      return newDaw;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.error(
          "Resource not found at BASE_URL, posting with just the new Daw."
        );
        const updatedDaws = [newDaw];
        await axios.post(BASE_URL, { daws: updatedDaws });
        return newDaw; // Return the newDaw in case of a 404 error
      } else {
        throw error;
      }
    }
  }
);

export const updateDaw = createAsyncThunk<Daw, Daw>(
  "daw/updateDaw",
  async (updatedDaw: Daw) => {
    const currentData = await axios.get<{ daws: Daw[] }>(BASE_URL);
    const updatedDaws = currentData.data.daws.map((daw) =>
      daw.id === updatedDaw.id ? updatedDaw : daw
    );

    await axios.post(BASE_URL, { daws: updatedDaws });
    return updatedDaw;
  }
);

export const deleteDaw = createAsyncThunk<string | Daw, Daw>(
  "daw/deleteDaw",
  async (dawToDelete: Daw) => {
    const currentData = await axios.get<{ daws: Daw[] }>(BASE_URL);
    const updatedDaws = currentData.data.daws.filter(
      (daw) => daw.id !== dawToDelete.id
    );

    await axios.post(BASE_URL, { daws: updatedDaws });
    return dawToDelete;
  }
);

const dawsSlice = createSlice({
  name: "daws",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDaws.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDaws.fulfilled, (state, action: PayloadAction<Daw[]>) => {
        state.status = "succeeded";
        state.daws = action.payload;
      })
      .addCase(fetchDaws.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "";
      })

      .addCase(createDaw.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDaw.fulfilled, (state, action: PayloadAction<Daw>) => {
        state.status = "succeeded";
        state.daws.push(action.payload);
      })
      .addCase(createDaw.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "";
      })

      .addCase(updateDaw.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDaw.fulfilled, (state, action: PayloadAction<Daw>) => {
        state.status = "succeeded";
        const index = state.daws.findIndex(
          (daw) => daw.id === action.payload.id
        );
        if (index !== -1) {
          state.daws[index] = action.payload;
        }
      })
      .addCase(updateDaw.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "";
      })

      .addCase(deleteDaw.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteDaw.fulfilled,
        (state, action: PayloadAction<Daw | string>) => {
          if (typeof action.payload !== "string") {
            const dawPayload = action.payload as Daw;
            state.status = "succeeded";
            state.daws = state.daws.filter((daw) => daw.id !== dawPayload.id);
          } else {
            state.status = "failed";
            console.log("Could not delete:", action.payload);
          }
        }
      )
      .addCase(deleteDaw.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "";
      });
  },
});

export default dawsSlice.reducer;

export const selectAllDaws = (state: DawsState) => state.daws;
export const getDawsError = (state: DawsState) => state.error;
export const getDawsStatus = (state: DawsState) => state.status;
