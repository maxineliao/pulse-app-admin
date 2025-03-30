import { playTrack, pauseTrack, getDevices, playbackShuffle, repeatMode, usersPlaylists } from "../utils/spotifyApi";
import { useSelector, useDispatch } from "react-redux";
import {
	setIsPlaying,
	setCurrentTrack,
	setProgress,
	setVolume,
	setRepeatState,
	setDeviceId,
	setDuration,
	setImage,
	setTrackName,
	setArtists,
    setShuffle,
} from "../slice/playerSlice";
import { useEffect, useRef, useState } from "react";
import { selectSpotifyAccessToken } from "../slice/spotifyAuthSlice";

export const useSpotifyPlayer = () => {
	const dispatch = useDispatch();
	const [player, setPlayer] = useState();
	const accessToken = useSelector(selectSpotifyAccessToken);
	const deviceId = useSelector((state) => state.player.deviceId);
	const playing = useSelector((state) => state.player.isPlaying);
    const shuffleStateRef = useRef(null);
    shuffleStateRef.current = useSelector((state) => state.player.shuffle);
    const currentVolumeRef = useRef(null);
    currentVolumeRef.current = useSelector((state) => state.player.volume);
    const repeatStateRef = useRef(null);
    repeatStateRef.current = useSelector((state) => state.player.repeatState);
    const isPlayerInitialized = useRef(false);

    useEffect(()=> {
        // console.log(repeatStateRef.current);
    })

	useEffect(() => {
		if (!accessToken) return;

		const initializePlayer = () => {
			if (!window.Spotify) {
				console.log("Spotify SDK Not Ready");
				return;
			}
			if (player) return;

			const spotifyPlayer = new window.Spotify.Player({
				name: "PULSE Web Player",
				getOAuthToken: (cb) => {
					cb(accessToken);
				},
				volume: currentVolumeRef.current / 100,
			});

			spotifyPlayer.addListener("player_state_changed", (state) => {
				if (!state) return;
				console.log(state);
				dispatch(setCurrentTrack(state.track_window.current_track.uri));
				dispatch(setIsPlaying(!state.paused));
				dispatch(setProgress(state.position));
				dispatch(setRepeatState(Number(state.repeat_mode) === 1 ? "context" : Number(state.repeat_mode) === 2 ? "track" : "off"));
				dispatch(setDuration(state.duration));
				dispatch(setImage(state.track_window.current_track.album.images[0].url));
				dispatch(setTrackName(state.track_window.current_track.name));
				dispatch(setArtists(state.track_window.current_track.artists.map((artist) => artist.name).join(", ")));
				dispatch(setShuffle(state.shuffle));
			});

			spotifyPlayer.addListener("ready", ({ device_id }) => {
				dispatch(setDeviceId(device_id));
				console.log("Ready with Device ID", device_id);
			});

			spotifyPlayer.addListener("not_ready", ({ device_id }) => {
				console.log("Device ID has gone offline", device_id);
			});

			spotifyPlayer.addListener("initialization_error", ({ message }) => {
				console.error(message);
			});

			spotifyPlayer.addListener("authentication_error", ({ message }) => {
				console.error(message);
			});

			spotifyPlayer.addListener("account_error", ({ message }) => {
				console.error(message);
			});

			spotifyPlayer.connect();
			setPlayer(spotifyPlayer);
            isPlayerInitialized.current = true;
		};

        // SDK 已載入情況下立即初始化
		if (window.Spotify) {
			initializePlayer();
		} else {
			window.onSpotifyWebPlaybackSDKReady = initializePlayer;
		}

        // 如果播放器已存在但斷線，再觸發 connect
        if (player && !player._options?.id) {
            console.log("播放器已存在但斷線，重新連線");
            player.connect();
        }

		return () => {
            if(player) {
                player.disconnect();
                isPlayerInitialized.current = false;
                setPlayer(null);
            }
        }
	}, [accessToken, dispatch]);

    useEffect(()=> {
        if (player && typeof player.pause == "function") {
            setVolume(currentVolumeRef.current / 100)
		}
    },[currentVolumeRef])

    const checkPlayerReady = () => {
        if (!player || typeof player.pause !== "function") {
			console.log("Player is not ready yet");
			return;
		}
    }

	const getUserDevices = () => {
		getDevices(accessToken);
	};

	const play = async (context, offsetUri) => {
		if (player) {
			await playTrack(accessToken, context, offsetUri, deviceId);
			dispatch(setIsPlaying(true));
		}
	};

	const pause = async () => {
		if (player) {
			await pauseTrack(accessToken);
			dispatch(setIsPlaying(false));
		}
	};

	const togglePlay = () => {
		checkPlayerReady();

		if (!playing) {
			player.resume().then(() => {
				dispatch(setIsPlaying(true));
			});
		} else {
			player.pause().then(() => {
				dispatch(setIsPlaying(false));
			});
		}
	};

	const skipToNext = () => {
		checkPlayerReady();

		player.nextTrack().then(() => {
			console.log("跳至下一首");
		}).catch((error) => {
			console.log(error);
		});
	};

	const skipToPrev = () => {
		checkPlayerReady();

		player.previousTrack().then(() => {
			console.log("跳至上一首");
		}).catch((error) => {
			console.log(error);
		});
	};

	const toggleShuffle = async () => {
		checkPlayerReady();

		await playbackShuffle(accessToken, !shuffleStateRef.current);
		// console.log(`shuffle state: ${shuffleStateRef.current}`);
	};
    //改變音量
    const volumeControl = (newVolume) => {
        checkPlayerReady();

        player.setVolume(newVolume / 100).then(() => {
            dispatch(setVolume(newVolume));
            localStorage.setItem("pulse_player_volume" , newVolume)
			console.log("音量已調整" + newVolume);
		}).catch((error) => {
			console.log(error);
		});
    }
    //取得當前音量
    const getCurrentVolume = () => {
        checkPlayerReady();

        player.getVolume().then(volume => {
            let volume_percentage = volume * 100;
            console.log(`The volume of the player is ${volume_percentage}%`);
        });
    }

    //循環播放（關閉or清單循環or單曲循環)
    const setRepeatMode = async() => {
        checkPlayerReady();
        
        let newMode;
        if(repeatStateRef.current === "off"){
            newMode = "track"
        }else if(repeatStateRef.current === "track") {
            newMode = "context"
        } else {
            newMode = "off"
        }
        await repeatMode(accessToken, newMode, deviceId);
        console.log('Repeat mode:'+ repeatStateRef.current)
    }


	return { play, pause, getUserDevices, togglePlay, player, skipToNext, skipToPrev, toggleShuffle, volumeControl, getCurrentVolume, setRepeatMode };
};
