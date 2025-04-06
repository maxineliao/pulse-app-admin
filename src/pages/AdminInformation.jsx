import { useState, useEffect } from "react";
import { Search, Pen } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import AdminModel from "../components/AdminModel";
import Pagination from "../components/Pagination";
export default function AdminInformation() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    id: "",
    plan: "",
    price: "",
  });

  const [activeUserId, setActiveUserId] = useState(null);
  const [pageInfo, setPageInfo] = useState({
    current_page: 1,
    total_pages: 1,
    has_pre: false,
    has_next: false,
  });

  const itemsPerPage = 8; // 每頁顯示的項目數量

  const handleEditClick = (user) => {
    setFormData(user);
    setActiveUserId(user.id);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://pulse-web-player.onrender.com/users"
        );
        const data = response.data;
        setUsers(data);
      } catch (error) {
        customSwal("error", `發生錯誤：${error.response.data}`);
      }
    };

    fetchUsers();
  }, []);

  // 獲取當前頁面顯示的資料，加入模糊查詢功能
  const currentPageData = users
    .filter((user) => {
      const keyword = searchKeyword.toLowerCase();
      return (
        user.username.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.plan.toLowerCase().includes(keyword) ||
        user.price.toString().toLowerCase().includes(keyword)
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
      <div className="col-9 col-md-10">
        <div className="navbar-information my-5 me-5 d-flex flex-column">
          <div className="m-5">
            <h1 className="pb-5 admin-name-bottom">會員資訊管理</h1>
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
                      ID
                    </th>
                    <th className="p-3 text-nowrap" scope="col">
                      使用者名稱
                    </th>
                    <th className="p-3 text-nowrap" scope="col">
                      Email
                    </th>
                    <th className="p-3 text-nowrap" scope="col">
                      身份
                    </th>
                    <th className="p-3 text-nowrap" scope="col">
                      價格
                    </th>
                    <th className="p-3 text-nowrap" scope="col">
                      動作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((user, index) => (
                    <tr key={index}>
                      <td className="text-secondary p-3 text-nowrap">
                        {user.id}
                      </td>
                      <th
                        scope="row"
                        className="text-secondary p-3 text-nowrap"
                      >
                        {user.username}
                      </th>
                      <td className="text-secondary p-3 text-nowrap">
                        {user.email}
                      </td>
                      <td className="text-secondary p-3 text-nowrap">
                        {user.plan}
                      </td>
                      <td className="text-secondary p-3 text-nowrap">
                        {user.price}
                      </td>
                      <td className="p-3">
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
                                activeUserId === user.id ? "yellow" : "white",
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              pageInfo={pageInfo}
              setPageInfo={setPageInfo}
              users={users}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
      <AdminModel
        formData={formData}
        setFormData={setFormData}
        activeUserId={activeUserId}
        setActiveUserId={setActiveUserId}
        setUsers={setUsers}
      />
    </>
  );
}
