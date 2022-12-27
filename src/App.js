import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element="error pages" />
      </Route>
    </Routes>
  );
}

export default App;
