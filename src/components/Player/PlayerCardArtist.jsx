import { Link } from "react-router";
export default function PlayerCardArtist({ cardImage, cardTitle, artistId }) {
  return (
    <Link className="card card-peoplelist mb-5 w-100 p-5 rounded-4 d-block text-decoration-none" to={`/player/artist_detail?id=${artistId}&name=${cardTitle}`}>
      <div className="d-flex justify-content-center">
        <img
          src={cardImage}
          className="card-img-top rounded-circle d-block object-fit-cover player-img"
          alt={cardTitle}
        />
      </div>
      <div className="card-body px-0">
        <h6 className="card-title text-center mb-0">{cardTitle}</h6>
      </div>
    </Link>
  );
}
