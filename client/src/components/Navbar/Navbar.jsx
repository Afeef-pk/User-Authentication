import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAuthorized, userLogout } from "../../Redux/app/userSlice"; // Import your actions

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.user.authorized);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(userAuthorized(storedToken));
    } else {
      dispatch(userLogout());
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(userLogout());
    navigate('/')
  };
  return (
    <nav className=" bg-gray-900 fixed w-full z-20 top-0 left-0 border-b  border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Welcome
          </span>
        </Link>
        <div className="flex md:order-2">
          {!authorized ? (
            <>
              <Link to={"/login"}>
                <button
                  type="button"
                  className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button
                  type="button"
                  className="ml-10 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/profile"}>
                <button
                  type="button"
                  className="ml-10 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                  My Account
                </button>
              </Link>
              <button
                onClick={handleLogout}
                type="button"
                className="ml-10 text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 bg-red-600 hover:bg-red-700 focus:ring-red-800">
                Log out
              </button>
            </>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
