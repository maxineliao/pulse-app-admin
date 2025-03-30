import { Outlet } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { logoutSpotify } from "../slice/spotifyAuthSlice";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import PlayerHeader from "../components/Player/PlayerHeader";
import PlayerSideMenu from "../components/Player/PlayerSideMenu";
import PlayerComp from "../components/Player/PlayerComp";


function Player() {
	const dispatch = useDispatch();
    const { refreshAccessToken } = useSpotifyAuth();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const spotifyAccessToken = useSelector((state) => state.spotifyAuth.spotifyAccessToken);
    const spotifyRefreshToken = useSelector((state) => state.spotifyAuth.spotifyRefreshToken);

    useEffect(() => {
        if (isAuth) {
            if(spotifyAccessToken && spotifyRefreshToken) {
                refreshAccessToken();
            } else {
                dispatch(logoutSpotify());
            }
        }
		if (!document.getElementById('spotify-sdk')) {
			const script = document.createElement("script");
			script.id = "spotify-sdk"; // 確保只插入一次
			script.src = "https://sdk.scdn.co/spotify-player.js";
			script.async = true;
			document.body.appendChild(script);
		} 
    },[])

	return (
		<>
			<PlayerHeader />
			<div className="container-fluid">
				<div className="row d-flex flex-lg-row flex-column-reverse">
                    <div className="col-lg-3 col-12 player-scrollbar player-scrollbar-sm">
                        <PlayerSideMenu />
                    </div>    
					<Outlet />
				</div>
			</div>
			<PlayerComp />
		</>
	);
}
export default Player;
