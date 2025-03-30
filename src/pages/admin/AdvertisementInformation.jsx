import { useState } from "react";
import { Search, X, Pen, Plus } from "lucide-react";
import Swal from "sweetalert2";

export default function AdvertisementInformation() {
  const [formData, setFormData] = useState({
    name: "",
    placement: "",
    status: "",
  });

  const [activeUserId, setActiveUserId] = useState(null);
  const [pageInfo, setPageInfo] = useState({
    current_page: 1,
    total_pages: 1,
    has_pre: false,
    has_next: false,
  });

  const itemsPerPage = 8; // 每頁顯示的項目數量

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEditClick = (user) => {
    setFormData(user);
    setActiveUserId(user.id);
  };

  const handleCloseModal = () => {
    setActiveUserId(null);
  };

  const handleInsertClick = () => {
    setFormData({
      name: "",
      placement: "",
      status: "",
    });
    setActiveUserId(null);
  };

  const handleSave = () => {
    Swal.fire({
      icon: "success",
      title: "會員資料儲存成功",
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
    handleCloseModal();
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

  const users = [
    {
      name: "免費試用期好評延長",
      time: "2025/01/06 09:31",
      placement: "官網首頁",
      status: "啟用",
    },
    {
      name: "PULSE推薦金曲100首",
      time: "2024/12/31 15:00",
      placement: "Web Player首頁",
      status: "啟用",
    },
    {
      name: "PULSE推薦金曲100首",
      time: "2024/12/31 15:00",
      placement: "Web Player首頁",
      status: "啟用",
    },
    {
      name: "PULSE推薦金曲100首",
      time: "2024/12/31 15:00",
      placement: "Web Player首頁",
      status: "啟用",
    },
    {
      name: "PULSE推薦金曲100首",
      time: "2024/12/31 15:00",
      placement: "Web Player首頁",
      status: "啟用",
    },
    {
      name: "免費試用期好評延長",
      time: "2025/01/06 09:31",
      placement: "官網首頁",
      status: "啟用",
    },
    {
      name: "免費試用期好評延長",
      time: "2025/01/06 09:31",
      placement: "官網首頁",
      status: "啟用",
    },
    {
      name: "免費試用期好評延長",
      time: "2025/01/06 09:31",
      placement: "官網首頁",
      status: "啟用",
    },
    {
      name: "免費試用期好評延長",
      time: "2025/01/06 09:31",
      placement: "官網首頁",
      status: "啟用",
    },
    {
      name: "免費試用期好評延長",
      time: "2025/01/06 09:31",
      placement: "官網首頁",
      status: "啟用",
    },
  ];

  // 計算總頁數
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // 獲取當前頁面顯示的資料
  const currentPageData = users.slice(
    (pageInfo.current_page - 1) * itemsPerPage,
    pageInfo.current_page * itemsPerPage
  );

  return (
    <>
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
            >
              <input
                type="search"
                placeholder="輸入關鍵字"
                className="form-control"
                aria-label="Search"
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
                      發佈時間
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
                  {currentPageData.map((user, index) => (
                    <tr key={index}>
                      <th
                        scope="row"
                        className="text-secondary p-3 text-nowrap"
                      >
                        {user.name}
                      </th>
                      <td className="text-secondary p-3 text-nowrap">
                        {user.time}
                      </td>
                      <td className="text-secondary p-3 text-nowrap">
                        {user.placement}
                      </td>
                      <td className="text-secondary p-3 text-nowrap">
                        {user.status}
                      </td>
                      <td className="p-3 text-nowrap">
                        <button
                          type="button"
                          className="btn icon p-0"
                          data-bs-toggle="modal"
                          data-bs-target="#modalEdit"
                          onClick={() => handleEditClick(user)}
                        >
                          <Pen
                            style={{
                              color:
                                activeUserId === user.name ? "yellow" : "white",
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
      <div
        className="modal fade"
        id="modalEdit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="modalEditLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content navbar-information">
            <div className="modal-header d-flex justify-content-between border-0">
              <h3 className="modal-title" id="modalEditLabel">
                新增 / 編輯廣告
              </h3>
              <button
                type="button"
                className="btn-edit-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <X />
              </button>
            </div>
            <div className="modal-body d-flex flex-column flex-md-row admin-modal-scrollbar">
              <div>
                <div className="my-3">
                  <label htmlFor="name" className="form-label">
                    廣告標題
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="linK" className="form-label">
                    廣告連結
                  </label>
                  <input
                    className="form-control"
                    id="linK"
                    type="text"
                    value={formData.linK}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="detail" className="form-label">
                    文字內容
                  </label>
                  <input
                    className="form-control"
                    id="detail"
                    type="text"
                    value={formData.detail}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="placement" className="form-label">
                    展示位置
                  </label>
                  <input
                    className="form-control"
                    id="placement"
                    type="text"
                    value={formData.placement}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pic" className="form-label">
                    封面圖片
                  </label>
                  <input
                    className="form-control"
                    id="pic"
                    type="text"
                    value={formData.pic}
                    onChange={handleChange}
                  />
                </div>
                <div className="pb-3">
                  <label htmlFor="status" className="form-label">
                    狀態
                  </label>
                  <select
                    className="form-control"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      請選擇狀態
                    </option>
                    <option value="Y">啟用</option>
                    <option value="N">停用</option>
                  </select>
                </div>
              </div>
              <div className="ms-5">
                <div className="my-3">
                  <label className="form-label">預覽</label>
                  <img
                    src={formData.imageUrl}
                    alt={formData.title}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn px-5 py-2"
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                取消
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={handleSave}
                className="btn btn-warning px-5 py-2"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
