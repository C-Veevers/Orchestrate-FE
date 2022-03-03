import "../Styling/Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/User";
import { useContext, useEffect } from "react";

export function Header() {
  const { isLoggedIn, setLoggedIn, loggedUser, setUser } = useContext(UserContext)

  useEffect(() => {
    if (!isLoggedIn) {
      setUser({})
    }
  }, [isLoggedIn])

  return (
    <div className='header'>
      <div className='title'>Orchestrate Logo</div>
      <nav className='nav-container'>
        {isLoggedIn ?
          <><Link to='/home'>
            <button className='nav-link'>Home</button>
          </Link>
            <Link to='/account'>
              <button className='nav-link'>Account</button>
            </Link>
            <div className='messages'>
              <Link to='/messages'>
                <button className='nav-link'>Messages</button>
              </Link>
            </div>
            <div className='status'>
              <Link to='/login'>
                <button onClick={() => setLoggedIn(false)} className='nav-link'>"Log Out"</button>
              </Link>
            </div>
          </>
          : null
        }
      </nav>
    </div>
  );
}
