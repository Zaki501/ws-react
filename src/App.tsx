import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  // Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import cookie from "cookie";
import { IUser } from "./types";

import Profile from "./routes/profile";
import Register from "./routes/register";
import Login from "./routes/login";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false); // whether user is logged in or not
  const [User, setUser] = useState<IUser | undefined>(); // current user details

  const getUser = async () => {
    // checks with backend if user is logged in
    // if yes, set isAuth to true, and User is set
    const response = await fetch("http://127.0.0.1:8000/api/user/me", {
      method: "GET",
      credentials: "include",
    });
    // https://github.com/tiangolo/fastapi/issues/480
    // try manually setting a cookie
    const data = await response.json();
    console.log("user data: ", data);
    if (response.status === 200) {
      // token is legitimate
      setUser(data);
      setIsAuth(true);
      return;
    } else {
      // token invalid
      setUser(undefined);
      setIsAuth(false);
    }
    console.log("user:", User); 
    console.log("isAuth:", isAuth);
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
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/Register'>Register</Link>
              </li>
              <li>
                <Link to='/'>Profile</Link>
              </li>
              <li>
                <Link to='/Login'>Log in</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path='/'
              element={
                isAuth && User ? (
                  <Profile User={User} setUser={setUser} setIsAuth={setIsAuth} />
                ) : (
                  <Login setIsAuth={setIsAuth} />
                )
              }
            />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/profile' element={<Profile User={User}/>} /> */}
            <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
          </Routes>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          {/* <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
        </Switch> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
