import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import Images from "../../Images";
import CryptoJS from "crypto-js";
import { UserCog2 } from "lucide-react";
const { VITE_SECRET_KEY } = import.meta.env;

export default function HeaderAuth() {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("pulseToken"); // 刪除
    localStorage.removeItem("user"); // 刪除
    checkAuth();
    navigate(`/`);
  };
  const [isAuth, setIsAuth] = useState(false);
  const checkAuth = () => {
    const token = localStorage.getItem("pulseToken");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };
  //解密
  const userData = localStorage.getItem("user");
  const decryptedUser = userData
    ? JSON.parse(
        CryptoJS.AES.decrypt(userData, VITE_SECRET_KEY).toString(
          CryptoJS.enc.Utf8
        )
      )
    : null;
  return (
    <nav className="header-visitor container fixed-top">
      <div className="navbar navbar-dark navbar-expand-lg rounded-4 justify-content-between">
        <NavLink className="navbar-brand py-0 me-auto" to="">
          <img src={Images.Logo_w} alt="Pulse" width="40" height="40" />
        </NavLink>
        <NavLink
          to="/member_center"
          className="nav-btn btn btn-outline-primary rounded-3 me-2 pe-lg-2 order-lg-3"
        >
          {decryptedUser.username}
        </NavLink>
        <button
          className="navbar-toggler order-lg-2 border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-lg-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link me-2" to="/player">
                PULSE Web Player
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link me-2" to="/subscription_plans">
                訂閱方案
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                className="nav-link me-2"
                onClick={() => {
                  signOut();
                }}
              >
                登出
              </button>
            </li>
            {decryptedUser && decryptedUser.role?.includes("admin") && (
              <li className="nav-item">
                <NavLink className="nav-link me-2" to="/admin/AdminInformation">
                  <UserCog2 />
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
