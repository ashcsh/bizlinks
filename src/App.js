//componenets
import Intro from "./pages/intro/Intro";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./componenets/Navbar"
import Dashboard from "./pages/dashboard/Dashboard";
import SelectedProfile from "./pages/dashboard/SelectedProfile";
import MyPage from "./pages/profile/MyPage";

import { useAuthContext } from "./hooks/useAuthContext";

//react-router
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { useState } from "react"

function App() {

  const { user } = useAuthContext()


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={ <Intro/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/login" element={user ? <MyPage/>: <Login/> }/>
          <Route path="/signup" element={user ?  <MyPage/> : <Signup/>}/>
          <Route path="/profile/:id" element={<SelectedProfile/>}/>
          <Route path="/mypage" element={user ? <MyPage/> : <Intro/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );  
}

export default App;
