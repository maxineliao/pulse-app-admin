import { Link } from "react-router";
export default function PlayerCardAlbum({ cardTitle, cardContent, cardImage, albumId }) {
  return (
    <Link className="card-album p-2 rounded-4 d-block text-decoration-none h-100" to={`/player/albumTrack_detail?id=${albumId}`} >
      <div className="img-container ratio ratio-1x1 mb-3">
        <img src={cardImage} alt={cardTitle} className="rounded-4 w-100 object-fit-cover" />
      </div>
      <h6 className="h6 mb-1">{cardTitle}</h6>
      <p className="fs-7 mb-0 text-secondary">{cardContent}</p>
    </Link>
  );
}
