import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Checkbox, Input, Select, Space } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { firestore } from "../../firebase/config";
import { RootState } from "../../features/store";
import { updateUserData } from "../../features/userSlice";

const EditAcc: React.FC = () => {
  const { Option } = Select;

  const navigate = useNavigate();

  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );

  const handleButtonBackClick = () => {
    navigate("/account-settings");
  };

  const dispatch = useDispatch();

  const [updatedUserData, setUpdatedUserData] = useState(selectedUser);
  const [selectedRole, setSelectedRole] = useState(selectedUser);
  const [statusType, setStatusType] = useState(selectedUser);

  const handleUpdateUser = () => {
    dispatch(updateUserData(updatedUserData));

    const userRef = firestore
      .collection("users")
      .where("username", "==", selectedUser.username);
    userRef
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 1) {
          const doc = querySnapshot.docs[0];
          doc.ref
            .update(updatedUserData)
            .then(() => {
              console.log(" data updated successfully on Firestore.");
              // Xử lý cập nhật thành công (nếu cần)
              navigate("/account-settings");
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
    if (fieldName === "userRole") {
      setSelectedRole(value); // Update the selected role
    } else if (fieldName === "status") {
      setStatusType(value); // Update the status
    }
    setUpdatedUserData((prevUserData: any) => ({
      ...prevUserData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Quản lý tài khoản</div>
          <div className="detail-button">
            <div className="detail-service">
              <div className="detail-device-content">
                <div className="title-detail-device">Thông tin tài khoản</div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        Họ tên:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={updatedUserData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Số điện thoại:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={updatedUserData.userPhoneNumber}
                          onChange={(e) =>
                            handleInputChange("userPhoneNumber", e.target.value)
                          }
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Email:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={updatedUserData.userEmail}
                          onChange={(e) =>
                            handleInputChange("userEmail", e.target.value)
                          }
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Vai trò:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Select
                          value={updatedUserData.userRole}
                          style={{ width: "100%" }}
                          className="select-status"
                          onChange={(value) =>
                            handleInputChange("userRole", value)
                          }
                          options={[
                            { value: "Giám đốc", label: "Giám đốc" },
                            {
                              value: "Quản lý",
                              label: "Quản lý",
                            },
                            { value: "Bác sĩ", label: "Bác sĩ" },
                            { value: "Y tá", label: "Y tá" },
                            { value: "Thực tập sinh", label: "Thực tập sinh" },
                          ]}
                        />
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
                    <div className="row">
                      <div className="col-3">
                        Tên đăng nhập:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={updatedUserData.username}
                          onChange={(e) =>
                            handleInputChange("username", e.target.value)
                          }
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Mật khẩu:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={updatedUserData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3 no-wrap">
                        Nhập lại mật khẩu:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          value={updatedUserData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Tình trạng:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Select
                          value={updatedUserData.status}
                          style={{ width: "100%" }}
                          className="select-status"
                          placeholder="Chọn tình trạng"
                          onChange={(value) =>
                            handleInputChange("status", value)
                          }
                          options={[
                            { value: "Hoạt động", label: "Hoạt động" },
                            {
                              value: "Ngưng hoạt động",
                              label: "Ngưng hoạt động",
                            },
                          ]}
                        />
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
            <button className="add-btn" onClick={handleUpdateUser}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAcc;
