import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { DatePicker, DatePickerProps, Input, Table } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { firestore } from "../../firebase/config";

import { GiveNumber, setGiveNumber } from "../../features/giveNumberSlice";

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

const DiarySettings: React.FC = () => {
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
      title: "Tên đăng nhập",
      dataIndex: "stt",
      key: "stt",
      className: "no-wrap",
      width: 300,
    },

    {
      title: "Thời gian tác động",
      key: "issuanceDateTime",
      className: "no-wrap",

      width: 300,
      render: (text: any, record: { issuanceDate: any; issuanceTime: any }) => {
        const issuanceDate = record.issuanceDate;
        const issuanceTime = record.issuanceTime;
        const issuanceDateTime = `${issuanceTime} ${issuanceDate}`;
        return <div className="table-cell-content">{issuanceDateTime}</div>;
      },
    },

    {
      title: "IP thực hiện",
      dataIndex: "source",
      key: "source",
      width: 300,
    },

    {
      title: "Thao tác thực hiện",
      dataIndex: "source",
      key: "source",
      width: 300,
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

  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchKeywordChange = (value: string) => {
    setSearchKeyword(value);
  };

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
                pagination={false}
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiarySettings;
