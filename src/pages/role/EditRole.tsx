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
import { updateRoleData } from "../../features/roleSlice";

const EditRoles: React.FC = () => {
  const { Option } = Select;

  const selectedRole = useSelector(
    (state: RootState) => state.roles.selectedRole
  );

  const navigate = useNavigate();

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleButtonBackClick = () => {
    navigate("/role-settings");
  };

  const dispatch = useDispatch();

  const [updatedRoleData, setUpdatedRoleData] = useState(selectedRole);

  const handleUpdateRole = () => {
    dispatch(updateRoleData(updatedRoleData));

    const roleRef = firestore
      .collection("roles")
      .where("roleName", "==", selectedRole.roleName);
    roleRef
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 1) {
          const doc = querySnapshot.docs[0];
          doc.ref
            .update(updatedRoleData)
            .then(() => {
              console.log(" data updated successfully on Firestore.");
              // Xử lý cập nhật thành công (nếu cần)
              navigate("/role-settings");
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
    setUpdatedRoleData((prevRoleData: any) => ({
      ...prevRoleData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Danh sách vai trò</div>
          <div className="detail-button">
            <div className="detail-service">
              <div className="detail-device-content">
                <div className="title-detail-device">Thông tin vai trò</div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        Tên vai trò:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <Input
                          placeholder="Nhập tên vai trò"
                          value={updatedRoleData.roleName}
                          onChange={(e) =>
                            handleInputChange("roleName", e.target.value)
                          }
                        ></Input>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <div className="col-3">
                        Mô tả:<span className="red">*</span>
                      </div>
                      <div className="mt-2">
                        <TextArea
                          rows={6}
                          placeholder="Nhập mô tả"
                          value={updatedRoleData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
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
                    <div className="col-3 no-wrap">
                      Phân quyền chức năng:<span className="red">*</span>
                    </div>
                    <div className="mt-2 chuc-nang">
                      <div className="chuc-nang-content">
                        <div className="title-detail-device">
                          Nhóm chức năng A
                        </div>
                        <div className="row pt-3">
                          <div className="col-4">
                            <Checkbox onChange={onChange}>Tất cả</Checkbox>
                            <Checkbox className="pt-2" onChange={onChange}>
                              Chức năng X
                            </Checkbox>
                            <Checkbox className="pt-2" onChange={onChange}>
                              Chức năng Y
                            </Checkbox>
                            <Checkbox className="pt-2" onChange={onChange}>
                              Chức năng Z
                            </Checkbox>
                          </div>
                        </div>
                        <div className="title-detail-device pt-3">
                          Nhóm chức năng B
                        </div>
                        <div className="row pt-3">
                          <div className="col-4">
                            <Checkbox onChange={onChange}>Tất cả</Checkbox>
                            <Checkbox className="pt-2" onChange={onChange}>
                              Chức năng X
                            </Checkbox>
                            <Checkbox className="pt-2" onChange={onChange}>
                              Chức năng Y
                            </Checkbox>
                            <Checkbox className="pt-2" onChange={onChange}>
                              Chức năng Z
                            </Checkbox>
                          </div>
                        </div>
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
            <button className="add-btn" onClick={handleUpdateRole}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoles;
