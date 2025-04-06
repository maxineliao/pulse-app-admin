import { X } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

export default function AdminModel({
  formData,
  setFormData,
  activeUserId,
  setActiveUserId,
  setUsers,
}) {
  const handleCloseModal = () => {
    setActiveUserId(null);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://pulse-web-player.onrender.com/users/${activeUserId}`,
        formData
      );

      customSwal("success", "會員資料儲存成功");

      // 更新本地的使用者資料
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === activeUserId ? { ...user, ...formData } : user
        )
      );

      handleCloseModal();
    } catch (error) {
      customSwal(
        "error",
        `儲存失敗，無法更新使用者資料：${error.response.data}`
      );
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
              編輯使用者資料
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
          <div className="modal-body admin-modal-scrollbar">
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                ID
              </label>
              <input
                className="form-control"
                id="id"
                type="text"
                value={formData.id}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="my-3">
              <label htmlFor="name" className="form-label">
                使用者名稱
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.username}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="plan" className="form-label">
                身份
              </label>
              <input
                className="form-control"
                id="plan"
                type="text"
                value={formData.plan}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                價格
              </label>
              <input
                className="form-control"
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    // 只允許數字
                    handleChange(e);
                  }
                }}
              />
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
  );
}
