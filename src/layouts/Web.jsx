import { useEffect } from "react";
import { Outlet } from "react-router";
import WebHeader from "../components/Web/WebHeader";
import { useSelector, useDispatch } from 'react-redux';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { selectSpotifyAccessToken, selectSpotifyRefreshToken, logoutSpotify } from "../slice/spotifyAuthSlice";

function Web() {
    const dispatch = useDispatch();
    const { refreshAccessToken } = useSpotifyAuth();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
    const spotifyRefreshToken = useSelector(selectSpotifyRefreshToken);
    useEffect(() => {
        if (isAuth) {
            if(spotifyAccessToken && spotifyRefreshToken) {
                refreshAccessToken();
            } else {
                dispatch(logoutSpotify());
            }
        }
    },[])
    return (
        <>
            <WebHeader />
            <Outlet />
        </>
    )
}

export default Web;