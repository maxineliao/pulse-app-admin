import { HeartIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PlayerImages from "../../Images";
import PlayerCardArtist from "../../components/Player/PlayerCardArtist";
import PlayerCardGenre from "../../components/Player/PlayerCardGenre";
import PlayerCardTrack from "../../components/Player/PlayerCardTrack";
import PlayerCardAlbum from "../../components/Player/PlayerCardAlbum";
import PlayerCardPlaylist from "../../components/Player/PlayerCardPlaylist";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import axios from "axios";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
import { useSpotifyPlayer } from "../../hooks/useSpotifyPlayer";
const { VITE_SPOTIFY_API_PATH } = import.meta.env;
import { NavLink } from "react-router";

function SearchResult() {
  const location = useLocation();
  const {play} = useSpotifyPlayer();
  const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
  const [searchData, setSearchsData] = useState({ items: [] });
  const [query, setQuery] = useState("");
  const [showAllAlbums, setShowAllAlbums] = useState(false);
  const [showAllArtist, setShowAllArtist] = useState(false);
  const [showAllPlaylist, setShowAllPlaylist] = useState(false);
  const [showAllSong, setShowAllSong] = useState(false);

  const getUsersSearch = async (query) => {
    try {
      const url = `${VITE_SPOTIFY_API_PATH}search?q=${encodeURIComponent(
        query
      )}&type=album,artist,playlist,track,show,episode,audiobook&limit=12&offset=0`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      });
      setSearchsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("query"));
    if (spotifyAccessToken && query) {
      getUsersSearch(query);
    }
  }, [spotifyAccessToken, location.search, query]);

  const handleShowMoreAlbums = () => {
    setShowAllAlbums((prevState) => !prevState);
  };

  const handleShowMoreArtist = () => {
    setShowAllArtist((prevState) => !prevState);
  };

  const handleShowMorePlaylist = () => {
    setShowAllPlaylist((prevState) => !prevState);
  };

  const handleShowMoreSong = () => {
    setShowAllSong((prevState) => !prevState);
  };

  return (
    <>
      <div className="col-lg-9 col-12 player-scrollbar">
        <div className="p-5 border-transparent rounded-4 player-bg mb-5">
          <ul className="nav nav-pills gap-2 mb-5">
            <li className="nav-item">
              <NavLink
                to={`/player/result?${new URLSearchParams(
                  location.search
                ).toString()}`}
                className="nav-link active"
                aria-current="page"
              >
                <h6 className="mb-0">所有</h6>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/player/search_tracks?${new URLSearchParams(
                  location.search
                ).toString()}`}
                className="nav-link player-bg"
              >
                <h6 className="mb-0">歌曲</h6>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/player/search_artists?${new URLSearchParams(
                  location.search
                ).toString()}`}
                className="nav-link player-bg"
              >
                <h6 className="mb-0">藝人</h6>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/player/search_albums?${new URLSearchParams(
                  location.search
                ).toString()}`}
                className="nav-link player-bg"
              >
                <h6 className="mb-0">專輯</h6>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/player/search_playlists?${new URLSearchParams(
                  location.search
                ).toString()}`}
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
          <h2 className="h2 mb-5">{`${query}`} 的搜尋結果</h2>
          <div className="row mb-5">
            <div className="col-lg-4 col-12">
              <h4 className="h4 mb-5">最佳結果</h4>
              <Link className="p-5 player-bg rounded-4 mb-5 mb-lg-0 d-block text-decoration-none" to={`/player/artist_detail?id=${searchData.artists?.items[0].id}&name=${searchData.artists?.items[0]?.name}`}>
                <img
                  className="img-fluid mb-5 rounded-4"
                  src={searchData.artists?.items[0]?.images[0]?.url}
                  alt="best result image"
                  width={120}
                />
                <h3 className="h3 mb-1">
                  {searchData.artists?.items[0]?.name}
                </h3>
                <p className="text-secondary">藝人</p>
              </Link>
            </div>
            <div className="col-lg-8 col-12">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h4 className="h4 mb-0">歌曲</h4>
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={handleShowMoreSong}
                >
                  {showAllSong ? "隱藏" : "更多"}
                  <ChevronRight />
                </button>
              </div>
              {(() => {
                const items =
                  searchData.tracks?.items?.filter((track) => track) || [];
                const maxItems = showAllSong ? items.length : 4;
                const slicedItems = items.slice(0, maxItems);

                // 確保顯示數量足夠，補空的佔位符
                while (slicedItems.length < maxItems) {
                  slicedItems.push(null);
                }

                return slicedItems.map((track, index) => (
                  <div key={index}>
                    {track ? (
                      <PlayerCardTrack
                        cardTitle={track.name}
                        cardContent={track.artists[0]?.name}
                        cardImage={track.album.images[0]?.url}
                        cardTime={track.duration_ms}
                        onClick={() => {
                          play(null, track.uri)
                        }}
                      />
                    ) : (
                      <div className="placeholder"></div> // 空佔位符，保持佈局穩定
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h4 className="h4 mb-0">專輯</h4>
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={handleShowMoreAlbums}
                >
                  {showAllAlbums ? "隱藏" : "更多"}
                  <ChevronRight />
                </button>
              </div>
              <div className="row">
                {(() => {
                  const items =
                    searchData.albums?.items?.filter((album) => album) || [];
                  const maxItems = showAllAlbums ? items.length : 4;
                  const slicedItems = items.slice(0, maxItems);

                  // 確保顯示數量足夠，補空的佔位符
                  while (slicedItems.length < maxItems) {
                    slicedItems.push(null);
                  }

                  return slicedItems.map((album, index) => (
                    <div className="col-6 col-lg-3" key={index}>
                      {album ? (
                          <PlayerCardAlbum
                            cardImage={album.images[0]?.url}
                            cardTitle={album.name}
                            cardContent={album.artists[0]?.name}
                            albumId={album.id}
                          />
                      ) : (
                        <div className="placeholder"></div> // 空佔位符，保持佈局穩定
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h4 className="h4 mb-0">藝人</h4>
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={handleShowMoreArtist}
                >
                  {showAllArtist ? "隱藏" : "更多"}
                  <ChevronRight />
                </button>
              </div>
            </div>
            {(() => {
              const items =
                searchData.artists?.items?.filter((artist) => artist) || [];
              const maxItems = showAllArtist ? items.length : 4;
              const slicedItems = items.slice(0, maxItems);

              // 確保顯示數量足夠，補空的佔位符
              while (slicedItems.length < maxItems) {
                slicedItems.push(null);
              }

              return slicedItems.map((artist, index) => (
                <div className="col-6 col-lg-3" key={index}>
                  {artist ? (
                      <PlayerCardArtist
                        cardImage={artist.images[0]?.url}
                        cardTitle={artist.name}
                        artistId={artist.id}
                      />
                  ) : (
                    <div className="placeholder"></div> // 空佔位符，避免 UI 崩壞
                  )}
                </div>
              ));
            })()}
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h4 className="h4 mb-0">播放清單</h4>
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={handleShowMorePlaylist}
                >
                  {showAllPlaylist ? "隱藏" : "更多"}
                  <ChevronRight />
                </button>
              </div>
              <div className="row">
                {(() => {
                  const items =
                    searchData.playlists?.items?.filter(
                      (playlist) => playlist
                    ) || [];
                  const maxItems = showAllPlaylist ? items.length : 4;
                  const slicedItems = items.slice(0, maxItems);

                  // 確保顯示數量足夠，補空的佔位符
                  while (slicedItems.length < maxItems) {
                    slicedItems.push(null);
                  }

                  return slicedItems.map((playlist, index) => (
                    <div className="col-6 col-lg-3" key={index}>
                      {playlist ? (
                        <PlayerCardPlaylist
                          cardImage={playlist.images[0]?.url}
                          cardTitle={playlist.name}
                          cardText={playlist.owner.display_name}
                          playlistId={playlist.id}
                        />
                      ) : (
                        <div className="placeholder"></div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
          {/* <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h4 className="h4 mb-0">探索曲風</h4>
                <a className="me-3 text-decoration-none" href="#">
                  更多
                  <ChevronRight />
                </a>
              </div>
              <div className="row">
                <div className="col-6 col-lg-3">
                  <PlayerCardGenre
                    cardImage={PlayerImages["card-pic-3_3"]}
                    cardTitle={"Bass"}
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default SearchResult;
