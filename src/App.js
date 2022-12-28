import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element="error pages" />
      </Route>
    </Routes>
  );
}

export default App;
