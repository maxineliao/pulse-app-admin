import {
	Search,
	Music,
	Telescope,
	History,
	Plus,
	Library,
	DiscAlbum,
	Heart,
	SquareUserRound,
	Pin,
} from "lucide-react";
import axios from "axios";
import PlayerImages from "../../Images";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
const { VITE_SPOTIFY_API_PATH } = import.meta.env;
import { useEffect, useState } from "react";

export default function PlayerSideMenu() {
	const [userPlaylists, setUserPlaylists] = useState();
	const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
	const getUsersPlaylists = async () => {
		try {
			const url = `${VITE_SPOTIFY_API_PATH}me/playlists?limit=10`;
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${spotifyAccessToken}`,
				},
			});
			setUserPlaylists(response.data.items);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getUsersPlaylists();
	}, []);

	return (
		<>
			{/* <ul className="side-menu list-group mb-3 border-transparent rounded-4 player-bg">
				<li className="list-group-item border-0 pb-0 my-1">
					<NavLink
						to="/player/index"
						className="d-flex text-decoration-none align-items-center py-3 px-2 rounded-3"
					>
						<Telescope className="icon me-3" />
						<h6 className="mb-0">發現</h6>
					</NavLink>
				</li>
				<li className="list-group-item border-0 pt-0 my-1">
					<a
						href="#"
						className="d-flex text-decoration-none align-items-center py-3 px-2 rounded-3"
					>
						<Search className="icon me-3" />
						<h6 className="mb-0">搜尋</h6>
					</a>
				</li>
				<li className="list-group-item border-0 pt-0">
					<NavLink
						to="/player/recently_played"
						className="d-flex text-decoration-none align-items-center py-3 px-2 rounded-3"
					>
						<History className="icon me-3" />
						<h6 className="mb-0">最近播放</h6>
					</NavLink>
				</li>
			</ul> */}
			<ul className="side-menu list-group rounded-4 border-transparent mb-9 mb-lg-5 player-bg">
				<li className="list-group-item border-0 d-flex align-items-center player-list-border p-4">
					<Music className="me-5" />
					<h5 className="mb-0">我的音樂庫</h5>
					{/* <button
						type="button"
						className="btn ms-auto player-icon-btn"
					>
						<Plus className="icon rotate90" />
					</button> */}
				</li>
				{/* <li className="list-group-item border-0 py-0 my-1">
					<a
						href="#"
						className="d-flex text-decoration-none align-items-center py-3 px-2 rounded-3"
					>
						<Library className="icon me-3" />
						<h6 className="mb-0">總覽</h6>
					</a>
				</li> */}
				<li className="list-group-item border-0 py-0 my-1">
					<NavLink
						to="/player/saved_albums"
						className="d-flex text-decoration-none align-items-center py-3 px-2 rounded-3"
					>
						<DiscAlbum className="icon me-3" />
						<h6 className="mb-0">收藏專輯</h6>
					</NavLink>
				</li>
				<li className="list-group-item border-0 py-0 my-1">
					<NavLink
						to="/player/followed_artists"
						className="d-flex text-decoration-none align-items-center py-3 px-2 rounded-3"
					>
						<SquareUserRound className="icon me-3" />
						<h6 className="mb-0">收藏藝人</h6>
					</NavLink>
				</li>
				<li className="list-group-item border-0 py-0 player-list-border my-1">
					<NavLink
						to="my_playlists"
						className="d-flex text-decoration-none align-items-center py-3 px-2 rounded-3 mb-1"
					>
						<Heart className="icon me-3" />
						<h6 className="mb-0">我的播放清單</h6>
					</NavLink>
				</li>
				{/* <li className="list-group-item border-0 px-3 pt-1">
					<a href="#" className="d-flex text-decoration-none p-2 rounded-3">
						<img
							className="rounded-2"
							src={PlayerImages["playlist-1"]}
							width="64"
							height="64"
						/>
						<div className="ms-3">
							<h6 className="mt-1">已按讚的歌曲</h6>
							<p className="text-secondary mb-0">
								<Pin
									fill="white"
									size={16}
									className="icon text-white me-2"
								/>
								500 首歌曲
							</p>
						</div>
					</a>
				</li> */}
				{userPlaylists && userPlaylists.length > 0
					? userPlaylists.map((item) => {
							return (
								<li
									className="list-group-item border-0 px-3"
									key={item.id}
								>
									<NavLink
										to={`/player/playlist/${item.id}`}
										className="d-flex text-decoration-none p-2 rounded-3"
									>
										<img
											className="rounded-2 d-block"
											src={item.images[0].url}
											alt="discoveries every week"
											width="64"
											height="64"
										/>
										<div className="ms-3">
											<h6 className="mt-1">
												{item.name}
											</h6>
											<p className="text-secondary mb-0">
												{item.tracks.total} 首歌曲
											</p>
										</div>
									</NavLink>
								</li>
							);
					  })
					: <li
					className="list-group-item border-0 px-3"
				>
						<div className="ms-3">
							<h6 className="mt-1">
							尚無播放清單
							</h6>
						</div>
					
				</li>}
			</ul>
		</>
	);
}
