import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Login from "./pages/Login";
import { store, persistor } from "./features/store";
import ForgotPassword from "./pages/ForgotPassword";
import DashBoard from "./pages/DashBoard";
import MenuTest from "./test/MenuTest";
import Device from "./pages/device/Device";
import { PersistGate } from "redux-persist/integration/react";
import DetailDevice from "./pages/device/DetailDevice";
import EditDevice from "./pages/device/EditDevice";
import AddDevice from "./pages/device/AddDevice";
import Services from "./pages/service/Services";
import EditService from "./pages/service/EditService";
import AddService from "./pages/service/AddService";
import DetailService from "./pages/service/DetailService";
import GiveNumber from "./pages/giveNumber/GiveNumber";
import NewGiveNumber from "./pages/giveNumber/NewGiveNumber";
import DetailGiveNumber from "./pages/giveNumber/DetailGiveNumber";
import Reports from "./pages/giveNumber/Report";
import UserInfor from "./pages/user/UserInfor";
import RoleSettings from "./pages/role/RoleMana";
import AccountSettings from "./pages/account/AccMana";
import DiarySettings from "./pages/diary/DiaryMana";
import AddRoles from "./pages/role/AddRole";
import EditRoles from "./pages/role/EditRole";
import AddAcc from "./pages/account/AddAcc";
import EditAcc from "./pages/account/EditAcc";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userinfor" element={<UserInfor />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/menu" element={<MenuTest />} />
          <Route path="/device" element={<Device />} />
          <Route path="/device/detail" element={<DetailDevice />} />
          <Route path="/device/edit" element={<EditDevice />} />
          <Route path="/device/add" element={<AddDevice />} />
          <Route path="/service" element={<Services />} />
          <Route path="/service/detail" element={<DetailService />} />
          <Route path="/service/edit" element={<EditService />} />
          <Route path="/service/add" element={<AddService />} />
          <Route path="/givenumber" element={<GiveNumber />} />
          <Route path="/givenumber/newgivenumber" element={<NewGiveNumber />} />
          <Route
            path="/givenumber/detailgivenumber"
            element={<DetailGiveNumber />}
          />
          <Route path="/reports" element={<Reports />} />
          <Route path="/role-settings" element={<RoleSettings />} />
          <Route path="/role-settings/addrole" element={<AddRoles />} />
          <Route path="/role-settings/editrole" element={<EditRoles />} />

          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/account-settings/addacc" element={<AddAcc />} />
          <Route path="/account-settings/editacc" element={<EditAcc />} />

          <Route path="/diary-settings" element={<DiarySettings />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
