export default function PlayerCardSong({
	cardTitle,
	cardContent,
	cardImage,
	onClick,
  cardTime,
}) {
  const formatDuration = (cardTime) => {
    let seconds = Math.floor(cardTime / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60; // 取餘數作為剩餘秒數
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <a className="card-song p-1 d-flex align-items-center rounded-4 d-block text-decoration-none mb-1" onClick={onClick}>
      <img
        src={cardImage}
        alt={cardTitle}
        className="img ratio ratio-1x1 img-fluid me-3 rounded-4"
      />
      <div className="d-flex flex-column align-items-start">
        <h6 className="h6 fw-medium mb-1">{cardTitle}</h6>
        <p className="fs-7 mb-0">{cardContent}</p>
      </div>
      <div className="d-flex flex-column align-items-end ms-auto">
        <p className="fs-7 mb-0">{formatDuration(cardTime)}</p>
      </div>
    </a>
  );
}
