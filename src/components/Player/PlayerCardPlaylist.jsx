import { Link } from "react-router";
export default function PlayerCardPlaylist({ cardImage, cardTitle, cardText, playlistId }) {
  return (
    <Link to={`/player/playlist/${playlistId}`} className="card card-playlist me-5 w-100 p-5 rounded-4 d-block text-decoration-none">
      <div className="d-flex justify-content-center">
        <img
          src={cardImage}
          className="card-img-top rounded-4 d-block object-fit-cover player-img"
          alt={cardTitle}
        />
      </div>
      <div className="card-body px-0">
        <h6 className="card-title text-center">{cardTitle}</h6>
        <p className="card-text text-secondary text-center">
          擁有者：{cardText}
        </p>
      </div>
    </Link>
  );
}
