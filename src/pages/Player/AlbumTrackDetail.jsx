import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from "axios";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
import { useSpotifyPlayer } from "../../hooks/useSpotifyPlayer";
import PlayerAlbumTrack from "../../components/Player/PlayerAlbumTrack";

const { VITE_SPOTIFY_API_PATH } = import.meta.env;

function AlbumSongDetail() {
  const location = useLocation();
  const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
  const [albumSong, setAlbumSong] = useState([]);
  const [id, setID] = useState("");
  const {play} = useSpotifyPlayer();

  const getAlbumSongs = async (id) => {
    try {
      const url = `${VITE_SPOTIFY_API_PATH}albums/${encodeURIComponent(id)}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      });
      setAlbumSong(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setID(params.get("id"));
    if (spotifyAccessToken && id) {
      getAlbumSongs(id);
    }
  }, [spotifyAccessToken, location.search, id]);

  return (
    <div className="col-lg-9 col-12 player-scrollbar">
      <div className="p-5 border-transparent rounded-4 player-bg mb-5">
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-between mb-5">
              <div className="d-flex justify-content-start flex-column">
                <h6 className="h6">專輯</h6>
                <h4 className="h4 mb-1">{albumSong.name}</h4>
                <h6 className="h6">{albumSong.total_tracks}首歌曲</h6>
              </div>
              <h6 className="h6 mt-auto">{albumSong.release_date}</h6>
            </div>
            <div className="row">
              {albumSong.tracks?.items?.map((item, index) => (
                <div key={index}>
                  <PlayerAlbumTrack
                    cardTitle={item.name}
                    cardContent={item.artists[0]?.name}
                    cardTime={item.duration_ms}
                    onClick={()=>play(albumSong.uri, item.uri)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumSongDetail;
