import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSpotifyTokens, logoutSpotify } from "../slice/spotifyAuthSlice";
import axios from "axios";
const { VITE_Spotify_ClientID, VITE_Spotify_redirect_uri } = import.meta.env;

export const useSpotifyAuth = () => {
	const dispatch = useDispatch();
	const spotifyAccessToken = useSelector(
		(state) => state.spotifyAuth.spotifyAccessToken
	);
	const spotifyRefreshToken = useSelector(
		(state) => state.spotifyAuth.spotifyRefreshToken
	);

	const exchangeCodeForToken = useCallback(async () => {
        // 🔹 交換 Authorization Code 取得 Access Token & Refresh Token
        const code = new URLSearchParams(window.location.search).get(
            "code"
        );
        if (!code) return;
        const codeVerifier = localStorage.getItem("code_verifier");
        if (!codeVerifier) return;

        const data = new URLSearchParams();
        data.append("grant_type", "authorization_code");
        data.append("code", code);
        data.append("redirect_uri", VITE_Spotify_redirect_uri);
        data.append("client_id", VITE_Spotify_ClientID);
        data.append("code_verifier", codeVerifier);
		try {
			const response = await axios.post(
				"https://accounts.spotify.com/api/token",
				data,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);
			const spotifyAccessToken = response.data.access_token;
			const spotifyRefreshToken = response.data.refresh_token;
			dispatch(
				setSpotifyTokens({
					spotifyAccessToken,
					spotifyRefreshToken,
				})
			);
			// ✅ 清理 URL，避免 code 重複發送
			window.history.replaceState(
				{},
				document.title,
				window.location.pathname
			);
		} catch (error) {
			console.log(
				"Error exchanging code for token:",
				error.response?.data || error.message
			);
		}
	}, [dispatch]);

     // 🔹 使用 Refresh Token 取得新的 Access Token
     const refreshAccessToken = useCallback(async() => {
        const refreshToken = localStorage.getItem("spotifyRefreshToken");
        if (!refreshToken) {
            console.log("No refresh token found");
            return
        }
        const data = new URLSearchParams();
        data.append("grant_type","refresh_token");
        data.append("refresh_token", refreshToken);
        data.append("client_id", VITE_Spotify_ClientID);
        try {
            const response = await axios.post("https://accounts.spotify.com/api/token", data, {headers: { "Content-Type": "application/x-www-form-urlencoded" },})
            const newAccessToken = response.data.access_token;
            const newRefreshToken = response.data.refresh_token || refreshToken; //不一定會回傳新的

            dispatch(setSpotifyTokens({
                spotifyAccessToken: newAccessToken,
                spotifyRefreshToken: newRefreshToken
            }))
        } catch (error) {
            console.error("Error refreshing access token:", error.response?.data || error.message);
        }
    },[dispatch])

    // 🔹 監聽 URL 變化，自動交換 Code 為 Token
    useEffect(() => {
        exchangeCodeForToken();
    },[exchangeCodeForToken]);

    // 🔹 自動定期刷新 Token（Spotify Access Token 1 小時過期）
    useEffect(() => {
        if(!spotifyAccessToken) return;
        const refreshInterval = setInterval(() => {
            refreshAccessToken();
        }, 1000*60*50)

        return () => clearInterval(refreshInterval);
    },[spotifyAccessToken, spotifyRefreshToken])

    // 🔹 登出時清除 Token
    const logoutFromSpotify = () => {
        dispatch(logoutSpotify());
    }

    return {exchangeCodeForToken, refreshAccessToken, logoutFromSpotify};
};

export default useSpotifyAuth;
