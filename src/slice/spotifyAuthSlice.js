import { createSlice } from "@reduxjs/toolkit"; 
// const { VITE_Spotify_ClientID, VITE_Spotify_redirect_uri } = import.meta.env;

const spotifyAuthSlice = createSlice({
	name: "spotifyAuth",
	initialState: {
        spotifyAccessToken: localStorage.getItem('spotifyAccessToken') || null,
        spotifyRefreshToken: localStorage.getItem('spotifyRefreshToken') || null,
        spotifyIsAuthentication: !!localStorage.getItem('spotifyAccessToken'),
    },
	reducers: {
		setSpotifyTokens: (state, action) => {
            state.spotifyAccessToken = action.payload.spotifyAccessToken;
            state.spotifyRefreshToken = action.payload.spotifyRefreshToken;
            state.spotifyIsAuthentication = true;

            localStorage.setItem("spotifyAccessToken", action.payload.spotifyAccessToken);
            localStorage.setItem("spotifyRefreshToken", action.payload.spotifyRefreshToken);
        },
        logoutSpotify: (state) => {
            state.spotifyAccessToken = null;
            state.spotifyRefreshToken = null;
            state.spotifyIsAuthentication = false;

            localStorage.removeItem("spotifyAccessToken");
            localStorage.removeItem("spotifyRefreshToken");
        }
	},
});

export const { setSpotifyTokens, logoutSpotify } = spotifyAuthSlice.actions;
export const selectSpotifyAccessToken = (state) => state.spotifyAuth.spotifyAccessToken; 
export const selectSpotifyRefreshToken = (state) => state.spotifyAuth.spotifyRefreshToken; 
export default spotifyAuthSlice.reducer;