import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Visualizer from "./pages/Visualizer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/visualizer/:id" element={<Visualizer />} />
      </Routes>
    </>
  );
}