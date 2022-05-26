import { useState } from "react";
import { IUser } from "../types";

const Login = (props: {setIsAuth: any}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const postLoginForm = async (e: React.FormEvent) => {
    // run get User here too?>
    e.preventDefault();
    const data = new FormData();
    if (username !== undefined && password !== undefined) {
    data.append('username', username);
    data.append('password', password);
    data.append('grant_type', "password");
    } else {
      throw Error;
    }
    const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      body: data,
      // https://stackoverflow.com/a/51726055
      // to use cookies, have credentials: 'include' in ALL api calls
      credentials: 'include'
    });
    if (
      response.statusText === "OK" &&
      response.status >= 200 &&
      response.status < 300
    ) {
      console.log("logged in");
      props.setIsAuth(true);
    } else {
      throw new Error("Server can't be reached!");
    }
  };
  const LoginForm = () => {
    return (
      <form onSubmit={(e) => postLoginForm(e)}>
        <label>
          <input
            type='text'
            // id='LoginEmail'
            name='username'
            placeholder='Enter email'
            required
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </label>
        <label>
          <input
            type='password'
            // id='LoginPassword'
            name='password'
            placeholder='Enter password'
            required
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
              e.preventDefault();
            }
            }
          />
        </label>
        <button> Send </button>
      </form>
    );
  };

  return (
    <div>
      <h2>LOGIN PAGE!!</h2>
      {LoginForm()}
    </div>
  );
};
export default Login;
