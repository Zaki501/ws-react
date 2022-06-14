import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { IUser } from "./types";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Test1 from "./pages/test1";
import Test2 from "./pages/test2";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";

function App() {
  // let navigate = useNavigate();

  const [isAuth, setIsAuth] = useState<boolean>(false); // whether user is logged in or not
  const [User, setUser] = useState<IUser | undefined>(); // current user details

  const getUser = async () => {
    const response = await fetch("/api/user/me", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log("user data: ", data);
    if (response.status === 200) {
      setUser(data);
      setIsAuth(true);
      return;
    } else {
      // token invalid
      setUser(undefined);
      setIsAuth(false);
      return;
    }
  };
  useEffect(
    // this is running twice, because ReactStrictmode renders it twice
    () => {
      getUser();
      console.log("UseEffect mount - async function");
    },
    []
  );

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/' element={<h1>Root page</h1>} />

          <Route path='/home' element={<Home />}>
            <Route path='test1' element={<Test1 />}>
              <Route path='test2' element={<Test2 />} /> {/* nested in home/test1 */}
            </Route>
            {/* <Route path='login' element={<Login getUser={getUser} />} />
              <Route path='profile' element={<Profile User={User} setUser={setUser} setIsAuth={setIsAuth} />} /> */}
            {/* <Route path='goto' element={isAuth && User ? <Profile User={User} setUser={setUser} setIsAuth={setIsAuth} /> : <Login getUser={getUser} />} /> */}
          </Route>

          <Route path="*" element={<ErrorPage />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
