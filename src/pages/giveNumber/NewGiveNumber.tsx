import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Checkbox, Input, Modal, Select, Space } from "antd";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import moment from "moment";
import { firestore } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { themThongBao } from "../../features/popoverSlice";

const NewGiveNumber: React.FC = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonBackClick = () => {
    // Thực hiện chuyển hướng đến trang EditDevice
    navigate("/givenumber");
  };

  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined
  );
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const [currentNumber, setCurrentNumber] = useState(1);

  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [expirationTime, setExpirationTime] = useState<string | null>(null);
  const [issuanceDate, setIssuanceDate] = useState<string | null>(null);
  const [issuanceTime, setIssuanceTime] = useState<string | null>(null);
  const [name, setname] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(null);
  const [stt, setStt] = useState<string | null>(null);

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };

  const currentUser = useSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    // Khôi phục số thứ tự cuối cùng từ localStorage
    const lastPrintedNumber = localStorage.getItem("lastPrintedNumber");
    if (lastPrintedNumber) {
      setCurrentNumber(parseInt(lastPrintedNumber) + 1);
    }
  }, []);

  const handlePrintNumber = () => {
    const newPopoverData = {
      userName: currentUser.name,
      time: currentDateTime,
    };

    dispatch(themThongBao(newPopoverData));
    setIsOverlayVisible(true);

    const updatedNumber = currentNumber;
    setCurrentNumber(updatedNumber);

    localStorage.setItem("lastPrintedNumber", updatedNumber.toString());

    const now = moment();
    const expiration = now.add(2, "days");

    const newNumberData = {
      expirationDate: expiration.format("DD/MM/YYYY"),
      expirationTime: expiration.format("HH:mm"),
      issuanceDate: moment().format("DD/MM/YYYY"),
      issuanceTime: moment().format("HH:mm"),
      name: currentUser.name,
      serviceName: selectedService || "", // Lưu tên dịch vụ
      source: "Hệ thống", // Nguồn cấp là "Hệ thống"
      status: "Đang chờ", // Trạng thái mặc định là "Đang chờ"
      userEmail: currentUser.userEmail,
      userPhoneNumber: currentUser.userPhoneNumber,
      stt: formattedNumber(updatedNumber),
    };

    // Gửi đối tượng số mới đến Firestore
    firestore
      .collection("giveNumber")
      .add(newNumberData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding number data: ", error);
        // Xử lý lỗi, có thể hiển thị thông báo lỗi tùy ý
      });
    setExpirationDate(expiration.format("DD/MM/YYYY"));
    setExpirationTime(expiration.format("HH:mm"));
    setIssuanceDate(moment().format("DD/MM/YYYY"));
    setIssuanceTime(moment().format("HH:mm"));
  };

  const handleOverlayClose = () => {
    setIsOverlayVisible(false);
  };

  const currentDateTime = moment().format("HH:mm DD/MM/YYYY");

  const formattedNumber = (num: number) => {
    const paddedNumber = (num + 2001020).toString().padStart(7, "0");
    return paddedNumber;
  };

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Quản lý cấp số</div>
          <div className="detail-button">
            <div className="detail-givenum">
              <div className="detail-device-content">
                <div className="row pt-4">
                  <div className="col themso">
                    <p className="title-num">CẤP SỐ MỚI</p>
                    <p className="sub">Dịch vụ khách hàng lựa chọn</p>
                    <Select
                      size="large"
                      className="select-status"
                      placeholder="Chọn dịch vụ"
                      style={{ width: 370 }}
                      onChange={handleServiceChange}
                      options={[
                        { value: "Khám tim mạch", label: "Khám tim mạch" },
                        {
                          value: "Khám sản - phụ khoa",
                          label: "Khám sản - phụ khoa",
                        },
                        {
                          value: "Khám răng hàm mặt",
                          label: "Khám răng hàm mặt",
                        },
                        {
                          value: "Khám tai mũi họng",
                          label: "Khám tai mũi họng",
                        },
                      ]}
                    />
                    <div className="button-back-add">
                      <button
                        className="back-btn"
                        onClick={handleButtonBackClick}
                      >
                        Hủy bỏ
                      </button>
                      <button className="add-btn" onClick={handlePrintNumber}>
                        In số
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="custom-modal"
        visible={isOverlayVisible}
        onCancel={handleOverlayClose}
        footer={null}
      >
        <div className="overlay-number">
          <div className="n-1">
            <p className="title-number">Số thứ tự được cấp</p>
            <p className="number-give">{formattedNumber(currentNumber)}</p>
            <p className="dv">DV: {selectedService} (tại quầy số 1)</p>
          </div>
          <div className="n-2">
            <p className="time-1 no-wrap">Thời gian cấp: {currentDateTime}</p>
            <p className="time-1">
              Hạn sử dụng: {expirationTime} {expirationDate}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewGiveNumber;
