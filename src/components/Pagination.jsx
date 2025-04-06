export default function Pagination({
  pageInfo,
  setPageInfo,
  users,
  itemsPerPage,
}) {
  const handleClick = (e, page) => {
    e.preventDefault();
    setPageInfo((prevPageInfo) => ({
      ...prevPageInfo,
      current_page: page,
      has_pre: page > 1,
      has_next: page < prevPageInfo.total_pages,
    }));
  };

  // 計算總頁數
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="d-flex justify-content-center mt-4">
      <nav>
        <ul className="pagination">
          <li
            className={`page-item ${pageInfo.current_page === 1 && "disabled"}`}
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
  );
}
