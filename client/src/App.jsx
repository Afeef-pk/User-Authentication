import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Home from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import PrivateUser from "./routes/PrivateRoute";

function App() {
  const authorized = useSelector((state) => state.user.authorized);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={authorized ? <Navigate to="/" replace={true} /> : <Login />} />
          <Route element={<PrivateUser />}>
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
