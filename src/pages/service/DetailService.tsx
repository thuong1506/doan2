import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker, DatePickerProps, Input, Select, Table } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { setSelectedService } from "../../features/serviceSlice";
import { setCurrentPage } from "../../features/deviceSlice";

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

const DetailService: React.FC = () => {
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "stt",
      key: "stt",
      className: "no-wrap",
      width: 300,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      className: "no-wrap",
      width: 300,
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
  ];
  const dispatch = useDispatch();

  const selectedService = useSelector(
    (state: RootState) => state.services.selectedService
  );

  const giveNumberData = useSelector(
    (state: RootState) => state.giveNumber.giveNumber
  );

  const [selectedStatusFilter, setSelectedStatusFilter] = useState("Tất cả");

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleStatusFilterChange = (value: React.SetStateAction<string>) => {
    setSelectedStatusFilter(value);
  };

  const handleSearchKeywordChange = (value: React.SetStateAction<string>) => {
    setSearchKeyword(value);
  };

  const [bottom] = useState<TablePaginationPosition>("bottomRight");

  const filteredGiveNumberData = giveNumberData.filter((giveNumber) => {
    const statusFilter =
      selectedStatusFilter === "Tất cả" ||
      giveNumber.status === selectedStatusFilter;

    const searchFilter =
      searchKeyword === "" ||
      giveNumber.stt.toLowerCase().includes(searchKeyword.toLowerCase());

    return statusFilter && searchFilter;
  });

  const dataSource = filteredGiveNumberData.map((giveNumber, index) => ({
    ...giveNumber,
  }));

  const rowsPerPage = 4;
  const currentPage = useSelector(
    (state: RootState) => state.giveNumber.currentPage
  );
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const navigate = useNavigate();

  const handleButtonEditClick = () => {
    navigate("/service/edit");
  };

  const handleButtonBackClick = () => {
    navigate("/service");
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (selectedService) {
        try {
          const response = await fetch(
            `/api/services/${selectedService.serviceCode}`
          );
          const serviceDetails = await response.json();
          dispatch(setSelectedService(serviceDetails));
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchServiceDetails();
  }, [dispatch, selectedService]);

  if (!selectedService) {
    return <div>Loading...</div>;
  }

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Quản lý dịch vụ </div>
          <div className="detail-button">
            <div className="detail-service-content">
              <div className="detail-service1">
                <div className="detail-device-content">
                  <div className="title-detail-device">Thông tin dịch vụ</div>
                  <div className="row pt-4">
                    <div className="col">
                      <div className="row">
                        <div className="col label-text">Mã dịch vụ:</div>
                        <div className="col">{selectedService.serviceCode}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-4">
                    <div className="col">
                      <div className="row">
                        <div className="col label-text">Tên dịch vụ:</div>
                        <div className="col">{selectedService.serviceName}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-4">
                    {" "}
                    <div className="col">
                      <div className="row">
                        <div className="col label-text">Mô tả:</div>
                        <div className="col">{selectedService.description}</div>
                      </div>
                    </div>
                  </div>
                  <div className="title-detail-device pt-4">Quy tắc cấp số</div>
                  <div className="row pt-4">
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          <div className="row">
                            <div className="col label-text">Tăng tự động:</div>
                            <div className="col flex-input">
                              <Input
                                value={"0001"}
                                style={{ width: 60 }}
                              ></Input>{" "}
                              <span className="den">đến</span>
                              <Input
                                value={"9999"}
                                style={{ width: 60 }}
                              ></Input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-4">
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          <div className="row">
                            <div className="col label-text">Prefix:</div>
                            <div className="col">
                              <Input
                                value={"0001"}
                                style={{ width: 60 }}
                              ></Input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-4">
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          <div className="row">
                            <div className="col label-text">
                              Reset mỗi ngày:
                            </div>
                            <div className="pt-2">Ví dụ: 201-2001</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail-service2">
                <div className="detail-device-content">
                  <div className="row">
                    <div className="col-3">Trạng thái</div>
                    <div className="col-6">Chọn thời gian</div>
                    <div className="col">Từ khóa</div>
                  </div>
                  <div className="row pt-2">
                    <div className="col-3">
                      <Select
                        size="large"
                        className="select-status"
                        defaultValue="Tất cả"
                        style={{ width: 150 }}
                        onChange={handleStatusFilterChange}
                        options={[
                          { value: "Tất cả", label: "Tất cả" },
                          { value: "Đang chờ", label: "Đang chờ" },
                          { value: "Đã sử dụng", label: "Đã sử dụng" },
                          {
                            value: "Bỏ qua",
                            label: "Bỏ qua",
                          },
                        ]}
                      />
                    </div>
                    <div className="col">
                      <DatePicker
                        style={{ width: 140 }}
                        onChange={onChange}
                        placeholder="Chọn ngày"
                        size="large"
                      />
                    </div>
                    <div className="col">
                      <DatePicker
                        style={{ width: 140 }}
                        onChange={onChange}
                        placeholder="Chọn ngày"
                        size="large"
                      />
                    </div>
                    <div className="col">
                      {" "}
                      <div className="search-filter">
                        <div className="search-ticket">
                          <Input
                            style={{ height: 40 }}
                            type="text"
                            className="form-control"
                            placeholder="Nhập từ khóa"
                            value={searchKeyword}
                            onChange={(e) =>
                              handleSearchKeywordChange(e.target.value)
                            }
                          />
                          <Icon
                            icon="iconamoon:search"
                            className="search-ticket-icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3">
                    <Table
                      columns={columns}
                      dataSource={dataSource}
                      pagination={{
                        position: [bottom],
                        current: currentPage,
                        pageSize: rowsPerPage,
                        total: filteredGiveNumberData.length,
                        onChange: handlePageChange,
                        className: "custom-pagination",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <button className="button-add" onClick={handleButtonEditClick}>
                <div className="col">
                  <Icon icon="fa6-solid:square-pen" className="button-icon" />
                  <p>Cập nhật danh sách</p>
                </div>
              </button>
              <button className="button-add" onClick={handleButtonBackClick}>
                <Icon icon="system-uicons:wrap-back" className="button-icon" />
                <p>Quay lại</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailService;
