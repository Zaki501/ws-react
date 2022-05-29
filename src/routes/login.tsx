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
      console.log(response);
      alert("Incorrect Login Details");
    } else {
      throw new Error("Server can't be reached!");
    }
  };

  const postRegistrationForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !check_equal("regUser1", "regUser2", "User names dont match") ||
      !check_equal("regPass1", "regPass2", "Passwords dont match")
    ) {
      console.log("inputs not equal");
      return;
    }

    const data = {
      email: regUsername,
      password: regPassword,
    };
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (
      response.statusText === "OK" &&
      response.status >= 200 &&
      response.status < 300
    ) {
      console.log("account created");
    } else if (response.status === 400) {
      console.log("account already exists!");
      return;
    } else {
      throw new Error("Server can't be reached!");
    }
    return;
  };

  const check_equal = function (
    id_1: string,
    id_2: string,
    error_message: string
  ) {
    if (
      (document.getElementById(id_1) as HTMLInputElement).value ===
      (document.getElementById(id_2) as HTMLInputElement).value
    )
      return true;
    else {
      // // fields dont match - highlight them
      // (document.getElementById(id_1) as HTMLInputElement).style.color = "red";
      // (document.getElementById(id_2) as HTMLInputElement).style.color = "red";
      alert(error_message);
      return false;
    }
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
              type='email'
              // name='username'
              id='regUser1'
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
              type='email'
              // name='username'
              id='regUser2'
              placeholder='Confirm Reg email'
              required
            />
          </label>
          <label>
            <input
              type='password'
              // name='password'
              id='regPass1'
              minLength={8}
              placeholder='Reg password'
              required
              value={regPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRegPassword(e.target.value);
              }}
            />
          </label>
          <label>
            <input
              type='password'
              // name='username'
              id='regPass2'
              placeholder='Confirm Reg password'
              required
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
