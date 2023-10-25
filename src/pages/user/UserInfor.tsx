import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Avatar, Checkbox, Input, Modal, Select, Space } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import moment from "moment";
import { firestore } from "../../firebase/config";
import { useSelector } from "react-redux";

const UserInfor: React.FC = () => {
  const { Option } = Select;

  const navigate = useNavigate();

  const currentUser = useSelector((state: any) => state.user.currentUser);

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="detail-button">
            <div className="detail-user">
              <div className="detail-user-content">
                <div className="row">
                  <div className="col-3">
                    <Avatar
                      src={currentUser.avatarUser}
                      alt="User Avatar"
                      className="user-avatar"
                    />
                    <p className="text-center">
                      <span className="user-name-1">{currentUser.name}</span>
                    </p>
                  </div>
                  <div className="col">
                    <div className="row pt-4">Tên người dùng</div>
                    <div className="row pt-2">
                      <Input
                        style={{ width: 380 }}
                        value={currentUser.name}
                        disabled
                      />
                    </div>
                    <div className="row pt-3">Số điện thoại</div>
                    <div className="row pt-2">
                      <Input
                        style={{ width: 380 }}
                        value={currentUser.userPhoneNumber}
                        disabled
                      />
                    </div>
                    <div className="row pt-3">Email</div>
                    <div className="row pt-2">
                      <Input
                        style={{ width: 380 }}
                        value={currentUser.userEmail}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="row pt-4">Tên đăng nhập</div>
                    <div className="row pt-2">
                      <Input
                        style={{ width: 380 }}
                        value={currentUser.username}
                        disabled
                      />
                    </div>
                    <div className="row pt-3">Mật khẩu</div>
                    <div className="row pt-2">
                      <Input
                        style={{ width: 380 }}
                        value={currentUser.password}
                        disabled
                      />
                    </div>
                    <div className="row pt-3">Vai trò</div>
                    <div className="row pt-2">
                      <Input
                        style={{ width: 380 }}
                        value={currentUser.userRole}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfor;
