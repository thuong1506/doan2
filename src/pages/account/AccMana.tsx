import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { DatePicker, DatePickerProps, Input, Select, Table } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { firestore } from "../../firebase/config";

import {
  GiveNumber,
  setCurrentPage,
  setGiveNumber,
} from "../../features/giveNumberSlice";

import ExcelJS from "exceljs"; // Import the exceljs library
import FileSaver from "file-saver";
import { SortOrder } from "antd/es/table/interface";
import { User, setSelectedUser, setUsers } from "../../features/userSlice";
import { NavLink, useNavigate } from "react-router-dom";

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

const AccountSettings: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await firestore.collection("users").get();
        const usersData = snapshot.docs.map((doc) => doc.data() as User);

        dispatch(setUsers(usersData));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const users = useSelector((state: RootState) => state.user.users);

  const handleUserClick = (users: User) => {
    dispatch(setSelectedUser(users));
  };

  const handleButtonAddClick = () => {
    navigate("/account-settings/addacc");
  };

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      className: "no-wrap",
      width: 200,
    },

    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      className: "no-wrap",
      width: 300,
    },
    {
      title: "Số điện thoại",
      dataIndex: "userPhoneNumber",
      key: "userPhoneNumber",
      className: "no-wrap",
      width: 300,
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
      className: "no-wrap",
      width: 300,
    },
    {
      title: "Vai trò",
      dataIndex: "userRole",
      key: "userRole",
      className: "no-wrap",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      className: "no-wrap",
      width: 300,
      key: "status",

      render: (status: string) => {
        let color = "#EC3740";
        let text = "Ngưng hoạt động";

        if (status === "Hoạt động") {
          color = "#34CD26";
          text = "Hoạt động";
        }

        return (
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
                backgroundColor: color,
                marginRight: "5px",
              }}
            ></div>
            {text}
          </div>
        );
      },
    },
    {
      title: " ",
      dataIndex: "edit",

      key: "edit",
      render: (text: string, record: User) => (
        <NavLink
          className="no-wrap"
          to={`/account-settings/editacc`}
          onClick={() => handleUserClick(record)}
        >
          Cập nhật
        </NavLink>
      ),
    },
  ];

  const calculateIndex = (index: number): number => index + 1;

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const [searchKeyword, setSearchKeyword] = useState("");

  const [activeStatusFilter, setActiveStatusFilter] = useState("Tất cả");

  const handleSearchKeywordChange = (value: string) => {
    setSearchKeyword(value);
  };

  const handleChangeActiveStatusFilter = (value: string) => {
    setActiveStatusFilter(value);
  };

  const filteredUser = users.filter((user) => {
    const isActiveFilter =
      activeStatusFilter === "Tất cả" ||
      (activeStatusFilter === "Giám đốc" && user.userRole === "Giám đốc") ||
      (activeStatusFilter === "Quản lý" && user.userRole === "Quản lý") ||
      (activeStatusFilter === "Bác sĩ" && user.userRole === "Bác sĩ") ||
      (activeStatusFilter === "Y tá" && user.userRole === "Y tá") ||
      (activeStatusFilter === "Thực tập sinh" &&
        user.userRole === "Thực tập sinh");

    const searchFilter =
      searchKeyword === "" ||
      user.name.toLowerCase().includes(searchKeyword.toLowerCase());

    return isActiveFilter && searchFilter;
  });

  const dataSource = filteredUser.map((user, index) => ({
    ...user,
    index: calculateIndex(index),
  }));

  const rowsPerPage = 5;
  const currentPage = useSelector(
    (state: RootState) => state.devices.currentPage
  );
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const [bottom] = useState<TablePaginationPosition>("bottomRight");

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Danh sách tài khoản</div>
          <div className="status-search">
            <div className="status">
              <div className="pe-4">
                <div>Chọn vai trò</div>
                <div className="row">
                  <Select
                    size="large"
                    className="select-status"
                    onChange={handleChangeActiveStatusFilter}
                    defaultValue="Tất cả"
                    style={{ width: 300 }}
                    options={[
                      { value: "Tất cả", label: "Tất cả" },
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
                  total: filteredUser.length,
                  onChange: handlePageChange,
                  className: "custom-pagination",
                }}
              />
            </div>
            <div>
              <button className="button-add" onClick={handleButtonAddClick}>
                <div className="col">
                  <Icon icon="basil:add-solid" className="button-icon" />
                  <p>Thêm tài khoản</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
