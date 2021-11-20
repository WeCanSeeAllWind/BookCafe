import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import Rent from "./pages/Rent";

export default function App() {

  return (
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/rent" element={<Rent />} />
            <Route exact path="/mypage" element={<MyPage />} />
          </Routes>
      </BrowserRouter>
  );
}