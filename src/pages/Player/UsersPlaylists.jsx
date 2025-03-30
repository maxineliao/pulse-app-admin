import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
import { Link } from "react-router";
import PlayerCardPlaylist from "../../components/Player/PlayerCardPlaylist";
const { VITE_SPOTIFY_API_PATH } = import.meta.env;
export default function UsersPlaylists() {
	const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
	const [playlistsData, setPlaylistsData] = useState({ items: [] });
	const getUsersPlaylists = async () => {
		try {
			const url = `${VITE_SPOTIFY_API_PATH}me/playlists?limit=50`;
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${spotifyAccessToken}`,
				},
			});
			setPlaylistsData(response.data.items);
			console.log(response.data.items);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getUsersPlaylists();
	}, [spotifyAccessToken]);

	return (
		<>
			<div className="col-lg-9 col-12 player-scrollbar">
				<div className="p-5 border-transparent rounded-4 player-bg mb-5">
					<div className="row mb-5">
						<div className="col-12">
							<div className="d-flex justify-content-between align-items-center mb-5">
								<h4 className="h4 mb-0">我的播放清單</h4>
							</div>
							<div className="row">
								{playlistsData?.length > 0 ? (
									playlistsData.map((item) => {
										return (
											<div
												className="col-6 col-lg-3"
												key={item.id}
											>
												<PlayerCardPlaylist
													cardImage={
														item.images[0].url
													}
													cardTitle={item.name}
                                                    cardText={item.owner.display_name}
                                                    playlistId={item.id}
												/>
											</div>
										);
									})
								) : (
									<div className="col-6 col-lg-3">
										尚無播放清單
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
