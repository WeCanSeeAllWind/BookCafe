import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import Rent from "./pages/Rent";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {Context, reducer, initialState} from './reducers';
import { useReducer } from "react";

export default function App() {

  return (
    <Context.Provider value={useReducer(reducer, initialState)}>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/rent" element={<Rent />} />
            <Route exact path="/mypage" element={<MyPage />} />
          </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};