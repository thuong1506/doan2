import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { DatePicker, DatePickerProps, Table } from "antd";
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

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

const Reports: React.FC = () => {
  const dispatch = useDispatch();

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
      title: "Số thứ tự",
      dataIndex: "stt",
      key: "stt",
      className: "no-wrap",
      width: 200,
      sorter: (a: any, b: any) => parseInt(b.stt) - parseInt(a.stt),
      defaultSortOrder: "descend" as SortOrder,
    },

    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      className: "no-wrap",
      width: 300,
      sorter: (a: any, b: any) =>
        parseInt(b.serviceName) - parseInt(a.serviceName),
      defaultSortOrder: "descend" as SortOrder,
    },
    {
      title: "Thời gian cấp",
      key: "issuanceDateTime",
      className: "no-wrap",
      sorter: (a: any, b: any) =>
        parseInt(b.issuanceDateTime) - parseInt(a.issuanceDateTime),
      defaultSortOrder: "descend" as SortOrder,
      width: 300,
      render: (text: any, record: { issuanceDate: any; issuanceTime: any }) => {
        const issuanceDate = record.issuanceDate;
        const issuanceTime = record.issuanceTime;
        const issuanceDateTime = `${issuanceTime} ${issuanceDate}`;
        return <div className="table-cell-content">{issuanceDateTime}</div>;
      },
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      className: "no-wrap",
      width: 300,
      key: "status",
      sorter: (a: any, b: any) => parseInt(b.status) - parseInt(a.status),
      defaultSortOrder: "descend" as SortOrder,
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
      key: "source",
      width: 300,
      sorter: (a: any, b: any) => parseInt(b.source) - parseInt(a.source),
      defaultSortOrder: "descend" as SortOrder,
    },
  ];

  const giveNumber = useSelector(
    (state: RootState) => state.giveNumber.giveNumber
  );
  const calculateIndex = (index: number): number => index + 1;

  const dataSource = giveNumber.map((giveNumber, index) => ({
    ...giveNumber,
    index: calculateIndex(index),
  }));

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleDownload = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách cấp số");

    // Add columns
    worksheet.columns = [
      { header: "Số thứ tự", key: "stt", width: 15 },
      { header: "Tên dịch vụ", key: "serviceName", width: 30 },
      { header: "Thời gian cấp", key: "issuanceDateTime", width: 30 },
      { header: "Tình trạng", key: "status", width: 20 },
      { header: "Nguồn cấp", key: "source", width: 20 },
    ];

    // Add data rows
    dataSource.forEach((item) => {
      worksheet.addRow({
        stt: item.stt,
        serviceName: item.serviceName,
        issuanceDateTime: `${item.issuanceTime} ${item.issuanceDate}`,
        status: item.status,
        source: item.source,
      });
    });

    // Create a buffer containing the Excel file
    workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const fileName = "Danh_sach_cap_so.xlsx";
      FileSaver.saveAs(blob, fileName);
    });
  };

  const rowsPerPage = 5;
  const currentPage = useSelector(
    (state: RootState) => state.giveNumber.currentPage
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
          <div className="status-search">
            <div className="status">
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
                  total: giveNumber.length,
                  onChange: handlePageChange,
                  className: "custom-pagination",
                }}
              />
            </div>
            <div>
              <button className="button-add" onClick={handleDownload}>
                <div className="col">
                  <Icon
                    icon="solar:file-download-bold"
                    className="button-icon"
                  />
                  <p>Tải về</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
