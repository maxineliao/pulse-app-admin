import {
	SquarePlus,
	Shuffle,
	SkipBack,
	Play,
	Repeat,
	MicVocal,
	ListMusic,
	Volume2,
	Maximize2,
    SkipForward,
	Pause,
	Repeat1,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSpotifyPlayer } from "../../hooks/useSpotifyPlayer";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
import Marquee from "react-fast-marquee";

export default function PlayerComp() {
	// const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
	const { togglePlay, skipToNext, skipToPrev, toggleShuffle, volumeControl, setRepeatMode } = useSpotifyPlayer();
	const isPlaying = useSelector((state) => state.player.isPlaying);
	const isShuffled = useSelector((state) => state.player.shuffle);
	const currentTrack = useSelector((state) => state.player.trackName);
	const originalVolume = useSelector((state) => state.player.volume);
	const repeatMode = useSelector((state) => state.player.repeatState);
	const [volume, setVolume] = useState(originalVolume);
	const playerRef = useRef(null);
	// const trackTitleRef = useRef(null);
	// const trackArtistRef = useRef(null);
	// const [scrollTrackTitle, setScrollTrackTitle] = useState(false);
	// const [scrollArtistTitle, setScrollArtistTitle] = useState(false);
	// useEffect(()=> {
	// 	if(currentTrack) {
	// 		if (trackTitleRef.current.scrollWidth > trackTitleRef.current.clientWidth) {
	// 			setScrollTrackTitle(true);
	// 		} else {
	// 			setScrollTrackTitle(false);
	// 		}
	// 		console.log(trackTitleRef.current.scrollWidth);
	// 		console.log(trackTitleRef.current.clientWidth);
			
	// 	}
	// },[currentTrack])
	const useDebounce = (func, delay) => {
		const timerRef = useRef(null);

		return useCallback((...args) => {
			//清除舊的計時器
			if(timerRef.current) {
				clearTimeout(timerRef.current);
			}
			//設置新的計時器
			timerRef.current = setTimeout(() => func(...args), delay)
		},[func, delay])
	}
	const handleVolumeChange = (e) => {
		setVolume(e.target.value);
		debouncedVolumeControl(e.target.value);
	}
	const debouncedVolumeControl = useDebounce((volume) => {
		volumeControl(volume);
	},300)
	useEffect(()=> {
		// console.log(volume);
	},[volume])
	const hidePlayer = () => {
		playerRef.current
	}
	return (
		<div className="player-comp fixed-bottom" ref={playerRef} style={(currentTrack) ? {
			transition: "transform ease 300ms",
		} : 
		{
			transition: "transform ease 300ms",
			transform: "translateY(100%)"
		}}>
			<div className="d-flex justify-content-between py-2 px-3 px-lg-6">
				<div className="trackInfo d-flex align-items-center">
					
						<img
							src={useSelector((state) => state.player.image)}
							alt="music"
							width="64"
							height="64"
						/>
					
					<div className="mx-5">
						<Marquee speed={30}>
							<h5>{useSelector((state) => state.player.trackName)}</h5>
						</Marquee>
						{/* <a href="#" className="text-decoration-none"> */}
						<h6 className="text-secondary">{useSelector((state) => state.player.artists)}</h6>
						{/* </a> */}
					</div>
					{/* <button
						type="button"
						className="btn player-icon-btn d-lg-block d-none"
					>
						<SquarePlus />
					</button> */}
				</div>
				<div className="d-flex align-items-center">
					<button
						type="button"
						className={isShuffled ? "btn player-icon-btn d-lg-block d-none text-primary-yellow" : "btn player-icon-btn d-lg-block d-none"}
						onClick={toggleShuffle}
					>
						<Shuffle />
					</button>
					<button
						type="button"
						className="btn player-icon-btn d-lg-block d-none"
						onClick={skipToPrev}
					>
						<SkipBack />
					</button>
					<button
						type="button"
						className="btn player-icon-btn player-footer-btn-circle player-bg rounded-circle p-3"
						onClick={() => { 
							togglePlay();
						}}
					>
						{isPlaying ? <Pause /> : <Play />}
					</button>
					<button type="button" className="btn player-icon-btn" onClick={skipToNext}>
						<SkipForward />
					</button>
					<button
						type="button"
						className="btn player-icon-btn d-lg-block d-none"
						onClick={setRepeatMode}
					>
						{repeatMode === "context" ? <Repeat /> : repeatMode === "track" ? <Repeat1 /> : <Repeat className="text-secondary"/>}
					</button>
				</div>
				<div className="d-lg-flex align-items-center d-none">
					{/* <button type="button" className="btn player-icon-btn">
						<MicVocal />
					</button> */}
					<button type="button" className="btn player-icon-btn">
						<ListMusic />
					</button>
					<Volume2 className="me-1"/>
					<div className="accent-color">
						<input type="range" id="range" min="0" max="100" defaultValue={originalVolume} onChange={handleVolumeChange} />
					</div>
					{/* <button type="button" className="btn player-icon-btn">
						<Maximize2 />
					</button> */}
				</div>
			</div>
		</div>
	);
}
