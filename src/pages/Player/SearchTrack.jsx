import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from "axios";
import PlayerCardSong from "../../components/Player/PlayerCardTrack";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
import { NavLink } from "react-router";
import { useSpotifyPlayer } from "../../hooks/useSpotifyPlayer";

const { VITE_SPOTIFY_API_PATH } = import.meta.env;

function SearchTrack() {
  const location = useLocation();
  const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const {play} = useSpotifyPlayer();

  const getSongs = async (query) => {
    try {
      const url = `${VITE_SPOTIFY_API_PATH}search?q=${encodeURIComponent(
        query
      )}&type=track&limit=12&offset=0`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      });
      setSongs(response.data.tracks.items);
      // console.log(response.data.tracks.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("query"));
    if (spotifyAccessToken && query) {
      getSongs(query);
    }
  }, [spotifyAccessToken, location.search, query]);

  return (
    <div className="col-lg-9 col-12 player-scrollbar">
      <div className="p-5 border-transparent rounded-4 player-bg mb-5">
        <ul className="nav nav-pills gap-2 mb-5">
          <li className="nav-item">
            <NavLink
              to={`/player/result?${new URLSearchParams(
                location.search
              ).toString()}`} // 動態生成 URL，帶上查詢參數
              className="nav-link player-bg"
            >
              <h6 className="mb-0">所有</h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/player/search_songs?${new URLSearchParams(
                location.search
              ).toString()}`} // 動態生成 URL，帶上查詢參數
              className="nav-link active"
              aria-current="page"
            >
              <h6 className="mb-0">歌曲</h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/player/search_artists?${new URLSearchParams(
                location.search
              ).toString()}`} // 動態生成 URL，帶上查詢參數
              className="nav-link player-bg"
            >
              <h6 className="mb-0">藝人</h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/player/search_albums?${new URLSearchParams(
                location.search
              ).toString()}`} // 動態生成 URL，帶上查詢參數
              className="nav-link player-bg"
            >
              <h6 className="mb-0">專輯</h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/player/search_playlists?${new URLSearchParams(
                location.search
              ).toString()}`} // 動態生成 URL，帶上查詢參數
              className="nav-link player-bg"
            >
              <h6 className="mb-0">播放清單</h6>
            </NavLink>
          </li>
          {/* <li className="nav-item">
              <a className="nav-link player-bg" href="#">
                曲風
              </a>
            </li> */}
        </ul>
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h4 className="h4 mb-0">歌曲</h4>
            </div>
            <div className="row">
              {songs
                .filter((item) => item)
                .map((item) => (
                  <div key={item?.id}>
                    <PlayerCardSong
                      cardTitle={item.name}
                      cardContent={item.artists[0]?.name}
                      cardImage={item.album.images[0]?.url}
                      cardTime={item.duration_ms}
                      onClick={() => {
                        play(null, item.uri)
                      }}
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

export default SearchTrack;
