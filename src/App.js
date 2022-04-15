import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { ScrollTop } from "./components/ScrollTop/ScrollTop";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ScrollTop />
      <Footer />
    </>
  );
}

export default App;
