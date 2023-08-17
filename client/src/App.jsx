import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Home from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";

function App() {
  const authorized = useSelector((state) => state.user.authorized);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          {authorized ? (
            <Route path="profile" element={<UserProfile />} />
          ) : (
            <Route path="profile" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
