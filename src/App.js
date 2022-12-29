import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./layout/Main";
import AddTask from "./pages/AddTask/AddTask";
import CompletedTask from "./pages/CompletedTask/CompletedTask";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MyTask from "./pages/MyTask/MyTask";
import Signup from "./pages/Signup/Signup";
import TaskDetails from "./pages/TaskDetails/TaskDetails";
import UpdateTask from "./pages/UpdateTask/UpdateTask";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
   
    <div div className = " h-screen dark:bg-slate-700 dark:text-white " >
      <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
        <Route path="/my-task" element={<PrivateRoute><MyTask /></PrivateRoute>} />
        <Route path="/my-task/update/:id" element={<PrivateRoute><UpdateTask /></PrivateRoute>} />
        <Route path="/completed-task" element={<PrivateRoute><CompletedTask /></PrivateRoute>} />
        <Route path="/completed-task/details/:id" element={<PrivateRoute><TaskDetails /></PrivateRoute>} />
        <Route path="*" element={<Error/>} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
