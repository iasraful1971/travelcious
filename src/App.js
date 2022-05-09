import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import AddEditTour from "./pages/AddEditTour";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SingleTour from "./pages/SingleTour";
import TagTours from "./pages/TagTours";
import { setUser } from "./redux/features/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const user  = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="App">
     
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="tours/search" element={<Home/>} />
          <Route path="tours/tag/:tag" element={<TagTours/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addTour" element={ <PrivateRoute> <AddEditTour/> </PrivateRoute>  } />
          <Route path="/editTour/:id" element={<PrivateRoute> <AddEditTour/> </PrivateRoute>} />
          <Route path="/tour/:id" element={<SingleTour/>} />
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
