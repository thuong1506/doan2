import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Input, Select, Space } from "antd";

import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { firestore } from "../../firebase/config";
import {
  Device,
  addDevice,
  setSelectedDevice,
} from "../../features/deviceSlice";
import { useDispatch, useSelector } from "react-redux";

const AddDevice: React.FC = () => {
  const { Option } = Select;

  const navigate = useNavigate();

  const handleButtonBackClick = () => {
    navigate("/device");
  };

  const dispatch = useDispatch();

  const [deviceCode, setDeviceCode] = useState("");

  const [deviceName, setDeviceName] = useState("");

  const [deviceType, setDeviceType] = useState("");

  const [ipAddress, setIpAddress] = useState("");

  const [isActive, setIsActive] = useState(false);

  const [isConnected, setIsConnected] = useState(false);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleAddDevice = () => {
    const deviceData = {
      deviceCode,
      deviceName,
      deviceType,
      ipAddress,
      isActive,
      isConnected,
      service: selectedServices.join(", "), // Gộp các dịch vụ thành chuỗi
    };

    // Tạo một ID mới dựa trên deviceCode
    const deviceId = deviceCode;

    // Gửi đối tượng thiết bị mới đến Firestore
    firestore
      .collection("devices")
      .doc(deviceId) // Sử dụng deviceId làm ID của tài liệu
      .set(deviceData) // Sử dụng hàm .set() thay vì .add() để xác định ID của tài liệu
      .then(() => {
        dispatch(addDevice(deviceData));
        navigate("/device");
      })
      .catch((error) => {
        console.error("Error adding device: ", error);
        // Xử lý lỗi, có thể hiển thị thông báo lỗi tùy ý
      });
  };

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
                      <div className="col-3">
                        Mã thiết bị:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={deviceCode}
                          onChange={(e) => setDeviceCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    {" "}
                    <div className="row">
                      <div className="col-3">
                        Loại thiết bị:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Select
                          style={{ width: "100%" }}
                          className="select-status"
                          placeholder="Chọn loại thiết bị"
                          onChange={(value) => setDeviceType(value)}
                          options={[
                            { value: "Kiosk", label: "Kiosk" },
                            {
                              value: "Display counter",
                              label: "Display counter",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        Tên thiết bị:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={deviceName}
                          onChange={(e) => setDeviceName(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        Tên đăng nhập:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input></Input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        Địa chỉ IP:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={ipAddress}
                          onChange={(e) => setIpAddress(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        Mật khẩu:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input></Input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="">
                        Dịch vụ sử dụng:<span className="red">*</span>
                      </div>
                      <div className="pt-2">
                        <Select
                          size="large"
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="Chọn dịch vụ"
                          onChange={(value) => setSelectedServices(value)}
                          optionLabelProp="label"
                        >
                          <Option value="Khám tim mạch" label="Khám tim mạch">
                            <Space>Khám tim mạch</Space>
                          </Option>
                          <Option
                            value="Khám sản phụ khoa"
                            label="Khám sản phụ khoa"
                          >
                            <Space>Khám sản phụ khoa</Space>
                          </Option>
                          <Option
                            value="Khám răng hàm mặt"
                            label="Khám răng hàm mặt"
                          >
                            <Space>Khám răng hàm mặt</Space>
                          </Option>
                          <Option
                            value="Khám tai mũi họng"
                            label="Khám tai mũi họng"
                          >
                            <Space>Khám tai mũi họng</Space>
                          </Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="button-back-add">
            <button className="back-btn" onClick={handleButtonBackClick}>
              Hủy bỏ
            </button>
            <button className="add-btn" onClick={handleAddDevice}>
              Thêm thiết bị
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDevice;
