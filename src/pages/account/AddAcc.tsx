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
import { addUser, updateUserData } from "../../features/userSlice";

const AddAcc: React.FC = () => {
  const { Option } = Select;

  const navigate = useNavigate();

  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );

  const handleButtonBackClick = () => {
    navigate("/account-settings");
  };

  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [userEmail, setUserEmail] = useState("");

  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const [userRole, setUserRole] = useState("");

  const [username, setUserName] = useState("");

  const [status, setStatus] = useState("");

  const [avatarUser, setAvatarUser] = useState("");

  const handleAddUser = () => {
    const userData = {
      name,
      password,
      userEmail,
      userPhoneNumber,
      userRole,
      username,
      status,
      avatarUser,
    };

    const useId = name;

    firestore
      .collection("users")
      .doc(useId)
      .set(userData)
      .then(() => {
        dispatch(addUser(userData));
        navigate("/account-settings");
      })
      .catch((error) => {
        console.error("Error adding : ", error);
      });
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
                          placeholder="Nhập họ tên"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Số điện thoại:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          placeholder="Nhập số điện thoại"
                          value={userPhoneNumber}
                          onChange={(e) => setUserPhoneNumber(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Email:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          placeholder="Nhập email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Vai trò:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Select
                          placeholder={"Chọn vai trò"}
                          value={userRole}
                          style={{ width: "100%" }}
                          className="select-status"
                          onChange={(value) => setUserRole(value)}
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
                          placeholder="Nhập tên đăng nhập"
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Mật khẩu:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3 no-wrap">
                        Nhập lại mật khẩu:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          placeholder="Nhập lại mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Tình trạng:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Select
                          value={status}
                          style={{ width: "100%" }}
                          className="select-status"
                          placeholder="Chọn tình trạng"
                          onChange={(value) => setStatus(value)}
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
            <button className="add-btn" onClick={handleAddUser}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAcc;
