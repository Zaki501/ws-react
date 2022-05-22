import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  // Switch,
  Route,
  Routes,
  Link
} from 'react-router-dom';

import Home from './routes/home';
import Profile from './routes/profile';
import Register from './routes/register';
import Login from './routes/login';

function App() {
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
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register  />} />
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
