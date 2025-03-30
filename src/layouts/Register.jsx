import Images from "../Images";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { login } from "../slice/authSlice";
import CryptoJS from "crypto-js";
const { VITE_SECRET_KEY } = import.meta.env;

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordComfirmed, setPasswordComfirmed] = useState(true);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      chkpassword: "",
    },
  });
  const onSubmit = (data) => {
    const { email, password, username } = data;
    if (watchForm.password === watchForm.chkpassword) {
      signUp(email, password, username);
    } else {
      return;
    }
  };
  const watchForm = useWatch({
    control,
  });
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
  const signUp = async (email, password, username) => {
    try {
      const url = "https://pulse-web-player.onrender.com/signup";
      const res = await axios.post(url, {
        username: username,
        email: email,
        password: password,
        role: ["user"],
        plan: "free",
        price: 0,
      });
      localStorage.setItem("pulseToken", res.data.accessToken); // 儲存
			localStorage.setItem("memberName", res.data.user.username);
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(res.data.user),
        VITE_SECRET_KEY
      ).toString(); // 加密
      localStorage.setItem("user", encryptedUser); // 儲存
      dispatch(login());
      customSwal("success", "註冊成功！");
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } catch (error) {
      if (error.response.data === "Email already exists") {
        customSwal("error", "帳號已存在");
      } else {
        customSwal("error", `發生錯誤：${error.response.data}`);
      }
    }
  };
  useEffect(() => {
    if (watchForm.password && watchForm.chkpassword) {
      if (watchForm.password === watchForm.chkpassword) {
        setPasswordComfirmed(true);
      } else {
        setPasswordComfirmed(false);
      }
    } else {
      setPasswordComfirmed(true);
    }
  }, [watchForm]);

  return (
    <div
      className="login-bg"
      style={{
        backgroundImage: `url(${Images.linear})`,
      }}
    >
      <div className="container py-8" style={{ minHeight: "100dvh" }}>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6">
            <Link
              to="/"
              className="d-flex align-items-center mb-4 text-decoration-none"
            >
              <ChevronLeft width={16} />
              <p className="mb-0 fs-7">回首頁</p>
            </Link>
            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">歡迎來到PULSE</h5>
              <Link to="/login" className="text-decoration-none">
                <h6>已經是會員？立即登入</h6>
              </Link>
            </div>
            <h1 className="font-shadow">註冊</h1>
            <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="username" className="form-label mb-2 mt-6">
                使用者名稱 *
              </label>
              <input
                type="text"
                className="form-control mb-1 py-4 px-5 input-border-third"
                id="username"
                placeholder="請輸入使用者名稱"
                {...register("username", {
                  required: "名稱為必填",
                  pattern: {
                    value: /^.{1,20}$/,
                    message: "名稱須在20個字元內",
                  },
                })}
              />
              <span className="mb-5 d-block">
                {errors.username ? errors.username.message : ""}
              </span>
              <label htmlFor="email" className="form-label mb-2">
                您的電子信箱 *
              </label>
              <input
                type="email"
                className="form-control mb-1 py-4 px-5 input-border-third"
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
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "密碼需大於等於8個字元，含英文字母及數字",
                  },
                })}
              />
              <span className="d-block mb-5">
                {errors.password ? errors.password.message : ""}
              </span>
              <label htmlFor="chkPassword" className="form-label mb-2">
                確認密碼 *
              </label>
              <input
                type="password"
                className="form-control py-4 px-5 mb-1 input-border-third"
                id="chkPassword"
                placeholder="請再次輸入密碼"
                {...register("chkpassword", {
                  required: "此欄位為必填",
                })}
              />
              <span className="d-block mb-6">
                {errors.chkpassword
                  ? errors.chkpassword.message
                  : !passwordComfirmed
                  ? "密碼不相符"
                  : ""}
              </span>
              <button
                className="btn btn-primary w-100 p-3"
                type="submit"
                id="registerButton"
              >
                註冊
              </button>
            </form>
            {/* <h6 className="d-flex justify-content-center my-4">
							OR
						</h6>
						<button
							className="btn w-100 p-3 btn-google"
							type="button"
						>
							<img
								src={Images.ic_google}
								width={24}
								height={24}
								alt="ic_google"
							/>
							以 Google 帳號註冊
						</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
