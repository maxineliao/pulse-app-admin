import { List, Search, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import PlayerImages from "../../Images";
import CryptoJS from "crypto-js";
const { VITE_SECRET_KEY } = import.meta.env;
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function PlayerHeader() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const isAuth = useSelector((state) => state.auth.isAuth);

  const handleSearch = (event) => {
    // console.log("searchInput", searchInput);
    event.preventDefault(); // 防止表單預設提交行為
    if (searchInput.trim()) {
      navigate(`/player/result?query=${encodeURIComponent(searchInput)}`); // 跳轉並傳遞查詢參數
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
    <header className="container-fluid fixed-top">
      <div className="navbar navbar-player navbar-dark navbar-expand-lg rounded-4 justify-content-between pe-3">
        <NavLink className="navbar-brand py-0" to="/player">
          <img src={PlayerImages.Logo_w} alt="Pulse" width="40" height="40" />
        </NavLink>
        <div className="d-lg-flex d-none">
          <form
            className="d-flex player-search"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="無損音質感受音樂的脈動"
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="player-icon-search player-icon-btn"
              type="submit"
            >
              <Search />
            </button>
          </form>
          <button
            className="player-icon-list btn btn-outline-primary rounded-2"
            type="button"
          >
            <List />
          </button>
        </div>
        {isAuth ? (
          <NavLink to="/member_center" className="text-decoration-none">
            <button className="nav-btn btn btn-outline-primary rounded-3 me-2 pe-lg-2 order-lg-3 d-none d-lg-block">
              <img
                className="rounded-circle object-fit-cover me-1"
                src={PlayerImages.user}
                alt={decryptedUser.username}
                width="24"
                height="24"
              />
              {decryptedUser.username}
            </button>
          </NavLink>
        ) : (
          <NavLink to="/login" className="text-decoration-none">
            <button className="nav-btn btn btn-outline-primary rounded-3 me-2 pe-lg-2 order-lg-3 d-none d-lg-block">
              尚未登入
            </button>
          </NavLink>
        )}
        <div className="d-lg-none">
          <div className="container-fluid">
            <button
              className="btn rounded-2 player-icon-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
              aria-label="Toggle navigation"
            >
              <Search />
            </button>
            <button className="btn rounded-2 player-icon-btn" type="button">
              <List />
            </button>
            <NavLink to="/member_center" className="text-decoration-none">
              <button className="btn rounded-2 player-icon-btn" type="button">
                <User />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end w-100"
        tabIndex="-1"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
      >
        <div className="offcanvas-header">
          <div className="search-container w-100">
            <input
              placeholder="搜尋無損音質歌曲"
              className="search-input p-0"
              type="search"
              aria-label="Search"
            />
            <button className="player-icon-btn btn" type="submit">
              <Search />
            </button>
            <div className="separator"></div>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className="offcanvas-body"></div>
      </div>
    </header>
  );
}
