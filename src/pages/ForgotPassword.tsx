import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { firestore } from "../firebase/config";
import { setUser } from "../features/userSlice";
import { Icon } from "@iconify/react";

const ForgotPassword: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckEmail = async () => {
    try {
      const userRef = firestore
        .collection("users")
        .where("userEmail", "==", userEmail);
      const userQuerySnapshot = await userRef.get();

      if (!userQuerySnapshot.empty) {
        setShowResetForm(true); // Show the password reset form when the email is correct
      }
    } catch (error) {
      console.error("Email verification failed:", error);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (newPassword === confirmNewPassword) {
        const userRef = firestore
          .collection("users")
          .where("userEmail", "==", userEmail);
        const userQuerySnapshot = await userRef.get();

        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0];
          const userId = userDoc.id;

          // Cập nhật mật khẩu mới cho tài khoản
          await firestore.collection("users").doc(userId).update({
            password: newPassword,
          });

          // Hoặc nếu bạn sử dụng Firebase Authentication, bạn có thể cập nhật mật khẩu như sau:
          // const user = firebase.auth().currentUser;
          // await user.updatePassword(newPassword);

          navigate("/login"); // Đổi mật khẩu thành công, chuyển hướng đến trang đăng nhập
        } else {
          console.error("User not found");
        }
      } else {
        console.error("Passwords do not match");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div className="app">
      <div className="login">
        <div className="logo-login">
          <NavLink to="/*">
            <img src="/img/Group.svg" alt="Logo" />
          </NavLink>
        </div>
        <div className="input-forgot">
          {!showResetForm ? (
            <div>
              <div className="mb-3">
                <h5 className="text-center">Đặt lại mật khẩu</h5>
                <label htmlFor="" className="mt-2">
                  Vui lòng nhập email để đặt lại mật khẩu của bạn<span>*</span>
                </label>
                <Input
                  className="mt-1"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div className="button">
                <div className="button-forgot">
                  <button className="button-white" onClick={() => navigate(-1)}>
                    Hủy
                  </button>
                  <button className="button-orange" onClick={handleCheckEmail}>
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h5 className="text-center">Đặt lại mật khẩu mới</h5>
              <label htmlFor="" className="mt-2">
                Mật khẩu<span>*</span>
              </label>
              <Input
                type="password"
                className="mt-1"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor="" className="mt-2">
                Nhập lại mật khẩu<span>*</span>
              </label>
              <Input
                type="password"
                className="mt-1"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <div className="button">
                <button
                  className="button-confirm mt-3"
                  onClick={handleResetPassword}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="centered">
        <img src="/img/Frame.png" alt="" />
      </div>
    </div>
  );
};

export default ForgotPassword;
