import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import MapDashboard from "./MapDashboard";
import YhlasPage from "./YhlasPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<MapDashboard />} />
        <Route path="/yhlas" element={<YhlasPage />} />
      </Routes>
    </BrowserRouter>
  );
}