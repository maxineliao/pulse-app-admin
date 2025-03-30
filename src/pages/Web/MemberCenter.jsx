import {
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  List,
  LockKeyhole,
  LogOut,
  Pencil,
  Wallet,
} from "lucide-react";
import Images from "../../Images";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";
import { useEffect } from "react";
import { useSpotifyAuth } from "../../hooks/useSpotifyAuth";
import SpotifyAuthButton from "../../components/Web/SpotifyAuthButton";
import CryptoJS from "crypto-js";
const { VITE_SECRET_KEY } = import.meta.env;

function MemberCenter() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logout());
    navigate(`/`);
  };
  const { exchangeCodeForToken } = useSpotifyAuth();
  useEffect(() => {
    if (!isAuth) {
      navigate(`/`);
    }
  }, [isAuth]);
  useEffect(() => {
    exchangeCodeForToken();
  }, []);
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
    <div className="container membercenter-content-p">
      <section className="member-header mb-5 row align-items-stretch">
        <div className="col-lg-8 mb-lg-0 mb-3">
          <div className="plan rounded-4 membercenter-tab-style py-5 px-lg-5 px-3 h-100">
            <h3 className="membercenter-title-color mb-lg-5 mb-3">你的方案</h3>
            <h1 className="blur-font mb-3">{decryptedUser.plan}</h1>
            <h5 className="pb-lg-5 pb-3 mb-0 border-bottom membercenter-border-color">
              {decryptedUser.plan.split("-")[1]}方案
            </h5>
            <div className="py-2">
              <CalendarDays width={16}></CalendarDays>
              <span className="ms-3">下次收費日期：2024年10月20日</span>
            </div>
            <div className="py-2">
              <i data-lucide="wallet" width={16}></i>
              <span className="ms-3">
                每月 NT＄{decryptedUser.price} / 信用卡 (**** 5117)
              </span>
            </div>
            <div className="d-flex plan-edit mt-lg-5 mt-3">
              <a className="me-lg-3 me-0 py-2 px-lg-4 px-3 rounded-5 membercenter-button-style text-decoration-none">
                <span>管理訂閱方案</span>
                <ChevronRight width={16}></ChevronRight>
              </a>
              {/* <a className="me-lg-3 me-0 py-2 px-lg-4 px-3 rounded-5 membercenter-button-style text-decoration-none">
                <span>更新付款資訊</span>
                <ChevronRight width={16}></ChevronRight>
              </a> */}
              <SpotifyAuthButton />
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-lg-0 mb-3">
          <div className="avatar rounded-4 membercenter-tab-style py-lg-5 py-3 px-lg-0 px-3 d-flex flex-column align-items-center">
            <img
              className="mb-5 pc-item rounded-circle"
              src={Images.user}
              alt="headshot"
            />
            <img
              className="mobile-item rounded-circle"
              src={Images.user}
              alt="headshot"
            />
            <h3 className="mb-lg-5 mb-0 me-lg-0 me-6">
              {decryptedUser.username}
            </h3>
            <a
              className="py-2 px-3 rounded-5 membercenter-button-style text-decoration-none"
              onClick={() => {
                signOut();
              }}
            >
              <span className="me-2">登出</span>
              <LogOut width={16}></LogOut>
            </a>
          </div>
        </div>
      </section>
      {/* <section className="account-info mb-5">
        <div className="account rounded-4 membercenter-tab-style p-lg-5 ps-3 pe-5 py-3">
          <h3 className="membercenter-title-color">帳戶</h3>
          <div className="d-flex membercenter-edit-tab py-5 border-bottom membercenter-border-color justify-content-between">
            <div className="d-flex">
              <Pencil width={20}></Pencil>
              <h5 className="ps-5 mb-0">編輯個人資訊</h5>
            </div>
            <ChevronRight className="me-2 me-lg-0" width={24}></ChevronRight>
          </div>
          <div className="d-flex membercenter-edit-tab py-5 border-bottom membercenter-border-color justify-content-between">
            <div className="d-flex">
              <LockKeyhole width={20}></LockKeyhole>
              <h5 className="ps-5 mb-0">變更密碼</h5>
            </div>
            <ChevronRight className="me-2 me-lg-0" width={24}></ChevronRight>
          </div>
        </div>
      </section>
      <section className="account-info mb-5">
        <div className="account rounded-4 membercenter-tab-style p-lg-5 ps-3 pe-5 py-3">
          <h3 className="membercenter-title-color">訂閱</h3>
          <div className="d-flex membercenter-edit-tab py-5 border-bottom membercenter-border-color justify-content-between">
            <div className="d-flex">
              <img
                style={{ width: "20px", height: "20px" }}
                src={Images.Logo_w}
                alt=""
              />
              <h5 className="ps-5 mb-0">管理訂閱方案</h5>
            </div>
            <ChevronRight className="me-2 me-lg-0" width={24}></ChevronRight>
          </div>
          <Link
            to="/subscription_plans"
            className="d-flex membercenter-edit-tab py-5 border-bottom membercenter-border-color justify-content-between text-decoration-none"
          >
            <div className="d-flex">
              <List width={20}></List>
              <h5 className="ps-5 mb-0">瀏覽訂閱方案</h5>
            </div>
            <ChevronRight className="me-2 me-lg-0" width={24}></ChevronRight>
          </Link>
        </div>
      </section>
      <section className="account-info mb-5">
        <div className="account rounded-4 membercenter-tab-style p-lg-5 ps-3 pe-5 py-3">
          <h3 className="membercenter-title-color">付款</h3>
          <div className="d-flex membercenter-edit-tab py-5 border-bottom membercenter-border-color justify-content-between">
            <div className="d-flex">
              <Wallet width={20}></Wallet>
              <h5 className="ps-5 mb-0">更新付款資訊</h5>
            </div>
            <ChevronRight className="me-2 me-lg-0" width={24}></ChevronRight>
          </div>
          <div className="d-flex membercenter-edit-tab py-5 border-bottom membercenter-border-color justify-content-between">
            <div className="d-flex">
              <CircleDollarSign width={20}></CircleDollarSign>
              <h5 className="ps-5 mb-0">訂單紀錄</h5>
            </div>
            <ChevronRight className="me-2 me-lg-0" width={24}></ChevronRight>
          </div>
        </div>
      </section> */}
    </div>
  );
}
export default MemberCenter;
