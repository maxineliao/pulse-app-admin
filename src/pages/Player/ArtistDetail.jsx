import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from "axios";
import PlayerCardAlbum from "../../components/Player/PlayerCardAlbum";
import PlayerCardSong from "../../components/Player/PlayerCardTrack";
import { selectSpotifyAccessToken } from "../../slice/spotifyAuthSlice";
import { NavLink } from "react-router";
import { ChevronRight } from "lucide-react";
import { useSpotifyPlayer } from "../../hooks/useSpotifyPlayer";

const { VITE_SPOTIFY_API_PATH } = import.meta.env;

function AlbumSongDetail() {
  const location = useLocation();
  const spotifyAccessToken = useSelector(selectSpotifyAccessToken);
  const [artistAlbum, setArtistAlbum] = useState([]);
  const [artistAlbumTop, setArtistAlbumTop] = useState([]);
  const [artist, setArtist] = useState([]);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [showAllAlbums, setShowAllAlbums] = useState(false);
  const [showAllSong, setShowAllSong] = useState(false);
  const {play} = useSpotifyPlayer();

  const getArtistAlbum = async (id) => {
    try {
      // artist top-tracks
      const url = `${VITE_SPOTIFY_API_PATH}artists/${encodeURIComponent(
        id
      )}/top-tracks`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      });

      // artist albums
      const ur2 = `${VITE_SPOTIFY_API_PATH}artists/${encodeURIComponent(
        id
      )}/albums`;
      const response2 = await axios.get(ur2, {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      });

      // artist
      const ur3 = `${VITE_SPOTIFY_API_PATH}artists/${encodeURIComponent(id)}`;
      const response3 = await axios.get(ur3, {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      });

      setArtistAlbumTop(response.data);
      setArtistAlbum(response2.data);
      setArtist(response3.data);

      // console.log("response", response.data);
      // console.log("response2", response2.data);
      // console.log("response3", response3.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowMoreAlbums = () => {
    setShowAllAlbums((prevState) => !prevState);
  };

  const handleShowMoreSong = () => {
    setShowAllSong((prevState) => !prevState);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setID(params.get("id"));
    setName(params.get("name"));
    if (spotifyAccessToken && id) {
      getArtistAlbum(id);
    }
  }, [spotifyAccessToken, location.search, id]);

  return (
    <div className="col-lg-9 col-12 player-scrollbar">
      <div className="p-5 border-transparent rounded-4 player-bg mb-5">
        <h2 className="h2 mb-1">{name}</h2>
        <h6 className="h6 mb-4">
          追蹤人數：{artist.followers?.total?.toLocaleString() || "N/A"}
        </h6>
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
          const items = artistAlbumTop.tracks?.filter((track) => track) || [];
          const maxItems = showAllSong ? items.length : 4;
          const slicedItems = items.slice(0, maxItems);

          // 確保顯示數量足夠，補空的佔位符
          while (slicedItems.length < maxItems) {
            slicedItems.push(null);
          }

          return slicedItems.map((track, index) => (
            <div key={index}>
              {track ? (
                <PlayerCardSong
                  cardTitle={track.name}
                  cardContent={track.artists[0]?.name}
                  cardImage={track.album.images[0]?.url}
                  cardTime={track.duration_ms}
                  onClick={() => play(null, track.uri)}
                />
              ) : (
                <div className="placeholder"></div> // 空佔位符，保持佈局穩定
              )}
            </div>
          ));
        })()}
        <div className="d-flex justify-content-between align-items-center my-5">
          <h4 className="h4 mb-0">專輯</h4>
          <button
            className="btn btn-link text-decoration-none"
            onClick={handleShowMoreAlbums}
          >
            {showAllAlbums ? "隱藏" : "更多"}
            <ChevronRight />
          </button>
        </div>
        <div className="row mb-5">
          {(() => {
            const items = artistAlbum.items?.filter((album) => album) || [];
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
  );
}

export default AlbumSongDetail;
