import "../App.css";
import { createHashRouter } from "react-router-dom";
import Login from "../layouts/Login";
import AdminInformation from "../pages/AdminInformation";
import AdvertisementInformation from "../pages/AdvertisementInformation";
import AdminHeader from "../layouts/AdminHeader";
import "../assets/scss/all.scss";

const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminHeader />,
    children: [
      {
        path: "AdminInformation",
        element: <AdminInformation />,
      },
      {
        path: "AdvertisementInformation",
        element: <AdvertisementInformation />,
      },
    ],
  },
]);

export default router;
