const Profile = (props: { User: any; setUser: any; setIsAuth: any }) => {
  const User = props.User;
  const logout = async () => {
    // fetch logout endpoint
    // if success, setIsAuth to false, clear User
    const response = await fetch("http://127.0.0.1:8000/api/auth/logout", {
      method: "GET",
      // credentials: "include",
    });
    if (response.status === 200) {
      console.log("success, cookie deleted/logged out");
      props.setUser(undefined);
      props.setIsAuth(false);
    }
    console.log("test click");
    return;
  };
  return (
    <div>
      <h2>USER PROFILE PAGE!</h2>
      <div>
        {User.email}, {User.id}, {Number(User.disabled)}
      </div>
      <div>
        <button onClick={() => logout()}>Log-Out</button>
      </div>
    </div>
  );
};
export default Profile;
