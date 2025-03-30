import axios from "axios";
const { VITE_SPOTIFY_API_PATH } = import.meta.env;

//取得用戶資料
export const getSpotifyUsersProfile = async (accessToken) => {
	try {
		let url = `${VITE_SPOTIFY_API_PATH}me`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const userData = response.data;
		return userData;
	} catch (error) {
		console.log(`Can't get user's profile: ${error.message?.data}`);
	}
};
//取得用戶裝置
export const getDevices = async (accessToken) => {
	const url = "https://api.spotify.com/v1/me/player/devices";
	const response = await axios.get(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	console.log(response);
};
//播放曲目
export const playTrack = async (accessToken, context, offsetUri, deviceId) => {
	try {
		let url = `${VITE_SPOTIFY_API_PATH}me/player/play?device_id=${deviceId}`;
		const response = await axios.put(
			url,
			context === null
				? {
						uris: [offsetUri],
				  }
				: {
						context_uri: context,
						offset: {
							uri: offsetUri,
						},
				  },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
        console.log(response);
	} catch (error) {
		console.log(error);
	}
};

//暫停播放
export const pauseTrack = async (accessToken) => {
	try {
		let url = `${VITE_SPOTIFY_API_PATH}me/player/pause`;
		const response = await axios.put(url, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (error) {
		console.log(error?.response?.message);
	}
};

//隨機播放 shuffle
export const playbackShuffle = async (accessToken, state) => {
	try {
		let url = `${VITE_SPOTIFY_API_PATH}me/player/shuffle?state=${state}`;
		const response = await axios.put(url, null, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

//循環播放（關閉or清單循環or單曲循環)
export const repeatMode = async (accessToken, mode, deviceId) => {
	try {
		let url = `${VITE_SPOTIFY_API_PATH}me/player/repeat?state=${mode}&device_id=${deviceId}`;
		const response = await axios.put(url, null, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

//取得用戶播放清單
export const usersPlaylists = async (accessToken) => {
    try {
        const url = `${VITE_SPOTIFY_API_PATH}me/playlists`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};