import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { Icon } from "@iconify/react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";

const DetailGiveNumber: React.FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleButtonEditClick = () => {
    navigate("/givenumber");
  };

  const selectedGiveNumber = useSelector(
    (state: RootState) => state.giveNumber.selectedGiveNumber
  );

  if (!selectedGiveNumber) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Navbar />
      <div className="content-main">
        <Header />
        <div className="container-main">
          <div className="title">Quản lý cấp số</div>
          <div className="detail-button">
            <div className="detail-device">
              <div className="detail-device-content">
                <div className="title-detail-device">Thông tin cấp số</div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Họ và tên:</div>
                      <div className="col">{selectedGiveNumber.name}</div>
                    </div>
                  </div>
                  <div className="col">
                    {" "}
                    <div className="row">
                      <div className="col-3 label-text">Nguồn cấp:</div>
                      <div className="col">{selectedGiveNumber.source}</div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Tên dịch vụ:</div>
                      <div className="col">
                        {selectedGiveNumber.serviceName}
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Trạng thái:</div>
                      <div className="col">{selectedGiveNumber.status}</div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Số thứ tự:</div>
                      <div className="col">{selectedGiveNumber.stt}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Số điện thoại:</div>
                      <div className="col">
                        {selectedGiveNumber.userPhoneNumber}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Thời gian cấp:</div>
                      <div className="col">
                        {selectedGiveNumber.issuanceDate}
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Địa chỉ email:</div>
                      <div className="col">{selectedGiveNumber.userEmail}</div>
                    </div>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col">
                    <div className="row">
                      <div className="col-3 label-text">Hạn sử dụng:</div>
                      <div className="col">
                        {selectedGiveNumber.expirationDate}
                      </div>
                    </div>
                  </div>
                  <div className="col"></div>
                </div>
              </div>
            </div>
            <button className="button-add" onClick={handleButtonEditClick}>
              <div className="col">
                <Icon icon="system-uicons:wrap-back" className="button-icon" />
                <p>Quay lại</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGiveNumber;
