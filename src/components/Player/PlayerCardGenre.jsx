import PlayerImages from "../../Images";
export default function PlayerCardGenre(
    {
        cardImage,
        cardTitle
    }
) {
	return (
		<a className="card-genre position-relative p-2 rounded-4 d-block">
			<img
				src={cardImage}
				alt=""
				className="w-100 rounded-4"
			/>
			<h6 className="h6 mb-0 position-absolute p-3 bottom-0">
				{cardTitle}
			</h6>
		</a>
	);
}
