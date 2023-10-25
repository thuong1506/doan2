import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Service {
  serviceCode: string;
  serviceName: string;
  description: string;
  isActive: boolean;
}

interface ServiceState {
  selectedService: any;
  services: Service[];
}

const initialState: ServiceState = {
  services: [],
  selectedService: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<Service | null>) => {
      state.selectedService = action.payload;
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.services.push(action.payload);
    },
    updateServiceData: (state, action: PayloadAction<ServiceState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  setServices,
  setSelectedService,
  updateServiceData,
  addService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
