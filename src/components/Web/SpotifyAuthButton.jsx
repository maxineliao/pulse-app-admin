import { ChevronRight } from "lucide-react";
import { generateCodeVerifier,generateCodeChallenge } from "../../utils/spotifyAuth";
import { useSelector } from "react-redux";
const { VITE_Spotify_ClientID, VITE_Spotify_redirect_uri } = import.meta.env;

export default function SpotifyAuthButton() {
	const spotifyIsAuth = useSelector((state) => state.spotifyAuth.spotifyIsAuthentication);
	const handleSpotifyAuth = async () => {
		// Generate code_verifier and code_challenge
		const codeVerifier = generateCodeVerifier();
		const codeChallenge = await generateCodeChallenge(codeVerifier);

		// Store code_verifier in localStorage (to use later during token exchange)
		localStorage.setItem("code_verifier", codeVerifier);

		// Construct the authorization URL
		const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${VITE_Spotify_ClientID}&response_type=code&redirect_uri=${encodeURIComponent(
			VITE_Spotify_redirect_uri
		)}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-follow-read%20user-read-recently-played%20playlist-read-private`;

		// Redirect the user to Spotify's authorization page
		window.location.href = AUTH_URL;
	};
	return (
		<a
			className="me-lg-3 me-0 py-2 px-lg-4 px-3 rounded-5 membercenter-button-style text-decoration-none"
			onClick={handleSpotifyAuth}
		>
			<span
				style={spotifyIsAuth ? {color: "#1DB954"} : {color: "#fff"}}
			>
				{spotifyIsAuth
					? "已連結Spotify"
					: "連結Spotify帳戶"}
			</span>
			{!spotifyIsAuth && <ChevronRight width={16}></ChevronRight>}
		</a>
	);
}
