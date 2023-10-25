import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Menu, Modal } from "antd";

import "./components.css";
import { SettingOutlined } from "@ant-design/icons";

const Navbar: React.FC = () => {
  const { SubMenu } = Menu;
  const location = useLocation();
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);
  const [isSubMenuSelected, setIsSubMenuSelected] = useState(false);

  useEffect(() => {
    // Xác định mục menu được chọn dựa trên URL hiện tại
    const pathname = location.pathname;
    setSelectedMenuItem(pathname);

    setIsSubMenuSelected(
      pathname.startsWith("/role-settings") ||
        pathname.startsWith("/account-settings") ||
        pathname.startsWith("/diary-settings")
    );
  }, [location]);

  const handleSubMenuClick = () => {
    setSubMenuVisible(true);
  };

  return (
    <div className="menu">
      <div className="navbar">
        <div className="col">
          <div className="logo">
            <NavLink to="/dashboard">
              <img src="/img/Group.svg" alt="Logo" />
            </NavLink>
          </div>

          <Menu mode="vertical" style={{ width: 256 }} className="navigation">
            <Menu.Item
              key="dashboard"
              className={`menu-item ${
                selectedMenuItem === "/dashboard" ? "selected" : ""
              }`}
            >
              <NavLink to="/dashboard">
                <Icon icon="humbleicons:dashboard" /> Dashboard
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="device"
              className={`menu-item ${
                selectedMenuItem.startsWith("/device") ? "selected" : ""
              }`}
            >
              <NavLink to="/device">
                <Icon icon="solar:monitor-outline" /> Thiết bị
              </NavLink>
            </Menu.Item>

            <Menu.Item
              key="services"
              className={`menu-item ${
                selectedMenuItem.startsWith("/service") ? "selected" : ""
              }`}
            >
              <NavLink to="/service">
                <Icon icon="ion:chatbubbles-outline" /> Dịch vụ
              </NavLink>
            </Menu.Item>

            <Menu.Item
              key="givenumber"
              className={`menu-item ${
                selectedMenuItem.startsWith("/givenumber") ? "selected" : ""
              }`}
            >
              <NavLink to="/givenumber">
                <Icon icon="lucide:layers" /> Cấp số
              </NavLink>
            </Menu.Item>

            <Menu.Item
              key="reports"
              className={`menu-item ${
                selectedMenuItem === "/reports" ? "selected" : ""
              }`}
            >
              <NavLink to="/reports">
                <Icon icon="fluent-mdl2:report-document" /> Báo cáo
              </NavLink>
            </Menu.Item>
            <Menu.SubMenu
              className={`menu-item-sub ${isSubMenuSelected ? "selected" : ""}`}
              key="3"
              title={
                <span>
                  <Icon icon="ri:settings-line" /> Cài đặt hệ thống
                </span>
              }
              onTitleClick={handleSubMenuClick}
            >
              <Menu mode="vertical" className="sub-menu-2">
                <Menu.Item key="roleSettings" className="menu-item">
                  <NavLink to="/role-settings">Quản lý vai trò</NavLink>
                </Menu.Item>
                <Menu.Item key="accountSettings" className="menu-item">
                  <NavLink to="/account-settings">Quản lý tài khoản</NavLink>
                </Menu.Item>
                <Menu.Item key="userSettings" className="menu-item">
                  <NavLink to="/diary-settings">Nhật ký người dùng</NavLink>
                </Menu.Item>
              </Menu>
            </Menu.SubMenu>

            <div className="menu-footer">
              <Menu.Item key="logout">
                <NavLink to="/logout">
                  <Icon icon="lucide:log-out" className="me-2" />
                  Đăng xuất
                </NavLink>
              </Menu.Item>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
