// deviceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Device {
  deviceCode: string;
  deviceName: string;
  deviceType: string;
  ipAddress: string;
  isActive: boolean;
  isConnected: boolean;
  service: string;
}
interface DeviceState {
  selectedDevice: any;
  devices: Device[];
  currentPage: number;
}

const initialState: DeviceState = {
  devices: [],
  selectedDevice: null,
  currentPage: 1,
};

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
    },
    setSelectedDevice: (state, action: PayloadAction<Device | null>) => {
      state.selectedDevice = action.payload;
    },
    addDevice: (state, action: PayloadAction<Device>) => {
      state.devices.push(action.payload);
    },
    updateDeviceData: (state, action: PayloadAction<DeviceState>) => {
      // Cập nhật dữ liệu của thiết bị từ action.payload
      return {
        ...state,
        ...action.payload,
      };
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const selectSelectedDevice = (state: RootState) =>
  state.devices.selectedDevice;

export const {
  setDevices,
  setSelectedDevice,
  addDevice,
  updateDeviceData,
  setCurrentPage,
} = deviceSlice.actions;

export default deviceSlice.reducer;
