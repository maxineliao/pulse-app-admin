export default function PlayerAlbumTrack({ cardTitle, cardContent, cardTime, onClick }) {
  const formatDuration = (cardTime) => {
    let seconds = Math.floor(cardTime / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60; // 取餘數作為剩餘秒數
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <a className="card-song p-1 d-flex align-items-center rounded-4 d-block text-decoration-none mb-1" onClick={onClick}>
      <div className="d-flex flex-column align-items-start">
        <h6 className="fw-medium mb-1">{cardTitle}</h6>
        <p className="fs-7 mb-0">{cardContent}</p>
      </div>
      <div className="d-flex flex-column align-items-end ms-auto">
        <p className="fs-7 mb-0">{formatDuration(cardTime)}</p>
      </div>
    </a>
  );
}
