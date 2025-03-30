import { IdCard, Megaphone, LogOut } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slice/authSlice";
import { useNavigate } from "react-router";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logout());
    navigate(`/`);
  };
  return (
    <>
      <div className="d-flex">
        <div className="col-lg-2 d-none d-lg-block">
          <aside className="navbar-adminheader m-5 d-flex flex-column">
            <div className="w-100 d-flex flex-column flex-grow-1">
              <NavLink
                className="py-5 d-flex justify-content-center"
                to="/"
                title="Logo"
              >
                <img
                  src="../src/assets/images/Logo_w.png"
                  alt="logo"
                  width={120}
                />
              </NavLink>
              <ul className="m-0 p-0 flex-grow-1">
                <li className="list-unstyled">
                  <h4 className="py-3 mb-5 mx-5">後台管理</h4>
                </li>
                <li className="list-unstyled list-item-hover">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="AdminInformation"
                  >
                    {({ isActive }) => (
                      <h6 className="py-3 mb-5 mx-5">
                        <IdCard
                          className="me-3"
                          style={{ color: isActive ? "#FFCF31" : "inherit" }}
                        />
                        會員資訊管理
                      </h6>
                    )}
                  </NavLink>
                </li>
                <li className="list-unstyled list-item-hover">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="AdvertisementInformation"
                  >
                    {({ isActive }) => (
                      <h6 className="py-3 mx-5">
                        <Megaphone
                          className="me-3"
                          style={{ color: isActive ? "#FFCF31" : "inherit" }}
                        />
                        廣告資訊管理
                      </h6>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="mt-auto list-item-hover mb-5">
              <a
                className="nav-link py-3 mx-5"
                onClick={signOut}
                style={{
                  cursor: "pointer",
                }}
              >
                <LogOut className="me-3" />
                登出
              </a>
            </div>
          </aside>
        </div>
        <div className="d-lg-none col-3 col-md-2">
          <aside className="navbar-adminheader m-5 d-flex flex-column">
            <div className="w-100 d-flex flex-column flex-grow-1">
              <a
                className="py-5 d-flex justify-content-center mb-5"
                href="#"
                title="Logo"
              >
                <img
                  src="../src/assets/images/Logo_w.png"
                  alt="logo"
                  width={60}
                />
              </a>
              <ul className="m-0 p-0 flex-grow-1">
                <li className="list-unstyled list-item-hover">
                  <NavLink
                    className="nav-link d-flex justify-content-center mb-5"
                    aria-current="page"
                    to="AdminInformation"
                  >
                    {({ isActive }) => (
                      <IdCard
                        style={{
                          color: isActive ? "#FFCF31" : "inherit",
                          width: 40,
                          height: 40,
                        }}
                      />
                    )}
                  </NavLink>
                </li>
                <li className="list-unstyled list-item-hover">
                  <NavLink
                    className="nav-link d-flex justify-content-center"
                    aria-current="page"
                    to="AdvertisementInformation"
                  >
                    {({ isActive }) => (
                      <Megaphone
                        style={{
                          color: isActive ? "#FFCF31" : "inherit",
                          width: 40,
                          height: 40,
                        }}
                      />
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="mt-auto list-item-hover mb-5 d-flex justify-content-center">
              <LogOut />
            </div>
          </aside>
        </div>
        <Outlet />
      </div>
    </>
  );
}
