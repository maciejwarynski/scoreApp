import "./index.css";
import Homepage from "./pages/homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import KataPage from "./pages/katapage";
import KumitePage from "./pages/kumitepage";
import DisplayPage from "./pages/displaypagekumite";
import DisplayPageKata from "./pages/displaypagekata";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/kata" element={<KataPage />} />
          <Route path="/kumite" element={<KumitePage />} />
          <Route path="/display" element={<DisplayPage />} />
          <Route path="/displayKata" element={<DisplayPageKata />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
