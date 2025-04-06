import Images from "../Images";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { login } from "../slice/authSlice";
import { useState } from "react";
import { Loading } from "../components/Loading";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password);
  };
  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const url = "https://pulse-web-player.onrender.com/signin";
      const responsePulse = await axios.post(url, {
        email: email,
        password: password,
      });

      if (
        !responsePulse.data.user.role ||
        !responsePulse.data.user.role.includes("admin")
      ) {
        customSwal("error", "僅限管理者帳號登入後台系統！");
        return;
      }

      const urlHex = `${VITE_BASE_URL}/v2/admin/signin`;
      const responseHex = await axios.post(urlHex, {
        username: email,
        password: password,
      });
      const { token, expired } = responseHex.data;
      localStorage.setItem("Token", token);

      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

      axios.defaults.headers.common["Authorization"] = token;

      dispatch(login());
      customSwal("success", "登入成功");
      setTimeout(() => {
        navigate("/admin/AdminInformation"); // 導向頁面
      }, 2000);
    } catch (error) {
      if (error.response.data === "Email already exists") {
        customSwal("error", "帳號已存在");
      } else {
        customSwal("error", `發生錯誤：${error.response.data}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const customSwal = (icon, title) => {
    Swal.fire({
      icon: icon,
      title: title,
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
      },
    });
  };
  return (
    <div
      className="login-bg"
      style={{
        backgroundImage: `url(${Images.linear})`,
        backgroundPosition: "40% 70%",
      }}
    >
      {isLoading && <Loading />}
      <div className="container py-8" style={{ minHeight: "100dvh" }}>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6">
            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">歡迎回到PULSE ADMIN</h5>
            </div>
            <h1 className="font-shadow">登入</h1>
            <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email" className="form-label mb-2 mt-6">
                帳號 *
              </label>
              <input
                type="email"
                className="form-control py-4 px-5 input-border-third mb-1"
                id="email"
                placeholder="請輸入電子信箱"
                {...register("email", {
                  required: "電子信箱為必填",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "請輸入有效的電子信箱格式",
                  },
                })}
              />
              <span className="mb-5 d-block">
                {errors.email ? errors.email.message : ""}
              </span>
              <label htmlFor="password" className="form-label mb-2">
                密碼 *
              </label>
              <input
                type="password"
                className="form-control py-4 px-5 mb-1 input-border-third"
                id="password"
                placeholder="請輸入密碼"
                {...register("password", {
                  required: "密碼為必填",
                })}
              />
              <div className="d-flex justify-content-between mb-5">
                <span className="d-block">
                  {errors.password ? errors.password.message : ""}
                </span>
                <a href="#" className="text-decoration-none">
                  <h6 className="d-flex justify-content-end mb-6">忘記密碼</h6>
                </a>
              </div>
              <button
                className="btn btn-primary w-100 p-3"
                type="submit"
                id="loginButton"
              >
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
