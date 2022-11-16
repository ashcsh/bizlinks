//componenets
import Intro from "./pages/intro/Intro";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./componenets/Navbar"
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import MyPage from "./pages/profile/MyPage";

//hooks
import { useAuthContext } from "./hooks/useAuthContext";

//react-router
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  //get userUID for route guards
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={user ? <Dashboard/> : <Intro/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );  
}

export default App;
