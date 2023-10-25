import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select, Space } from "antd";

import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { updateDeviceData } from "../../features/deviceSlice";
import { firestore } from "../../firebase/config";

const EditDevice: React.FC = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const dispatch = useDispatch();
  const selectedDevice = useSelector(
    (state: RootState) => state.devices.selectedDevice
  );

  const handleButtonBackClick = () => {
    navigate("/device");
  };
  const [updatedDeviceData, setUpdatedDeviceData] = useState(selectedDevice);

  const handleUpdateDevice = () => {
    // Gửi action để cập nhật dữ liệu trong Redux Toolkit
    dispatch(updateDeviceData(updatedDeviceData));

    // Cập nhật dữ liệu lên Firestore dựa trên deviceCode
    const deviceRef = firestore
      .collection("devices")
      .where("deviceCode", "==", selectedDevice.deviceCode);
    deviceRef
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 1) {
          const doc = querySnapshot.docs[0];
          doc.ref
            .update(updatedDeviceData)
            .then(() => {
              console.log("Device data updated successfully on Firestore.");
              // Xử lý cập nhật thành công (nếu cần)
              navigate("/device");
            })
            .catch((error) => {
              console.error("Error updating device data on Firestore: ", error);
              // Xử lý lỗi (nếu cần)
            });
        } else {
          console.error("Device document not found.");
          // Xử lý trường hợp không tìm thấy tài liệu
        }
      })
      .catch((error) => {
        console.error("Error querying device document: ", error);
        // Xử lý lỗi (nếu cần)
      });
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setUpdatedDeviceData((prevDeviceData: any) => ({
      ...prevDeviceData,
      [fieldName]: value,
    }));
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
                          value={updatedDeviceData.deviceCode}
                          onChange={(e) =>
                            handleInputChange("deviceCode", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        Loại thiết bị:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input value={selectedDevice.deviceType} />
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
                          value={updatedDeviceData.deviceName}
                          onChange={(e) =>
                            handleInputChange("deviceName", e.target.value)
                          }
                        />
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
                          value={updatedDeviceData.ipAddress}
                          onChange={(e) =>
                            handleInputChange("ipAddress", e.target.value)
                          }
                        />
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
                          value={updatedDeviceData.service}
                          size="large"
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="Chọn dịch vụ"
                          onChange={(value) =>
                            handleInputChange("service", value)
                          }
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
            <button className="add-btn" onClick={handleUpdateDevice}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDevice;
