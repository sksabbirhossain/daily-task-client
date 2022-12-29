import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./layout/Main";
import AddTask from "./pages/AddTask/AddTask";
import CompletedTask from "./pages/CompletedTask/CompletedTask";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MyTask from "./pages/MyTask/MyTask";
import Signup from "./pages/Signup/Signup";
import UpdateTask from "./pages/UpdateTask/UpdateTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/my-task" element={<MyTask />} />
        <Route path="/my-task/update/:id" element={<UpdateTask />} />
        <Route path="/completed-task" element={<CompletedTask />} />
        <Route path="*" element="error pages" />
      </Route>
    </Routes>
  );
}

export default App;
