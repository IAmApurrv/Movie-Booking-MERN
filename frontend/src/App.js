import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import User from "./components/Auth/User";
import Admin from "./components/Auth/Admin";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
// import Bookings from "./components/Movies/MovieDetails";
import UserProfile from "./components/profile/UserProfile";
import AdminProfile from "./components/profile/AdminProfile";
import { AddMovie } from "./components/Movies/AddMovie";
import MovieDetails from "./components/Movies/MovieDetails";

function App() {

  const dispatch = useDispatch();

  const isAdminLoggedIn = useSelector((state) => state.admin.isLogegdIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLogegdIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) // todo: chech if userId is correct or not
    {
      dispatch(userActions.login());

    }
    else if (localStorage.getItem("adminId")) // todo: chech if adminId is correct or not
    {
      dispatch(adminActions.login());
    }
  }, [dispatch])

  return (
    <div>

      {/* header */}
      <Header />

      {/* homepage */}
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie-details/:id" element={<MovieDetails />} />

          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element={<User />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path="/user-profile" element={<UserProfile />} />
            </>
          )}
          {!isUserLoggedIn && isAdminLoggedIn && (
            <>
              <Route path="/admin-profile" element={<AdminProfile />} />
              <Route path="/add" element={<AddMovie />} />
            </>
          )}
        </Routes>
      </section>

    </div>
  );
}

export default App;


// rafc