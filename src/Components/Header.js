import "../Styling/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";
import { useContext, useEffect } from "react";
import logo from "../Images/logo.png";

export function Header() {
  const { isLoggedIn, setLoggedIn, setUser } =
    useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(e);
    navigate("/home");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setUser({});
    }
  }, [isLoggedIn, setUser]);

  return (
    <>
      <nav className='nav-container'>
        {isLoggedIn ? (
          <>
            <div className='nav-logo'>
              <img onClick={handleClick} src={logo} alt='orchestrate_logo' />
            </div>
            <div className='nav-links'>
              <Link to='/home' className='link-container'>
                <button className='nav-link'>Home</button>
              </Link>
              <Link to='/account' className='link-container'>
                <button className='nav-link'>Account</button>
              </Link>
              <div className='status'>
                <Link to='/login' className='link-container'>
                  <button
                    className='nav-link'
                    onClick={() => setLoggedIn(false)}>
                    Log Out
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </nav>
    </>
  );
}
