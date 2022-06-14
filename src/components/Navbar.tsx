import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
    <ul>
    <li>
        <Link to='/'>Root</Link>
      </li>
      <li>
        <Link to='/home'>Home</Link>
      </li>
      {/* <li>
        <Link to='/goto'>Log in</Link>
      </li> */}
      <li>
        <Link to='/home/test1'>Test1</Link>
      </li>
      <li>
        <Link to='/home/test1/test2'>test2</Link>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar