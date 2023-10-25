import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../firebase/config";
import { User, setUser } from "../features/userSlice";
import { Icon } from "@iconify/react";
import { RootState } from "../features/store";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Thêm state để lưu thông báo lỗi
  const [showErrorIcon, setShowErrorIcon] = useState(false); // Thêm state để kiểm tra xem có hiển thị biểu tượng lỗi hay không
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleLogin = async () => {
    try {
      setError(""); // Xóa thông báo lỗi cũ
      setShowErrorIcon(false); // Ẩn biểu tượng lỗi khi bắt đầu xử lý

      const userRef = firestore
        .collection("users")
        .where("username", "==", username);
      const userQuerySnapshot = await userRef.get();

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data() as User;

        if (userData.password === password) {
          dispatch(setUser(userData));
          navigate("/dashboard");
        } else {
          setError("Sai mật khẩu hoặc tên đăng nhập");
          setShowErrorIcon(true); // Hiển thị biểu tượng lỗi khi có lỗi
        }
      } else {
        setError("Sai mật khẩu hoặc tên đăng nhập");
        setShowErrorIcon(true); // Hiển thị biểu tượng lỗi khi có lỗi
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setShowErrorIcon(true); // Hiển thị biểu tượng lỗi khi có lỗi
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError(""); // Xóa thông báo lỗi khi người dùng thay đổi tên đăng nhập
    setShowErrorIcon(false); // Ẩn biểu tượng lỗi khi người dùng thay đổi tên đăng nhập
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(""); // Xóa thông báo lỗi khi người dùng thay đổi mật khẩu
    setShowErrorIcon(false); // Ẩn biểu tượng lỗi khi người dùng thay đổi mật khẩu
  };

  return (
    <div className="app">
      <div className="login">
        <div className="logo-login">
          <NavLink to="/*">
            <img src="/img/Group.svg" alt="Logo" />
          </NavLink>
        </div>
        <div className="input-login">
          <div className="mb-3">
            <label htmlFor="">
              Tên đăng nhập <span>*</span>
            </label>
            <Input
              className={`form-control mt-2 ${error ? "input-error" : ""}`}
              value={username}
              onChange={handleUsernameChange}
              status={error ? "error" : ""}
              placeholder={error ? "Error" : ""}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="">
              Mật khẩu <span>*</span>
            </label>
            <Input
              type="password"
              className={`form-control mt-2 ${error ? "input-error" : ""}`}
              value={password}
              onChange={handlePasswordChange}
              status={error ? "error" : ""}
              placeholder={error ? "Error" : ""}
            />
          </div>
          {/* Hiển thị thông báo lỗi */}
          <div style={{ display: "flex", alignItems: "center", color: "red" }}>
            {showErrorIcon && (
              <Icon icon="mingcute:warning-line" className="mb-2" />
            )}
            <p className="ms-1">{error}</p>
          </div>
        </div>
        <div className="button">
          <button className="button-login" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>
        <div className="quen-mk">
          <NavLink to="/forgot-password" className="forgot-pass">
            Quên mật khẩu?
          </NavLink>
        </div>
      </div>
      <div className="centered">
        <div className="img-login">
          <img src="/img/Group341.png" alt="" />
        </div>

        <div className="name-web">
          <div className="text1">Hệ thống</div>
          <div className="text2">QUẢN LÝ XẾP HÀNG</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
