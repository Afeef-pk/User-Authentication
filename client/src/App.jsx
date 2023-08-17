import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<UserProfile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
