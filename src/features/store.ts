import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./userSlice";
import deviceReducer from "./deviceSlice";
import serviceReducer from "./serviceSlice";
import giveNumberReducer from "./giveNumberSlice";
import roleReducer from "./roleSlice";
import popoverReducer from "./popoverSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedDeviceReducer = persistReducer(persistConfig, deviceReducer);
const persistedServiceReducer = persistReducer(persistConfig, serviceReducer);
const persistedGiveNumberReducer = persistReducer(
  persistConfig,
  giveNumberReducer
);
const persistedRoleReducer = persistReducer(persistConfig, roleReducer);

const store = configureStore({
  reducer: {
    popover: popoverReducer,
    user: persistedReducer,
    devices: persistedDeviceReducer,
    services: persistedServiceReducer,
    giveNumber: persistedGiveNumberReducer,
    roles: persistedRoleReducer,
  },
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
