import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
import PlayerCardAlbum from "../../components/Player/PlayerCardAlbum";
const { VITE_SPOTIFY_API_PATH } = import.meta.env;
export default function UsersSavedAlbums() {
	const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
	const [albumsData, setAlbumsData] = useState({ items: [] });
	const getUsersAlbums = async () => {
		try {
			const url = `${VITE_SPOTIFY_API_PATH}me/albums?limit=50&offset=0`;
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${spotifyAccessToken}`,
				},
			});
			setAlbumsData(response.data);
            // console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (spotifyAccessToken) {
			getUsersAlbums();
		}
	}, [spotifyAccessToken]);

	return (
		<>
			<div className="col-lg-9 col-12 player-scrollbar">
				<div className="p-5 border-transparent rounded-4 player-bg mb-5">
					<div className="row mb-5">
						<div className="col-12">
							<div className="d-flex justify-content-between align-items-center mb-5">
								<h4 className="h4 mb-0">收藏專輯</h4>
							</div>
							<div className="row">
								{albumsData?.items?.length > 0 ? (
									albumsData.items.map((item) => {
										return (
											<div
												className="col-6 col-lg-3"
												key={item.album.id}
											>
												<PlayerCardAlbum
													cardImage={
														item.album.images[1].url
													}
													cardTitle={item.album.name}
													cardContent={
														item.album.release_date
													}
                                                    albumId={item.album.id}
												/>
											</div>
										);
									})
								) : (
									<div className="col-6 col-lg-3">
										尚未收藏專輯
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
