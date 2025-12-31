import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste.jsx";
import ViewPaste from "./pages/ViewPaste.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/p/:pasteId" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
