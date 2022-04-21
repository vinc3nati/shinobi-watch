import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { ScrollTop } from "./components/ScrollTop/ScrollTop";
import { Home } from "./pages/Home/Home";
import { Explore } from "./pages/Videos/Explore";
import { VideoList } from "./pages/Videos/VideoList";
import { ToastContainer } from "react-toastify";
import { useData } from "./context/index";
import { Loader } from "./components/Loader/Loader";

function App() {
  const { loader } = useData();
  return (
    <>
      {loader && <Loader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />}>
          <Route path="" element={<VideoList />} />
        </Route>
      </Routes>
      <ToastContainer style={{ fontWeight: "500", fontSize: "2rem" }} />
      <ScrollTop />
    </>
  );
}

export default App;
