import { X } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import imageCompression from "browser-image-compression";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;

export default function AdvertisementModel({
  formData,
  setFormData,
  activeInforId,
  setActiveInforId,
  setInfor,
  getInfor,
}) {
  const handleCloseModal = () => {
    setActiveInforId(null);
  };

  const handleSave = async () => {
    try {
      const config = {
        headers: { Authorization: localStorage.getItem("Token") },
      };
      if (formData.id) {
        await axios.put(
          `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/article/${formData.id}`,
          {
            data: {
              ...formData,
              isPublic: formData.isPublic ? true : false,
            },
          },
          config
        );
      } else {
        await axios.post(
          `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/article`,
          {
            data: {
              ...formData,
              isPublic: formData.isPublic ? true : false,
            },
          },
          config
        );
      }

      customSwal("success", "會員資料儲存成功");

      // 更新本地的使用者資料
      setInfor((prevInfors) =>
        prevInfors.map((infor) =>
          infor.id === activeInforId ? { ...infor, ...formData } : infor
        )
      );

      handleCloseModal();
      getInfor();
    } catch (error) {
      customSwal(
        "error",
        `儲存失敗，無法更新廣告資料：${error.response.data.message}`
      );
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      customSwal("error", `影像壓縮錯誤失敗：${error.message}`);
    }
  };

  const convertBlobToFile = (blob, fileName) => {
    return new File([blob], fileName, {
      type: blob.type,
      lastModified: Date.now(),
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // 檢查檔案格式
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedFormats.includes(file.type)) {
      customSwal("error", "檔案格式錯誤，僅支援 jpg、jpeg 與 png 格式。");
      return;
    }

    const compressedBlob = await compressImage(file);
    const compressedFile = convertBlobToFile(compressedBlob, file.name);
    const fileData = new FormData();
    fileData.append("file-to-upload", compressedFile);

    try {
      const config = {
        headers: { Authorization: localStorage.getItem("Token") },
      };
      const res = await axios.post(
        `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/upload`,
        fileData,
        config
      );

      const uploadedImageUrl = res.data.imageUrl;

      setFormData({
        ...formData,
        imageUrl: uploadedImageUrl,
      });

      customSwal("success", "圖片上傳成功");
    } catch (error) {
      customSwal("error", `圖片上傳失敗：${error.response.data.message}`);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
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
          <div className="modal-body admin-modal-scrollbar">
            <div className="row g-4">
              <div className="col-4">
                <div className="mb-5">
                  <label htmlFor="fileInput" className="form-label">
                    圖片上傳
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="form-control"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="primary-image" className="form-label">
                    主圖
                  </label>
                  <div className="input-group">
                    <input
                      value={formData.imageUrl}
                      onChange={handleChange}
                      name="imageUrl"
                      type="text"
                      id="primary-image"
                      className="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img
                    src={formData.imageUrl || []}
                    alt={formData.title}
                    className="img-fluid"
                  />
                </div>
              </div>

              <div className="col-8">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    廣告標題
                  </label>
                  <input
                    value={formData.title}
                    onChange={handleChange}
                    name="title"
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="請輸入廣告標題"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    展示位置
                  </label>
                  <input
                    value={formData.author}
                    onChange={handleChange}
                    name="author"
                    id="author"
                    type="text"
                    className="form-control"
                    placeholder="請輸入展示位置"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    內容
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                    id="description"
                    className="form-control"
                    rows={4}
                    placeholder="請輸入內容"
                  ></textarea>
                </div>
                <div className="form-check">
                  <input
                    checked={formData.isPublic}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        isPublic: e.target.checked,
                      }))
                    }
                    name="isPublic"
                    type="checkbox"
                    className="form-check-input"
                    id="isEnabled"
                  />
                  <label className="form-check-label" htmlFor="isEnabled">
                    是否啟用
                  </label>
                </div>
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
  );
}
