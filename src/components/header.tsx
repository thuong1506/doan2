import React from "react";
import { useSelector } from "react-redux"; // Import useSelector from Redux
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Avatar, Breadcrumb, Button, Popover } from "antd";
import "./components.css";
import { RootState } from "../features/store";

const Header: React.FC = () => {
  const thongBao = useSelector((state: RootState) => state.popover.thongBao);

  const location = useLocation();
  const currentUser = useSelector((state: any) => state.user.currentUser);

  const breadcrumbItems = [];

  if (location.pathname === "/dashboard") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="dashboard" className="breadcrumb-item">
        Dashboard
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/userinfor") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="device" className="breadcrumb-item">
        Thông tin cá nhân
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/device") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="device" className="breadcrumb-item-1">
        Thiết bị
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="device-list" className="breadcrumb-item">
        Danh sách thiết bị
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/service") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="device" className="breadcrumb-item-1">
        Dịch vụ
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="device-list" className="breadcrumb-item">
        Danh sách dịch vụ
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/device/detail") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="device" className="breadcrumb-item-1">
        Thiết bị
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="device-list" className="breadcrumb-item-1">
        <NavLink to={"/device"} className="breadcrumb-item-nav">
          Danh sách thiết bị
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="device-detail" className="breadcrumb-item">
        Chi tiết thiết bị
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/device/edit") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="device" className="breadcrumb-item-1">
        Thiết bị
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="device-list" className="breadcrumb-item-1">
        <NavLink to={"/device"} className="breadcrumb-item-nav">
          Danh sách thiết bị
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="device-edit" className="breadcrumb-item">
        Cập nhật thiết bị
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/device/add") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="device" className="breadcrumb-item-1">
        Thiết bị
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="device-list" className="breadcrumb-item-1">
        <NavLink to={"/device"} className="breadcrumb-item-nav">
          Danh sách thiết bị
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="device-add" className="breadcrumb-item">
        Thêm thiết bị
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/service/add") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="service" className="breadcrumb-item-1">
        Dịch vụ
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-list" className="breadcrumb-item-1">
        <NavLink to={"/service"} className="breadcrumb-item-nav">
          Danh sách dịch vụ
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-add" className="breadcrumb-item">
        Thêm dịch vụ
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/service/detail") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="service" className="breadcrumb-item-1">
        Dịch vụ
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-list" className="breadcrumb-item-1">
        <NavLink to={"/service"} className="breadcrumb-item-nav">
          Danh sách dịch vụ
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-add" className="breadcrumb-item">
        Chi tiết
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/service/edit") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="service" className="breadcrumb-item-1">
        Dịch vụ
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-list" className="breadcrumb-item-1">
        <NavLink to={"/service"} className="breadcrumb-item-nav">
          Danh sách dịch vụ
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-add" className="breadcrumb-item">
        Cập nhật
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/givenumber") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="givenumber" className="breadcrumb-item-1">
        Cấp số
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="givenumber-list" className="breadcrumb-item">
        Danh sách cấp số
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/givenumber/newgivenumber") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="service" className="breadcrumb-item-1">
        Cấp số
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-list" className="breadcrumb-item-1">
        <NavLink to={"/givenumber"} className="breadcrumb-item-nav">
          Danh sách cấp số
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-add" className="breadcrumb-item">
        Cấp số mới
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/givenumber/detailgivenumber") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="service" className="breadcrumb-item-1">
        Cấp số
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-list" className="breadcrumb-item-1">
        <NavLink to={"/givenumber"} className="breadcrumb-item-nav">
          Danh sách cấp số
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-add" className="breadcrumb-item">
        Chi tiết
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/reports") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="reports" className="breadcrumb-item-1">
        Báo cáo
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="reports-list" className="breadcrumb-item">
        Lập báo cáo
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/role-settings") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="reports" className="breadcrumb-item-1">
        Cài đặt hệ thống
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="reports-list" className="breadcrumb-item">
        Quản lý vai trò
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/role-settings/addrole") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="service" className="breadcrumb-item-1">
        Cài đặt hệ thống
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-list" className="breadcrumb-item-1">
        <NavLink to={"/role-settings"} className="breadcrumb-item-nav">
          Quản lý vai trò
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-add" className="breadcrumb-item">
        Thêm vai trò
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/role-settings/editrole") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="service" className="breadcrumb-item-1">
        Cài đặt hệ thống
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-list" className="breadcrumb-item-1">
        <NavLink to={"/role-settings"} className="breadcrumb-item-nav">
          Quản lý vai trò
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-add" className="breadcrumb-item">
        Cập nhật vai trò
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/account-settings") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="reports" className="breadcrumb-item-1">
        Cài đặt hệ thống
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="reports-list" className="breadcrumb-item">
        Quản lý tài khoản
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/account-settings/addacc") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="service" className="breadcrumb-item-1">
        Cài đặt hệ thống
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-list" className="breadcrumb-item-1">
        <NavLink to={"/account-settings"} className="breadcrumb-item-nav">
          Quản lý tài khoản
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-add" className="breadcrumb-item">
        Thêm tài khoản
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/account-settings/editacc") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="service" className="breadcrumb-item-1">
        Cài đặt hệ thống
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-list" className="breadcrumb-item-1">
        <NavLink to={"/account-settings"} className="breadcrumb-item-nav">
          Quản lý tài khoản
        </NavLink>
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="service-add" className="breadcrumb-item">
        Cập nhật tài khoản
      </Breadcrumb.Item>
    );
  } else if (location.pathname === "/diary-settings") {
    breadcrumbItems.push(
      <Breadcrumb.Item key="reports" className="breadcrumb-item-1">
        Cài đặt hệ thống
      </Breadcrumb.Item>,
      <Breadcrumb.Item key="reports-list" className="breadcrumb-item">
        Nhật ký người dùng
      </Breadcrumb.Item>
    );
  }

  return (
    <div className="header">
      <Breadcrumb separator=" ">{breadcrumbItems}</Breadcrumb>
      <div className="notification-avatar">
        <div className="">
          <Popover
            className="noti"
            placement="bottom"
            content={
              <div className="message">
                <div className="title-message">
                  <span>Thông báo</span>
                </div>
                <div className="message-2">
                  {thongBao.map((thongBaoItem, index) => (
                    <div key={index} className="notifi">
                      <p className="noti-1">
                        Người dùng: {thongBaoItem.userName}
                      </p>
                      <p className="noti-2">Thời gian: {thongBaoItem.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
            trigger="click"
          >
            <Button className="notification-icon">
              <Icon icon="ion:notifcations" className="i" />
            </Button>
          </Popover>
        </div>
        <div className="info">
          {currentUser ? (
            <React.Fragment>
              <NavLink to="/userinfor" className="nav-link">
                <Avatar
                  src={currentUser.avatarUser}
                  alt="User Avatar"
                  className="avt"
                />
              </NavLink>
              <div className="welcome">
                <span className="welcome-text">Xin chào</span> <br />
                <NavLink to="/userinfor" className="nav-link">
                  <span className="user-name">{currentUser.name}</span>
                </NavLink>
              </div>
            </React.Fragment>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
