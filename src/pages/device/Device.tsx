import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Input, Select, Table } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { firestore } from "../../firebase/config";
import {
  Device,
  setCurrentPage,
  setDevices,
  setSelectedDevice,
} from "../../features/deviceSlice";

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";
const Devices: React.FC = () => {
  const dispatch = useDispatch();

  const devices = useSelector((state: RootState) => state.devices.devices);
  const navigate = useNavigate(); // Sử dụng hook useNavigate thay vì useHistory

  const handleButtonAddClick = () => {
    // Thực hiện chuyển hướng đến trang EditDevice
    navigate("/device/add");
  };
  const handleDeviceClick = (device: Device) => {
    dispatch(setSelectedDevice(device));
  };
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const snapshot = await firestore.collection("devices").get();
        const deviceData = snapshot.docs.map((doc) => doc.data() as Device);
        dispatch(setDevices(deviceData));
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, [dispatch]);

  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "deviceCode",
      key: "deviceCode",
      className: "no-wrap",
    },

    {
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      key: "deviceName",
      className: "no-wrap",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
      className: "no-wrap",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "isActive",
      className: "no-wrap",
      key: "isActive",
      render: (isActive: boolean) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: isActive ? "#35C75A" : "#E73F3F",
              marginRight: "5px",
            }}
          ></div>
          {isActive ? "Hoạt động" : "Ngưng hoạt động"}
        </div>
      ),
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "isConnected",
      className: "no-wrap",
      key: "isConnected",
      render: (isConnected: boolean) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: isConnected ? "#35C75A" : "#E73F3F",
              marginRight: "5px",
            }}
          ></div>
          {isConnected ? "Kết nối" : "Mất kết nối"}
        </div>
      ),
    },

    {
      title: "Dịch vụ sử dụng",
      dataIndex: "service",
      key: "service",
      width: 300,
    },
    {
      title: " ",
      dataIndex: "detail",
      key: "detail",
      render: (text: string, record: Device) => (
        <NavLink
          className="no-wrap"
          to={`/device/detail`}
          onClick={() => handleDeviceClick(record)}
        >
          Chi tiết
        </NavLink>
      ),
    },

    {
      title: " ",
      dataIndex: "edit",
      key: "edit",
      render: (text: string, record: Device) => (
        <NavLink
          className="no-wrap"
          to={`/device/edit`}
          onClick={() => handleDeviceClick(record)}
        >
          Chỉnh sửa
        </NavLink>
      ),
    },
  ];
  const calculateIndex = (index: number): number => index + 1;
  const [activeStatusFilter, setActiveStatusFilter] = useState("Tất cả");
  const [connectionStatusFilter, setConnectionStatusFilter] =
    useState("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchKeywordChange = (value: string) => {
    setSearchKeyword(value);
  };

  const handleChangeActiveStatusFilter = (value: string) => {
    setActiveStatusFilter(value);
  };

  const handleChangeConnectionStatusFilter = (value: string) => {
    setConnectionStatusFilter(value);
  };

  const filteredDevices = devices.filter((device) => {
    const isActiveFilter =
      activeStatusFilter === "Tất cả" ||
      (activeStatusFilter === "Hoạt động" && device.isActive) ||
      (activeStatusFilter === "Ngưng hoạt động" && !device.isActive);

    const isConnectionFilter =
      connectionStatusFilter === "Tất cả" ||
      (connectionStatusFilter === "Kết nối" && device.isConnected) ||
      (connectionStatusFilter === "Mất kết nối" && !device.isConnected);

    const searchFilter =
      searchKeyword === "" ||
      device.deviceCode.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      device.deviceName.toLowerCase().includes(searchKeyword.toLowerCase());
    return isActiveFilter && isConnectionFilter && searchFilter;
  });

  const dataSource = filteredDevices.map((device, index) => ({
    ...device,
    index: calculateIndex(index),
  }));
  const rowsPerPage = 5;
  const currentPage = useSelector(
    (state: RootState) => state.devices.currentPage
  );
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const startIndex: number = (currentPage - 1) * rowsPerPage;
  const [bottom] = useState<TablePaginationPosition>("bottomRight");
  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Danh sách thiết bị</div>
          <div className="status-search">
            <div className="status">
              <div className="pe-4">
                <div>Trạng thái hoạt động</div>
                <Select
                  onChange={handleChangeActiveStatusFilter}
                  size="large"
                  className="select-status"
                  defaultValue="Tất cả"
                  style={{ width: 300 }}
                  options={[
                    { value: "Tất cả", label: "Tất cả" },
                    { value: "Hoạt động", label: "Hoạt động" },
                    { value: "Ngưng hoạt động", label: "Ngưng hoạt động" },
                  ]}
                />
              </div>
              <div className="">
                <div>Trạng thái kết nối </div>
                <Select
                  size="large"
                  className="select-status"
                  defaultValue="Tất cả"
                  style={{ width: 300 }}
                  onChange={handleChangeConnectionStatusFilter}
                  options={[
                    { value: "Tất cả", label: "Tất cả" },
                    { value: "Kết nối", label: "Kết nối" },
                    { value: "Mất kết nối", label: "Mất kết nối" },
                  ]}
                />
              </div>
            </div>
            <div className="search">
              <div className="">Từ khóa</div>
              <div className="search-filter">
                <div className="search-ticket">
                  <Input
                    style={{ width: 300, height: 40 }}
                    type="text"
                    className="form-control"
                    placeholder="Nhập từ khóa"
                    value={searchKeyword}
                    onChange={(e) => handleSearchKeywordChange(e.target.value)}
                  />
                  <Icon
                    icon="iconamoon:search"
                    className="search-ticket-icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="tb-add">
            <div className="tb">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  position: [bottom],
                  current: currentPage,
                  pageSize: rowsPerPage,
                  total: filteredDevices.length,
                  onChange: handlePageChange,
                  className: "custom-pagination",
                }}
              />
            </div>
            <div>
              <button className="button-add" onClick={handleButtonAddClick}>
                <div className="col">
                  <Icon icon="basil:add-solid" className="button-icon" />
                  <p>Thêm thiết bị</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
