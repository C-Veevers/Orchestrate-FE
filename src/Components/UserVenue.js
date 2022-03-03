import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";
import { getUserVenues } from "../Utils/api";


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
    <div>
      <h4>venue component</h4>
    </div>
    {/* uikit slider */}
    <div data-uk-slider>
      {loading ? (
        <div
          className="uk-position-relative uk-visible-toggle uk-light"
          tabindex="-1"
        >
          <p>Your recent venues:</p>
          <ul className="uk-slider-items uk-child-width-1-1@s uk-child-width-1-2@m data-uk-grid">
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
      <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
    </div>
    <p>Looking for a venue?</p>
    <button
      class="uk-button uk-button-default uk-button-small"
      type="button"
      onClick={handleClick}
    >
      Search Venues
    </button>
    <br></br>
    <br></br>
  </div>
  );
}

{
  /* <Link to={`/venues/${loggedUser.venues[0].$oid}`}>
<p>{venues.name}</p>
<p>{venues.location.city}</p>
<p>{venues.contact.email}</p>
<img src={venues.avatar_url}/>
</Link> */
}
