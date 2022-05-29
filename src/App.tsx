import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  // Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { IUser } from "./types";

import Profile from "./routes/profile";
import Login from "./routes/login";

function App() {
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
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>home</Link>
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
                  <Profile
                    User={User}
                    setUser={setUser}
                    setIsAuth={setIsAuth}
                  />
                ) : (
                  <Login getUser={getUser} />
                )
              }
            />
            <Route path='/login' element={<Login getUser={getUser} />} />
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
