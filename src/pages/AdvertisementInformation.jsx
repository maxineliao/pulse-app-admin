import { useState, useEffect } from "react";
import { Search, Pen, Plus } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import AdvertisementModel from "../components/AdvertisementModel";
import { Loading } from "../components/Loading";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;

export default function AdvertisementInformation() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [formData, setFormData] = useState({
    author: "",
    description: "",
    image: "",
    isPublic: true,
    tag: [],
    title: "",
    content: "無",
    create_at: "",
    imageUrl: "",
  });

  const [activeInforId, setActiveInforId] = useState(null);
  const [pageInfo, setPageInfo] = useState({
    current_page: 1,
    total_pages: 1,
    has_pre: false,
    has_next: false,
  });

  const itemsPerPage = 8; // 每頁顯示的項目數量

  const handleEditClick = (infor) => {
    setFormData({
      ...infor,
      content: "無",
    });
    setActiveInforId(infor.id);
  };

  const handleInsertClick = () => {
    setFormData({
      author: "",
      description: "",
      image: "",
      isPublic: false,
      tag: [],
      title: "",
      content: "無",
      create_at: new Date().getTime(),
      imageUrl: "",
    });
    setActiveInforId(null);
  };

  const handleClick = (e, page) => {
    e.preventDefault();
    setPageInfo((prevPageInfo) => ({
      ...prevPageInfo,
      current_page: page,
      has_pre: page > 1,
      has_next: page < prevPageInfo.total_pages,
    }));
  };

  const [infor, setInfor] = useState([]);

  const getInfor = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: localStorage.getItem("Token") },
      };
      const response = await axios.get(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/articles`,
        config
      );
      const data = response.data;
      setInfor(data.articles);
    } catch (error) {
      customSwal("error", `發生錯誤：${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfor();
  }, []);

  // 計算總頁數
  const totalPages = Math.ceil((infor?.length || 0) / itemsPerPage);

  // 獲取當前頁面顯示的資料
  const currentPageData = infor
    .filter((item) => {
      const keyword = searchKeyword.toLowerCase();
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.author.toLowerCase().includes(keyword) ||
        (keyword === "啟用" && item.isPublic === true) ||
        (keyword === "未啟用" && item.isPublic === false)
      );
    })
    .slice(
      (pageInfo.current_page - 1) * itemsPerPage,
      pageInfo.current_page * itemsPerPage
    );

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
    <>
      {isLoading && <Loading />}
      <div className="col-9 col-md-10">
        <div className="navbar-information my-5 me-5 d-flex flex-column">
          <div className="m-5">
            <div className="d-flex justify-content-between admin-name-bottom">
              <div>
                <h1 className="pb-5 ">廣告資訊管理</h1>
              </div>
              <div className="d-flex align-items-start">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEdit"
                  className="btn btn-warning px-5 py-2 d-none d-sm-block"
                  onClick={() => handleInsertClick()}
                >
                  新增
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEdit"
                  className="btn btn-warning px-3 py-2 d-block d-sm-none"
                  onClick={() => handleInsertClick()}
                >
                  <Plus />
                </button>
              </div>
            </div>
            <form
              className="d-flex information-search align-items-center mt-4"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                placeholder="輸入關鍵字"
                className="form-control pe-6"
                aria-label="Search"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button
                className="information-icon-search information-icon-btn"
                type="submit"
              >
                <Search />
              </button>
            </form>
            <div className="overflow-x-auto admin-scrollbar">
              <table className="mt-5 col-12">
                <thead>
                  <tr>
                    <th className="p-3 text-nowrap" scope="col">
                      廣告標題
                    </th>
                    <th className="p-3 text-nowrap" scope="col">
                      內容
                    </th>
                    <th className="p-3 text-nowrap" scope="col">
                      展示位置
                    </th>
                    <th className="p-3 text-nowrap" scope="col">
                      狀態
                    </th>
                    <th className="p-3 text-nowrap" scope="col">
                      動作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((infor, index) => (
                    <tr key={index}>
                      <th
                        scope="row"
                        className="text-secondary p-3 text-nowrap"
                      >
                        {infor.title}
                      </th>
                      <td className="text-secondary p-3 text-nowrap">
                        {infor.description}
                      </td>
                      <td className="text-secondary p-3 text-nowrap">
                        {infor.author}
                      </td>
                      <td className="text-secondary p-3 text-nowrap">
                        {infor.isPublic ? (
                          <span className="text-success">啟用</span>
                        ) : (
                          <span>未啟用</span>
                        )}
                      </td>
                      <td className="p-3 text-nowrap">
                        <button
                          type="button"
                          className="btn icon p-0"
                          data-bs-toggle="modal"
                          data-bs-target="#modalEdit"
                          onClick={() => handleEditClick(infor)}
                        >
                          <Pen
                            style={{
                              color:
                                activeInforId === infor.id ? "yellow" : "white",
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      pageInfo.current_page === 1 && "disabled"
                    }`}
                  >
                    <a
                      onClick={(e) => handleClick(e, pageInfo.current_page - 1)}
                      className="page-link"
                      href="#"
                    >
                      上一頁
                    </a>
                  </li>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        pageInfo.current_page === index + 1 && "active"
                      }`}
                    >
                      <a
                        onClick={(e) => handleClick(e, index + 1)}
                        className="page-link"
                        href="#"
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      pageInfo.current_page === totalPages ? "disabled" : ""
                    }`}
                  >
                    <a
                      onClick={(e) => handleClick(e, pageInfo.current_page + 1)}
                      className="page-link"
                      href="#"
                    >
                      下一頁
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <AdvertisementModel
        formData={formData}
        setFormData={setFormData}
        activeInforId={activeInforId}
        setActiveInforId={setActiveInforId}
        setInfor={setInfor}
        getInfor={getInfor}
      />
    </>
  );
}
