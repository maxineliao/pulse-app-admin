import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
import PlayerCardArtist from "../../components/Player/PlayerCardArtist";
const { VITE_SPOTIFY_API_PATH } = import.meta.env;
export default function UsersFollowedArtists() {
	const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
	const [artistsData, setArtistsData] = useState({ items: [] });
	const getUsersArtists = async () => {
		try {
			const url = `${VITE_SPOTIFY_API_PATH}me/following?type=artist&limit=10`;
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${spotifyAccessToken}`,
				},
			});
			setArtistsData(response.data);
            // console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (spotifyAccessToken) {
			getUsersArtists();
		}
	}, [spotifyAccessToken]);

	return (
		<>
			<div className="col-lg-9 col-12 player-scrollbar">
				<div className="p-5 border-transparent rounded-4 player-bg mb-5">
					<div className="row mb-5">
						<div className="col-12">
							<div className="d-flex justify-content-between align-items-center mb-5">
								<h4 className="h4 mb-0">收藏藝人</h4>
							</div>
							<div className="row">
								{artistsData?.artists?.items?.length > 0 ? (
									artistsData.artists.items.map((item) => {
										return (
											<div
												className="col-6 col-lg-3"
												key={item.id}
											>
												<PlayerCardArtist
													cardImage={
														item.images[1].url
													}
													cardTitle={item.name}
                                                    artistId={item.id}
												/>
											</div>
										);
									})
								) : (
									<div className="col-6 col-lg-3">
										尚未收藏藝人
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
