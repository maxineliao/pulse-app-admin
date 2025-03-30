import { createSlice } from "@reduxjs/toolkit";
const playerSlice = createSlice({
	name: "player",
	initialState: {
		isPlaying: false,
		currentTrack: null,
		volume: localStorage.getItem("pulse_player_volume") ? Number(localStorage.getItem("pulse_player_volume")) : 50,
		progress: null,
		repeatState: "off",
		deviceId: null,
		duration: null,
		image: null,
        trackName: null,
        artists: null,
        shuffle: false,
	},
	reducers: {
		setIsPlaying: (state, action) => {
			state.isPlaying = action.payload;
		},
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload;
		},
		setVolume: (state, action) => {
			state.volume = action.payload;
		},
		setProgress: (state, action) => {
			state.progress = action.payload;
		},
		setRepeatState: (state, action) => {
			state.repeatState = action.payload;
		},
		setDeviceId: (state, action) => {
			state.deviceId = action.payload;
		},
		setDuration: (state, action) => {
			state.duration = action.payload;
		},
		setImage: (state, action) => {
			state.image = action.payload;
		},
		setTrackName: (state, action) => {
			state.trackName= action.payload;
		},
		setArtists: (state, action) => {
			state.artists= action.payload;
		},
        setShuffle: (state, action) => {
            state.shuffle= action.payload;
		},

	},
});

export const {
	setIsPlaying,
	setCurrentTrack,
	setVolume,
	setProgress,
	setRepeatState,
	setDeviceId,
	setDuration,
	setImage,
    setTrackName,
    setArtists,
    setShuffle
} = playerSlice.actions;
export default playerSlice.reducer;
