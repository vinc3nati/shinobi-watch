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

function App() {
  const { loader } = useData();
  const { pathname } = useLocation();
  return (
    <>
      {loader && <Loader />}
      {pathname !== "/login" && pathname !== "/signup" && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login title="login" />} />
        <Route path="/signup" element={<Signup title="register" />} />
        <Route path="/" element={<Home title="home" />} />
        <Route path="/explore" element={<Explore />}>
          <Route path="" element={<VideoList title="explore" />} />
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
