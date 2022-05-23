import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  // Switch,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import cookie from 'cookie';
import { IUser } from './types';

import Home from './routes/home';
import Profile from './routes/profile';
import Register from './routes/register';
import Login from './routes/login';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false); // whether user is logged in or not
  const [User, setUser] = useState<IUser | undefined>(); // current user details

  const getUser = async () => {
    // checks with backend if user is logged in
    // if yes, set isAuth to true, and User is set 
    const response = await fetch('/api/user/me');
    const data = await response.json();
    console.log("user data: ", data);

    if (response.status === 200) {
      () => setIsAuth(data);
      return;
    }
  }
  useEffect(
    // whenever user log in/out, change the view
    // make logged in views protected?
    () => {
    }, [isAuth])

  const checkCookies = (key: string) => {
    let parsed = cookie.parse(document.cookie);
    if (key in parsed) {
      return parsed.key;
    }
    else {
      return false
    }
  }
  // local storage vs cookies

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/Register">Register</Link>
              </li>
              <li>
                <Link to="/Profile">Profile</Link>
              </li>
              <li>
                <Link to="/Login">Log in</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/home" element={isAuth ? <Home /> : <Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
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
