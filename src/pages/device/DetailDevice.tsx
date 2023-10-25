import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Input, Select } from "antd";

import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { Icon } from "@iconify/react";
import { firestore } from "../../firebase/config";
import { Device, setSelectedDevice } from "../../features/deviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";

const DetailDevice: React.FC = () => {
  const dispatch = useDispatch();

  const selectedDevice = useSelector(
    (state: RootState) => state.devices.selectedDevice
  );

  const navigate = useNavigate(); // Sử dụng hook useNavigate thay vì useHistory

  const handleButtonEditClick = () => {
    // Thực hiện chuyển hướng đến trang EditDevice
    navigate("/device/edit");
  };

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      if (selectedDevice) {
        try {
          const response = await fetch(
            `/api/devices/${selectedDevice.deviceCode}`
          );
          const deviceDetails = await response.json();
          dispatch(setSelectedDevice(deviceDetails));
        } catch (error) {
          console.error("Error fetching device details:", error);
        }
      }
    };

    fetchDeviceDetails();
  }, [dispatch, selectedDevice]);

  if (!selectedDevice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Quản lý thiết bị</div>
          <div className="detail-button">
            <div className="detail-device">
              <div className="detail-device-content">
                <div className="title-detail-device">Thông tin thiết bị</div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Mã thiết bị:</div>
                      <div className="col">{selectedDevice.deviceCode}</div>
                    </div>
                  </div>
                  <div className="col">
                    {" "}
                    <div className="row">
                      <div className="col-3 label-text">Loại thiết bị:</div>
                      <div className="col">{selectedDevice.deviceType}</div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Tên thiết bị:</div>
                      <div className="col">{selectedDevice.deviceName}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Tên đăng nhập:</div>
                      <div className="col">1</div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Địa chỉ IP:</div>
                      <div className="col">{selectedDevice.ipAddress}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Mật khẩu:</div>
                      <div className="col">1</div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="label-text">Dịch vụ sử dụng:</div>
                      <div className="pt-2">{selectedDevice.service}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="button-add" onClick={handleButtonEditClick}>
              <div className="col">
                <Icon icon="fa6-solid:square-pen" className="button-icon" />
                <p>Cập nhật thiết bị</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDevice;
