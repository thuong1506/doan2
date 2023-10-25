// giveNumberSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface GiveNumber {
  endDate: never;
  startDate: never;
  expirationDate: string;
  expirationTime: string;
  issuanceDate: string;
  issuanceTime: string;
  name: string;
  serviceName: string;
  source: string;
  status: string;
  userEmail: string;
  userPhoneNumber: string;
  stt: string;
}
interface GiveNumberState {
  selectedGiveNumber: any;
  giveNumber: GiveNumber[];
  currentPage: number;
}

const initialState: GiveNumberState = {
  giveNumber: [],
  selectedGiveNumber: null,
  currentPage: 1,
};

const giveNumberSlice = createSlice({
  name: "giveNumber",
  initialState,
  reducers: {
    setGiveNumber: (state, action: PayloadAction<GiveNumber[]>) => {
      state.giveNumber = action.payload;
    },
    setSelectedGiveNumber: (
      state,
      action: PayloadAction<GiveNumber | null>
    ) => {
      state.selectedGiveNumber = action.payload;
    },
    addGiveNumber: (state, action: PayloadAction<GiveNumber>) => {
      state.giveNumber.push(action.payload);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

// export const selectSelectedGiveNumber = (state: RootState) =>
//   state.giveNumber.selectedGiveNumber;

export const {
  setGiveNumber,
  setSelectedGiveNumber,
  addGiveNumber,
  setCurrentPage,
} = giveNumberSlice.actions;

export default giveNumberSlice.reducer;
