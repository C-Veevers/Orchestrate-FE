import "../Styling/UserVenue.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";
import { getUserVenues } from "../Utils/api";
import bridgewater from "../Images/bridgewater.jpeg"
import stoller from "../Images/stoller.jpeg"

export function UserVenue() {
  const { loggedUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [newVenue, setNewVenue] = useState([]);
  const handleClick = () => {
    navigate("/venues");
  };

  useEffect(() => {
    getUserVenues(loggedUser._id)
      .then((res) => {
        setNewVenue(res);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* uikit slider */}
      <div data-uk-slider>
        {loading ? (
          <div
            className="uk-position-relative uk-visible-toggle uk-light"
            tabindex="-1"
          >
            <p>Your recent venues:</p>
            {/* <ul className="uk-slider-items uk-child-width-1-1@s uk-child-width-1-2@m data-uk-grid">
              {newVenue.map((venue) => {
                return (
                  <li key={`v${venue._id}`}>
                    {
                      <Link to={`/venues/${venue._id}`}>
                        <p>{venue.name}</p>
                        <p>{venue.location.city}</p>
                        <p>{venue.contact.email}</p>
                        <img
                          src={venue.avatar_url}
                          style={{ height: "200px", width: "400px" }}
                        />
                      </Link>
                    }
                  </li>
                );
              })}
            </ul> */}

            {/* hard coded for demo video */}
            <ul className="uk-slider-items uk-child-width-1-1@s uk-child-width-1-2@m uk-grid">
            <li className="venue-card">
            <p>The Bridgewater Hall</p>
            <img src={bridgewater} alt="bridgewater_hall_image" />
            <p>Lower Mosley Street, Manchester</p>
            <p>Contact: 0161 907 9000</p>
              </li>
              <li className="venue-card">
            <p>Stoller Hall</p>
            <img src={stoller} alt="stoller_hall_image" />
            <p>Hunts Bank, Manchester</p>
            <p>Contact: 0333 130 0967</p>
              </li>
              </ul>
            <a
              className="uk-position-center-left uk-position-small uk-hidden-hover"
              href="#"
              data-uk-slidenav-previous
              data-uk-slider-item="previous"
            ></a>
            <a
              className="uk-position-center-right uk-position-small uk-hidden-hover"
              href="#"
              data-uk-slidenav-next
              data-uk-slider-item="next"
            ></a>
          </div>
        ) : null}
      </div>
      <p>Looking for a venue?</p>
      <div className="button-container-search-venues">
      <button
        className="uk-button uk-button-default"
        type="button"
        onClick={handleClick}
      >
        Search Venues
      </button>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

// {
//   <Link to={`/venues/${loggedUser.venues[0].$oid}`}>
// <p>{venues.name}</p>
// <p>{venues.location.city}</p>
// <p>{venues.contact.email}</p>
// <img src={venues.avatar_url}/>
// </Link> 
// }
