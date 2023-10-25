import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Calendar,
  CalendarProps,
  Card,
  DatePicker,
  Input,
  Progress,
  Space,
  Tooltip,
} from "antd";
import firebase from "firebase/compat";
import Navbar from "../components/navbar";
import Header from "../components/header";
import Meta from "antd/es/card/Meta";
import { Icon } from "@iconify/react";
import { Dayjs } from "dayjs";
import { Line } from "react-chartjs-2";
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const DashBoard: React.FC = () => {
  const avatarStyle = {
    width: " 48px",
    height: " 48px",
    backgroundColor: "#b9c7e8", // Màu nền của Avatar
  };

  const iconStyle = {
    width: "24px",
    height: "24px",
    marginTop: "10px",
    color: "#6493F9", // Màu của biểu tượng Icon
  };

  const avatarStyle2 = {
    width: " 48px",
    height: " 48px",
    backgroundColor: "#a3eeb6", // Màu nền của Avatar
  };

  const iconStyle2 = {
    width: "24px",
    height: "24px",
    marginTop: "10px",
    color: "#35C75A", // Màu của biểu tượng Icon
  };

  const avatarStyle3 = {
    width: " 48px",
    height: " 48px",
    backgroundColor: "#f7e0ce", // Màu nền của Avatar
  };

  const iconStyle3 = {
    width: "24px",
    height: "24px",
    marginTop: "10px",
    color: "#FFAC6A", // Màu của biểu tượng Icon
  };

  const avatarStyle4 = {
    width: " 48px",
    height: " 48px",
    backgroundColor: "#f5c6c6", // Màu nền của Avatar
  };

  const iconStyle4 = {
    width: "24px",
    height: "24px",
    marginTop: "10px",
    color: "#F86D6D", // Màu của biểu tượng Icon
  };

  const titleStyle = {
    color: "var(--gray-gray-400-text, #535261)",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "18px",
    whiteSpace: "normal" as "normal",
    marginTop: "10px",
  };

  const data = [
    { name: "3", Sales: 2000 },
    { Sales: 800 },
    { name: "6", Sales: 1000 },
    { Sales: 660 },
    { name: "11", Sales: 1220 },
    { Sales: 910 },
    { name: "16", Sales: 1910 },
    { Sales: 510 },
    { name: "20", Sales: 2001 },
    { Sales: 150 },
    { name: "22", Sales: 890 },
    { Sales: 830 },
    { name: "30", Sales: 300 },
  ]; // Màu cam cho biểu đồ sóng
  const waveColor = "#5185F7";
  const onChange = (date: any, dateString: string) => {
    console.log(date, dateString);
  };

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />

        <div className="content-container">
          <div className="content-container1">
            <div className="container-main">
              <div className="title">Biểu đồ cấp số</div>
              <div className="card-container">
                <div className="card-main">
                  <Card style={{ width: 185, marginTop: 16 }}>
                    <Meta
                      avatar={
                        <Avatar
                          style={avatarStyle}
                          icon={<Icon icon="bi:calendar" style={iconStyle} />} // Sử dụng biểu tượng BiCalendar từ Boxicons
                        />
                      }
                      title={<div style={titleStyle}>Số thứ tự đã cấp</div>}
                    />
                    <div className="so-luong">
                      <div className="so">4.221</div>
                      <div className="phan-tram">
                        <div className="phan-tram-i">
                          <Icon icon="ph:arrow-up" /> 32,41%
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="card-main">
                  {" "}
                  <Card style={{ width: 185, marginTop: 16 }}>
                    <Meta
                      avatar={
                        <Avatar
                          style={avatarStyle2}
                          icon={
                            <Icon icon="bi:calendar-check" style={iconStyle2} />
                          } // Sử dụng biểu tượng BiCalendar từ Boxicons
                        />
                      }
                      title={<div style={titleStyle}>Số thứ tự sử dụng</div>}
                    />
                    <div className="so-luong">
                      <span className="so">3.721</span>
                      <span className="phan-tram">
                        <span className="phan-tram-i">
                          <Icon icon="ph:arrow-up" /> 32,41%
                        </span>
                      </span>
                    </div>
                  </Card>
                </div>
                <div className="card-main">
                  {" "}
                  <Card style={{ width: 185, marginTop: 16 }}>
                    <Meta
                      avatar={
                        <Avatar
                          style={avatarStyle3}
                          icon={
                            <Icon
                              icon="fluent:person-call-20-regular"
                              style={iconStyle3}
                            />
                          } // Sử dụng biểu tượng BiCalendar từ Boxicons
                        />
                      }
                      title={<div style={titleStyle}>Số thứ tự đang chờ</div>}
                    />
                    <div className="so-luong">
                      <span className="so">468</span>
                      <span className="phan-tram">
                        <span className="phan-tram-i">
                          <Icon icon="ph:arrow-up" /> 32,41%
                        </span>
                      </span>
                    </div>
                  </Card>
                </div>
                <div className="card-main">
                  {" "}
                  <Card style={{ width: 185, height: 150, marginTop: 16 }}>
                    <Meta
                      avatar={
                        <Avatar
                          style={avatarStyle4}
                          icon={
                            <Icon icon="bi:bookmark-star" style={iconStyle4} />
                          } // Sử dụng biểu tượng BiCalendar từ Boxicons
                        />
                      }
                      title={<div style={titleStyle}>Số thứ tự bỏ qua</div>}
                    />
                    <div className="so-luong">
                      <span className="so">33</span>
                      <span className="phan-tram">
                        <span className="phan-tram-i">
                          <Icon icon="ph:arrow-up" /> 32,41%
                        </span>
                      </span>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="bieudo">
                <div className="row mb-3">
                  <div className="col-6">
                    <h5 className="ps-4">Bảng thống kê theo ngày</h5>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <span className="pe-3">Xem theo</span>
                    <Space className="pe-3">
                      <DatePicker
                        placeholder="Chọn ngày"
                        onChange={onChange}
                        format="MM/YYYY"
                      />
                    </Space>
                  </div>
                </div>
                <AreaChart width={760} height={370} data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />

                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="Sales"
                    stroke={waveColor}
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="url(#colorWave)"
                  />
                  <defs>
                    <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={waveColor} />
                      <stop offset="100%" stopColor="white" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </div>
            </div>
          </div>
          <div className="content-container2">
            <div className="container-main">
              <div className="cal-stt">
                <div className="title">Tổng quan</div>
                <Card style={{ marginTop: 5 }}>
                  <Meta
                    avatar={
                      <Space size={30}>
                        <Progress
                          type="circle"
                          percent={93}
                          size="small"
                          strokeColor={"#FF7506"}
                        />
                      </Space>
                    }
                    title={
                      <div className="row">
                        <div className="col">
                          <div className="so-luong1">
                            <div className="so1">4.221</div>
                            <div className="phan-tram1">
                              <Icon
                                icon="solar:monitor-outline"
                                className="pe-1"
                              />
                              Thiết bị
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor: "#FFD130",
                                  marginRight: "5px",
                                }}
                              ></div>
                              <span className="trangthai">Đang hoạt động</span>{" "}
                              <span className="trangthai1">3.799</span>
                            </div>
                          </div>
                          <div className="row pt-3">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor: "#7E7D88",
                                  marginRight: "5px",
                                }}
                              ></div>
                              <span className="trangthai">Ngưng hoạt động</span>
                              <span className="trangthai1">422</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </Card>
                <Card style={{ marginTop: 5 }}>
                  <Meta
                    avatar={
                      <Space size={30}>
                        <Progress
                          type="circle"
                          percent={76}
                          size="small"
                          strokeColor={"#4277FF"}
                        />
                      </Space>
                    }
                    title={
                      <div className="row">
                        <div className="col">
                          <div className="so-luong1">
                            <div className="so1">276</div>
                            <div className="phan-tram2">
                              <Icon
                                icon="ion:chatbubbles-outline"
                                className="pe-1"
                              />
                              Dịch vụ
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor: "#4277FF",
                                  marginRight: "5px",
                                }}
                              ></div>
                              <span className="trangthai">Đang hoạt động</span>{" "}
                              <span className="trangthai2">210</span>
                            </div>
                          </div>
                          <div className="row pt-3">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor: "#7E7D88",
                                  marginRight: "5px",
                                }}
                              ></div>
                              <span className="trangthai">Ngưng hoạt động</span>
                              <span className="trangthai2">66</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </Card>
                <Card style={{ marginTop: 5 }}>
                  <Meta
                    avatar={
                      <Space size={30}>
                        <Progress
                          type="circle"
                          percent={86}
                          size="small"
                          strokeColor={"#35C75A"}
                        />
                      </Space>
                    }
                    title={
                      <div className="row">
                        <div className="col">
                          <div className="so-luong1">
                            <div className="so1">4.221</div>
                            <div className="phan-tram3">
                              <Icon icon="lucide:layers" className="pe-1" />
                              Cấp số
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor: "#35C75A",
                                  marginRight: "5px",
                                }}
                              ></div>
                              <span className="trangthai">Đã sử dụng</span>{" "}
                              <span className="trangthai3">3.799</span>
                            </div>
                          </div>
                          <div className="row">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor: "#7E7D88",
                                  marginRight: "5px",
                                }}
                              ></div>
                              <span className="trangthai">Đang chờ</span>
                              <span className="trangthai3">422</span>
                            </div>
                          </div>
                          <div className="row">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor: "#F178B6",
                                  marginRight: "5px",
                                }}
                              ></div>
                              <span className="trangthai">Bỏ qua</span>
                              <span className="trangthai3">422</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </Card>

                <Calendar
                  fullscreen={false}
                  onPanelChange={onPanelChange}
                  style={{
                    display: "flex",
                    width: "353px",
                    padding: "16px 10px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
