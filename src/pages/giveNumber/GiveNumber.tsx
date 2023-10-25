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
  GiveNumber,
  setCurrentPage,
  setGiveNumber,
  setSelectedGiveNumber,
} from "../../features/giveNumberSlice";

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

const GiveNumbers: React.FC = () => {
  const dispatch = useDispatch();

  const giveNumber = useSelector(
    (state: RootState) => state.giveNumber.giveNumber
  );
  const navigate = useNavigate();

  const handleButtonAddClick = () => {
    navigate("/givenumber/newgivenumber");
  };

  const handleGiveNumberClick = (giveNumber: GiveNumber) => {
    dispatch(setSelectedGiveNumber(giveNumber));
  };

  useEffect(() => {
    const fetchGiveNumber = async () => {
      try {
        const snapshot = await firestore.collection("giveNumber").get();
        const giveNumberData = snapshot.docs.map(
          (doc) => doc.data() as GiveNumber
        );
        dispatch(setGiveNumber(giveNumberData));
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchGiveNumber();
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      className: "no-wrap",
      // sorter: (a: any, b: any) => parseInt(b.stt) - parseInt(a.stt),
      // defaultSortOrder: "descend" as SortOrder,
    },

    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      className: "no-wrap",
      width: 200,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      className: "no-wrap",
      width: 200,
    },
    {
      title: "Thời gian cấp",
      key: "issuanceDateTime",
      className: "no-wrap",
      width: 200,
      render: (text: any, record: { issuanceDate: any; issuanceTime: any }) => {
        const issuanceDate = record.issuanceDate;
        const issuanceTime = record.issuanceTime;
        const issuanceDateTime = `${issuanceTime} ${issuanceDate}`;
        return <div className="table-cell-content">{issuanceDateTime}</div>;
      },
    },
    {
      title: "Hạn sử dụng",
      key: "expirationDateTime",
      className: "no-wrap",
      width: 200,
      render: (
        text: any,
        record: { expirationDate: any; expirationTime: any }
      ) => {
        const expirationDate = record.expirationDate;
        const expirationTime = record.expirationTime;
        const expirationDateTime = ` ${expirationTime} ${expirationDate}`;
        return <div className="table-cell-content">{expirationDateTime}</div>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      className: "no-wrap",
      key: "status",
      render: (status: string) => {
        let color = "#E73F3F";
        let text = "Bỏ qua";

        if (status === "Đang chờ") {
          color = "#3498db";
          text = "Đang chờ";
        } else if (status === "Đã sử dụng") {
          color = "#95a5a6";
          text = "Đã sử dụng";
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
      title: "Nguồn cấp",
      dataIndex: "source",
      className: "no-wrap",
      key: "source",
    },

    {
      title: " ",
      dataIndex: "edit",

      key: "edit",
      render: (text: string, record: GiveNumber) => (
        <NavLink
          className="no-wrap"
          to={`/givenumber/detailgivenumber`}
          onClick={() => handleGiveNumberClick(record)}
        >
          Chi tiết
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

  const [selectedServiceFilter, setSelectedServiceFilter] = useState("Tất cả");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("Tất cả");
  const [selectedSourceFilter, setSelectedSourceFilter] = useState("Tất cả");

  const handleSearchKeywordChange = (value: string) => {
    setSearchKeyword(value);
  };

  const handleFilterChange = (
    value: string,
    filterType: "serviceName" | "status" | "source"
  ) => {
    switch (filterType) {
      case "serviceName":
        setSelectedServiceFilter(value);
        break;
      case "status":
        setSelectedStatusFilter(value);
        break;
      case "source":
        setSelectedSourceFilter(value);
        break;
      default:
        break;
    }
  };

  const filteredGiveNumber = giveNumber.filter((giveNumber) => {
    const serviceNameFilter =
      selectedServiceFilter === "Tất cả" ||
      giveNumber.serviceName === selectedServiceFilter;

    const statusFilter =
      selectedStatusFilter === "Tất cả" ||
      giveNumber.status === selectedStatusFilter;

    const sourceFilter =
      selectedSourceFilter === "Tất cả" ||
      giveNumber.source === selectedSourceFilter;

    const searchFilter =
      searchKeyword === "" ||
      giveNumber.stt.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      giveNumber.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      giveNumber.serviceName
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    return searchFilter && serviceNameFilter && statusFilter && sourceFilter;
  });

  const dataSource = filteredGiveNumber.map((giveNumber, index) => ({
    ...giveNumber,
    index: calculateIndex(index),
  }));

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const [bottom] = useState<TablePaginationPosition>("bottomRight");

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Quản lý cấp số</div>
          <div className="status-search">
            <div className="status">
              <div className="pe-4">
                <div>Tên dịch vụ</div>
                <Select
                  size="large"
                  className="select-status"
                  defaultValue="Tất cả"
                  value={selectedServiceFilter}
                  style={{ width: 150 }}
                  onChange={(value) => handleFilterChange(value, "serviceName")}
                  options={[
                    { value: "Tất cả", label: "Tất cả" },
                    {
                      value: "Khám sản - phụ khoa",
                      label: "Khám sản - phụ khoa",
                    },
                    { value: "Khám răng hàm mặt", label: "Khám răng hàm mặt" },
                    { value: "Khám tai mũi họng", label: "Khám tai mũi họng" },
                    { value: "Khám tim mạch", label: "Khám tim mạch" },
                  ]}
                />
              </div>
              <div className="pe-4">
                <div>Tình trạng</div>
                <Select
                  size="large"
                  className="select-status"
                  defaultValue="Tất cả"
                  value={selectedStatusFilter}
                  style={{ width: 150 }}
                  onChange={(value) => handleFilterChange(value, "status")}
                  options={[
                    { value: "Tất cả", label: "Tất cả" },
                    { value: "Đang chờ", label: "Đang chờ" },
                    { value: "Đã sử dụng", label: "Đã sử dụng" },
                    { value: "Bỏ qua", label: "Bỏ qua" },
                  ]}
                />
              </div>
              <div className="pe-4">
                <div>Nguồn cấp</div>
                <Select
                  size="large"
                  className="select-status"
                  defaultValue="Tất cả"
                  value={selectedSourceFilter}
                  style={{ width: 150 }}
                  onChange={(value) => handleFilterChange(value, "source")}
                  options={[
                    { value: "Tất cả", label: "Tất cả" },
                    { value: "Kiosk", label: "Kiosk" },
                    { value: "Hệ thống", label: "Hệ thống" },
                  ]}
                />
              </div>
              <div className="pe-4">
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
                  total: filteredGiveNumber.length,
                  onChange: handlePageChange,
                  className: "custom-pagination",
                }}
              />
            </div>
            <div>
              <button className="button-add" onClick={handleButtonAddClick}>
                <div className="col">
                  <Icon icon="basil:add-solid" className="button-icon" />
                  <p>Cấp số mới</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveNumbers;
