const LoginForm = (props: {
    LoginData: any;
    handleLoginData: any;
    postLoginData: any;
  }) => {
    const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(LoginData);
      setLoginData({
        ...LoginData,
        [e.target.name]: e.target.value,
      });
    };
    const postLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
  
      console.log("Matching regForm");
      console.log(LoginData);
      fetch("/login", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json, text/plain, */*",
        },
        body: JSON.stringify(LoginData),
      })
        .then((response) => {
          console.log(response.statusText);
          console.log(response.status);
          if (
            response.statusText === "OK" &&
            response.status >= 200 &&
            response.status < 300
          ) {
            return response.text();
          } else {
            throw new Error("Server can't be reached!");
          }
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  
    return (
      <form onSubmit={(e) => props.postLoginData(e)}>
        <label>
          <input
            type='email'
            id='LoginEmail'
            name='email'
            placeholder='Enter email'
            required
            value={props.LoginData.email}
            onChange={(e) => props.handleLoginData(e)}
          />
        </label>
        <label>
          <input
            type='password'
            id='LoginPassword'
            name='password'
            placeholder='Enter password'
            required
            value={props.LoginData.password}
            onChange={(e) => props.handleLoginData(e)}
          />
        </label>
        <button> Send </button>
      </form>
    );
  };