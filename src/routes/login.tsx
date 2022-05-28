import React, { useState } from "react";

const Login = (props: { getUser: any }) => {
  const [toggle, setToggle] = useState<boolean>(true); // toggles reg/login form
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [regUsername, setRegUsername] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");

  const postLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("username", loginUsername);
    data.append("password", loginPassword);
    data.append("grant_type", "password");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: data,
      // https://stackoverflow.com/a/51726055
      // to use cookies, have credentials: 'include' in ALL api calls
      credentials: "include",
    });
    if (
      response.statusText === "OK" &&
      response.status >= 200 &&
      response.status < 300
    ) {
      console.log("logged in");
      props.getUser();
    } else if (response.status === 401) {
      console.log(response.statusText);
      alert("Incorrect Login Details");
    } else {
      throw new Error("Server can't be reached!");
    }
  };

  const postRegistrationForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("username", regUsername);
    data.append("password", regPassword);
    data.append("grant_type", "password");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: data,
      // https://stackoverflow.com/a/51726055
      // to use cookies, have credentials: 'include' in ALL api calls
      credentials: "include",
    });
    if (
      response.statusText === "OK" &&
      response.status >= 200 &&
      response.status < 300
    ) {
      console.log("account created");
      props.getUser();
    } else if (response.status === 400) {
      console.log(response.json());
      return;
    } else {
      throw new Error("Server can't be reached!");
    }
    return;
  };

  const LoginForm = () => {
    return (
      <div>
        <h2> Login Form</h2>
        <form onSubmit={(e) => postLoginForm(e)}>
          <label>
            <input
              type='text'
              // name='username'
              placeholder='Enter email'
              required
              value={loginUsername}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLoginUsername(e.target.value)
              }
            />
          </label>
          <label>
            <input
              type='password'
              // name='password'
              placeholder='Enter password'
              required
              value={loginPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginPassword(e.target.value);
              }}
            />
          </label>
          <button> Send </button>
        </form>
      </div>
    );
  };

  const RegistrationForm = () => {
    return (
      <div>
        <h2> Reg Form</h2>
        <form onSubmit={(e) => postRegistrationForm(e)}>
          <label>
            <input
              type='text'
              // name='username'
              placeholder='Reg email'
              required
              value={regUsername}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRegUsername(e.target.value)
              }
            />
          </label>
          <label>
            <input
              type='password'
              // name='password'
              placeholder='Reg password'
              required
              value={regPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRegPassword(e.target.value);
              }}
            />
          </label>
          <button> Send </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {toggle ? LoginForm() : RegistrationForm()}
      <button onClick={() => setToggle(!toggle)}> Toggle </button>
    </div>
  );
};
export default Login;
