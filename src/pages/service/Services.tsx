import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { DatePicker, DatePickerProps, Input, Select, Table } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { firestore } from "../../firebase/config";
import {
  Service,
  setSelectedService,
  setServices,
} from "../../features/serviceSlice";
import { setCurrentPage } from "../../features/deviceSlice";

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";
const Services: React.FC = () => {
  const dispatch = useDispatch();

  const services = useSelector((state: RootState) => state.services.services);
  const navigate = useNavigate();

  const handleButtonAddClick = () => {
    navigate("/service/add");
  };
  const handleServiceClick = (service: Service) => {
    dispatch(setSelectedService(service));
  };

  useEffect(() => {
    const fetchServices = async () => {
      // Thay thế fetchDevices bằng fetchServices
      try {
        const snapshot = await firestore.collection("services").get();
        const serviceData = snapshot.docs.map((doc) => doc.data() as Service);
        dispatch(setServices(serviceData));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [dispatch]);

  const columns = [
    {
      title: "Mã dịch vụ",
      dataIndex: "serviceCode",
      key: "serviceCode",
      className: "no-wrap",
      width: 300,
    },

    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      className: "no-wrap",
      width: 300,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      className: "no-wrap",
      width: 300,
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "isActive",
      className: "no-wrap",
      key: "isActive",
      width: 300,
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
      title: " ",
      dataIndex: "detail",
      key: "detail",
      width: 300,
      render: (text: string, record: Service) => (
        <NavLink
          className="no-wrap"
          to={`/service/detail`}
          onClick={() => handleServiceClick(record)}
        >
          Chi tiết
        </NavLink>
      ),
    },

    {
      title: " ",
      dataIndex: "edit",
      key: "edit",
      width: 300,
      render: (text: string, record: Service) => (
        <NavLink
          className="no-wrap"
          to={`/service/edit`}
          onClick={() => handleServiceClick(record)}
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

  const filteredServices = services.filter((service) => {
    const isActiveFilter =
      activeStatusFilter === "Tất cả" ||
      (activeStatusFilter === "Hoạt động" && service.isActive) ||
      (activeStatusFilter === "Ngưng hoạt động" && !service.isActive);

    const searchFilter =
      searchKeyword === "" ||
      service.serviceCode.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      service.serviceName.toLowerCase().includes(searchKeyword.toLowerCase());
    return isActiveFilter && searchFilter;
  });

  const dataSource = filteredServices.map((service, index) => ({
    ...service,
    index: calculateIndex(index),
  }));
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

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
          <div className="title">Quản lý dịch vụ</div>
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
                <div>Chọn thời gian</div>
                <div className="row">
                  <div className="col">
                    {" "}
                    <DatePicker
                      onChange={onChange}
                      placeholder="Chọn ngày"
                      size="large"
                    />
                  </div>
                  <div className="col">
                    {" "}
                    <DatePicker
                      onChange={onChange}
                      placeholder="Chọn ngày"
                      size="large"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="search">
              <div className="">Từ khóa</div>
              <div className="search-filter">
                <div className="search-ticket">
                  <Input
                    value={searchKeyword}
                    onChange={(e) => handleSearchKeywordChange(e.target.value)}
                    style={{ width: 300, height: 40 }}
                    type="text"
                    className="form-control"
                    placeholder="Nhập từ khóa"
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
                  total: filteredServices.length,
                  onChange: handlePageChange,
                  className: "custom-pagination",
                }}
              />
            </div>
            <div>
              <button className="button-add" onClick={handleButtonAddClick}>
                <div className="col">
                  <Icon icon="basil:add-solid" className="button-icon" />
                  <p>Thêm dịch vụ</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
