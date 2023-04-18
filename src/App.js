import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Profile from "./Components/Profile";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element = {<Profile/>}/>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
