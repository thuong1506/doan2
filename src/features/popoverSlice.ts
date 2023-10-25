// popoverSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ThongBao {
  userName: string;
  time: string;
}

interface PopoverState {
  thongBao: ThongBao[];
}

const initialState: PopoverState = {
  thongBao: [],
};

const popoverSlice = createSlice({
  name: "popover",
  initialState,
  reducers: {
    themThongBao(state, action) {
      state.thongBao.push(action.payload);
    },
  },
});

export const { themThongBao } = popoverSlice.actions;
export default popoverSlice.reducer;
