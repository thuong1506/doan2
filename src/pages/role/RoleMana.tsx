import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Input, Table } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { firestore } from "../../firebase/config";
import { setCurrentPage } from "../../features/giveNumberSlice";
import { Role, setRole, setSelectedRole } from "../../features/roleSlice";

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

const RoleSettings: React.FC = () => {
  const dispatch = useDispatch();

  const roles = useSelector((state: RootState) => state.roles.roles);

  const navigate = useNavigate();

  const handleButtonAddClick = () => {
    navigate("/role-settings/addrole");
  };

  const handleRoleClick = (roles: Role) => {
    dispatch(setSelectedRole(roles));
  };

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const snapshot = await firestore.collection("roles").get();
        const giveRoleData = snapshot.docs.map((doc) => doc.data() as Role);
        dispatch(setRole(giveRoleData));
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchRole();
  }, [dispatch]);

  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "roleName",
      key: "roleName",
      className: "no-wrap",
      width: 300,
    },

    {
      title: "Số người dùng",
      dataIndex: "userUse",
      key: "userUse",
      className: "no-wrap",
      width: 300,
    },

    {
      title: "Mô tả",
      dataIndex: "description",
      className: "no-wrap",
      key: "description",
      width: 600,
    },

    {
      title: " ",
      dataIndex: "edit",

      key: "edit",
      render: (text: string, record: Role) => (
        <NavLink
          className="no-wrap"
          to={`/role-settings/editrole`}
          onClick={() => handleRoleClick(record)}
        >
          Cập nhật
        </NavLink>
      ),
    },
  ];

  const calculateIndex = (index: number): number => index + 1;

  const rowsPerPage = 5;
  const currentPage = useSelector(
    (state: RootState) => state.giveNumber.currentPage
  );
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const startIndex: number = (currentPage - 1) * rowsPerPage;

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchKeywordChange = (value: string) => {
    setSearchKeyword(value);
  };

  const filteredRole = roles.filter((roles) => {
    const searchFilter =
      searchKeyword === "" ||
      roles.roleName.toLowerCase().includes(searchKeyword.toLowerCase());
    return searchFilter;
  });

  const dataSource = filteredRole.map((roles, index) => ({
    ...roles,
    index: calculateIndex(index),
  }));

  const [bottom] = useState<TablePaginationPosition>("bottomRight");

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Danh sách vai trò</div>
          <div className="status-search">
            <div className="status"></div>
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
                  total: filteredRole.length,
                  onChange: handlePageChange,
                  className: "custom-pagination",
                }}
              />
            </div>
            <div>
              <button className="button-add" onClick={handleButtonAddClick}>
                <div className="col">
                  <Icon icon="basil:add-solid" className="button-icon" />
                  <p>Thêm vai trò</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSettings;
