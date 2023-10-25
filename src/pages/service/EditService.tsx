import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Checkbox, Input, Select, Space } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { Icon } from "@iconify/react";
import TextArea from "antd/es/input/TextArea";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { firestore } from "../../firebase/config";
import { updateServiceData } from "../../features/serviceSlice";

const EditService: React.FC = () => {
  const { Option } = Select;

  const navigate = useNavigate();

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleButtonBackClick = () => {
    navigate("/service");
  };

  const dispatch = useDispatch();

  const selectedService = useSelector(
    (state: RootState) => state.services.selectedService
  );

  const [updatedServiceData, setUpdatedServiceData] = useState(selectedService);

  const handleUpdateService = () => {
    // Gửi action để cập nhật dữ liệu trong Redux Toolkit
    dispatch(updateServiceData(updatedServiceData));

    const serviceRef = firestore
      .collection("services")
      .where("serviceCode", "==", selectedService.serviceCode);
    serviceRef
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 1) {
          const doc = querySnapshot.docs[0];
          doc.ref
            .update(updatedServiceData)
            .then(() => {
              console.log(" data updated successfully on Firestore.");
              // Xử lý cập nhật thành công (nếu cần)
              navigate("/service");
            })
            .catch((error) => {
              console.error("Error updating  data on Firestore: ", error);
              // Xử lý lỗi (nếu cần)
            });
        } else {
          console.error(" document not found.");
          // Xử lý trường hợp không tìm thấy tài liệu
        }
      })
      .catch((error) => {
        console.error("Error querying  document: ", error);
        // Xử lý lỗi (nếu cần)
      });
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setUpdatedServiceData((prevServiceData: any) => ({
      ...prevServiceData,
      [fieldName]: value,
    }));
  };
  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Quản lý dịch vụ</div>
          <div className="detail-button">
            <div className="detail-service">
              <div className="detail-device-content">
                <div className="title-detail-device">Thông tin dịch vụ</div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      {" "}
                      <div className="col-3">
                        Mã dịch vụ:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={updatedServiceData.serviceCode}
                          onChange={(e) =>
                            handleInputChange("serviceCode", e.target.value)
                          }
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      {" "}
                      <div className="col-3">
                        Tên dịch vụ:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={updatedServiceData.serviceName}
                          onChange={(e) =>
                            handleInputChange("serviceName", e.target.value)
                          }
                        ></Input>
                      </div>
                    </div>
                    <div className="title-detail-device pt-3">
                      Quy tắc cấp số
                    </div>
                    <div className="row pt-3">
                      <div className="col-4">
                        <Checkbox onChange={onChange}>Tăng tự động từ</Checkbox>
                      </div>

                      <div className="col flex-input">
                        <Input value={"0001"} style={{ width: 60 }}></Input>{" "}
                        <span className="den">đến</span>
                        <Input value={"9999"} style={{ width: 60 }}></Input>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-4">
                        {" "}
                        <Checkbox onChange={onChange}>Prefix:</Checkbox>
                      </div>

                      <div className="col flex-input">
                        <Input value={"0001"} style={{ width: 60 }}></Input>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-4">
                        {" "}
                        <Checkbox onChange={onChange}>Surfix:</Checkbox>
                      </div>

                      <div className="col flex-input">
                        <Input value={"0001"} style={{ width: 60 }}></Input>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-4">
                        {" "}
                        <Checkbox onChange={onChange}>Reset mỗi ngày:</Checkbox>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col">
                        <span className="red">* </span>
                        <span className="xam">
                          Là trường thông tin bắt buộc
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="col-3">
                      Mô tả:<span className="red">*</span>
                    </div>
                    <div className="mt-2">
                      <TextArea
                        value={updatedServiceData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                      ></TextArea>
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
            <button className="add-btn" onClick={handleUpdateService}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;
