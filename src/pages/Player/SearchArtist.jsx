import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from "axios";
import PlayerCardArtist from "../../components/Player/PlayerCardArtist";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
import { NavLink } from "react-router";

const { VITE_SPOTIFY_API_PATH } = import.meta.env;

function SearchArtist() {
  const location = useLocation();
  const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
  const [artist, setArtist] = useState([]);
  const [query, setQuery] = useState("");

  const getSongs = async (query) => {
    try {
      const url = `${VITE_SPOTIFY_API_PATH}search?q=${encodeURIComponent(
        query
      )}&type=artist&limit=12&offset=0`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      });
      setArtist(response.data.artists.items);
      // console.log(response.data.artists.items);
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
              className="nav-link player-bg"
            >
              <h6 className="mb-0">歌曲</h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={`/player/search_artists?${new URLSearchParams(
                location.search
              ).toString()}`} // 動態生成 URL，帶上查詢參數
              className="nav-link active"
              aria-current="page"
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
              <h4 className="h4 mb-0">藝人</h4>
            </div>
            <div className="row">
              {artist
                .filter((item) => item)
                .map((item) => (
                  <div className="col-6 col-lg-3" key={item?.id}>
                    <NavLink
                      to={`/player/artist_detail?id=${item.id}&name=${item.name}`} // 傳遞 track.id 作為查詢參數
                      className="text-decoration-none"
                    >
                      <PlayerCardArtist
                        cardImage={item.images[0]?.url}
                        cardTitle={item.name}
                        artistId={item.id}
                      />
                    </NavLink>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchArtist;
