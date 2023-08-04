// import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import TeacherHome from "./components/TeacherHome";
// import StudentHome from "./components/StudentHome";
import "./main.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import StudentHome from "./components/StudentHome";
import TeacherHome from "./components/TeacherHome";
import NavBar from "./components/NavBar";
import CreateJournal from "./components/CreateJournal";

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userType, setUserType] = useState("");

  // // Simulate the login process
  // const login = (type) => {
  //   setIsLoggedIn(true);
  //   setUserType(type);
  // };

  // // Simulate the logout process
  // const logout = () => {
  //   setIsLoggedIn(false);
  //   setUserType("");
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/TeacherHome" element={<TeacherHome />} />
        <Route path="/Create" element={<CreateJournal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
