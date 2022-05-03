import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { ScrollTop } from "./components/ScrollTop/ScrollTop";
import { Home } from "./pages/Home/Home";
import { Explore } from "./pages/Videos/Explore";
import { VideoList } from "./pages/Videos/VideoList";
import { ToastContainer } from "react-toastify";
import { useData } from "./context/index";
import { Loader } from "./components/Loader/Loader";
import { VideoDetails } from "./pages/VideoDetails/VideoDetails";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { PrivateRoute } from "./components/PrivateRoutes/PrivateRoute";
import { Profile } from "./pages/Profile/Profile";
import { Error } from "./pages/Error/Error";
import { LikedVideos } from "./pages/LikedVideos/LikedVideos";
import { Watchlater } from "./pages/Watchlater/Watchlater";
import { History } from "./pages/History/History";
import { PlaylistModal } from "./components/PlaylistModal/PlaylistModal";
import { Playlist } from "./pages/Playlist/Playlist";
import { SinglePlaylist } from "./pages/Playlist/SinglePlaylist";

function App() {
  const { loader, setPlaylistModal, playlistModal } = useData();
  const { pathname } = useLocation();
  return (
    <>
      {loader && <Loader />}
      {playlistModal.show && <PlaylistModal />}
      {pathname !== "/login" && pathname !== "/signup" && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login title="login" />} />
        <Route path="/signup" element={<Signup title="register" />} />
        <Route path="/" element={<Home title="home" />} />
        <Route path="/explore" element={<Explore />}>
          <Route index element={<VideoList title="explore" />} />
          <Route
            path="liked"
            element={
              <PrivateRoute>
                <LikedVideos title="liked" />
              </PrivateRoute>
            }
          />
          <Route
            path="watchlater"
            element={
              <PrivateRoute>
                <Watchlater title="watch later" />
              </PrivateRoute>
            }
          />
          <Route
            path="history"
            element={
              <PrivateRoute>
                <History title="history" />
              </PrivateRoute>
            }
          />
          <Route
            path="playlists"
            element={
              <PrivateRoute>
                <Playlist title="playlist" />
              </PrivateRoute>
            }
          />
          <Route
            path="playlists/:playlistId"
            element={
              <PrivateRoute>
                <SinglePlaylist title="playlist" />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/explore/:videoId"
          element={<VideoDetails title="video" />}
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile title="profile" />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error title="Error" />} />
        <Route path="/error" element={<Error title="Error" />} />
      </Routes>
      <ToastContainer style={{ fontWeight: "500", fontSize: "2rem" }} />
      <ScrollTop />
    </>
  );
}

export default App;
