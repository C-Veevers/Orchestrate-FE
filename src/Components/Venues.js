import { useState, useEffect, useContext } from "react";
import { getAllVenues, postVenue } from "../Utils/api";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import CreateVenues from "./CreateVenues";
import { UserContext } from "../Contexts/User";

export function Venues() {
  const { loggedUser } = useContext(UserContext);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [newVenue, setNewVenue] = useState({
    name: "",
    avatar_url: "https://avatars.dicebear.com/api/adventurer/bridgewater.svg",
    location: {
      street: "",
      number: "",
      postcode: "",
      city: "",
      country: "",
    },
    contact: {
      name: `${loggedUser.name.first} ${loggedUser.name.last}`,
      number: parseInt("0789123659"),
      email: loggedUser.email,
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    postVenue(newVenue).then((res) => {
      setRefresh(!refresh);
      setNewVenue({
        name: "",
        avatar_url:
          "https://avatars.dicebear.com/api/adventurer/bridgewater.svg",
        location: {
          street: "",
          number: "",
          postcode: "",
          city: "",
          country: "",
        },
        contact: {
          name: `${loggedUser.name.first} ${loggedUser.name.last}`,
          number: parseInt("0789123659"),
          email: loggedUser.email,
        },
      });
    });
  };

  const nameHandler = (event) => {
    let newVenueName = event.target.value;
    let updatedVenue = { ...newVenue };
    updatedVenue.name = newVenueName;
    updatedVenue.avatar_url = `https://avatars.dicebear.com/api/initials/${newVenueName}.svg`;
    setNewVenue(updatedVenue);
  };

  const streetHandler = (event) => {
    let newVenueStreet = event.target.value;
    let updatedVenue = { ...newVenue };
    updatedVenue.location.street = newVenueStreet;
    setNewVenue(updatedVenue);
  };
  const numberHandler = (event) => {
    let newVenueNumber = event.target.value;
    let updatedVenue = { ...newVenue };
    updatedVenue.location.street = newVenueNumber;
    setNewVenue(updatedVenue);
  };
  const postcodeHandler = (event) => {
    let newVenuePostcode = event.target.value;
    let updatedVenue = { ...newVenue };
    updatedVenue.location.street = newVenuePostcode;
    setNewVenue(updatedVenue);
  };
  const cityHandler = (event) => {
    let newVenueCity = event.target.value;
    let updatedVenue = { ...newVenue };
    updatedVenue.location.street = newVenueCity;
    setNewVenue(updatedVenue);
  };
  const countryHandler = (event) => {
    let newVenueCountry = event.target.value;
    let updatedVenue = { ...newVenue };
    updatedVenue.location.street = newVenueCountry;
    setNewVenue(updatedVenue);
  };
  useEffect(async () => {
    const allVenues = await getAllVenues();
    console.log(allVenues);
    setVenues(allVenues);
    setLoading(true);
  }, [refresh]);

  return (
    <>
      <Header />
      <ul data-uk-accordion>
        <li className='uk-close'>
          <a className='uk-accordion-title' href='#'>
            Add Venue
          </a>
          <div className='uk-accordion-content'>
            <form onSubmit={handleSubmit}>
              <h1>New Venue</h1>
              <div>
                <label>Venue Name : </label>
                <input
                  type='text'
                  onChange={nameHandler}
                  value={newVenue.name}
                />
              </div>
              <div>
                <div>
                  <label>Street : </label>
                  <input
                    type='text'
                    onChange={streetHandler}
                    value={newVenue.location.street}
                  />
                </div>
                <div>
                  <label>Number : </label>
                  <input
                    type='text'
                    onChange={numberHandler}
                    value={newVenue.location.number}
                  />
                </div>
                <div>
                  <label>Postcode : </label>
                  <input
                    type='text'
                    onChange={postcodeHandler}
                    value={newVenue.location.postcode}
                  />
                </div>
                <div>
                  <label>City : </label>
                  <input
                    type='text'
                    onChange={cityHandler}
                    value={newVenue.location.city}
                  />
                </div>
                <div>
                  <label>Country : </label>
                  <input
                    type='text'
                    onChange={countryHandler}
                    value={newVenue.location.country}
                  />
                </div>
              </div>
              <button>create</button>
            </form>
          </div>
        </li>
      </ul>

      {loading ? (
        <div>
          <ul>
            {venues.map((venue) => {
              return (
                <li key={venue.name}>
                  <Link to={`/venues/${venue._id}`}>
                    <h1>{venue.name}</h1>
                    <img
                      src={`https://avatars.dicebear.com/api/initials/${venue.name}.svg`}
                      style={{
                        height: "200px",
                        width: "200px",
                        "border-radius": "50%",
                      }}
                    />
                    <p>Location: {venue.location.city}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
