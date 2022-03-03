import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById } from "../Utils/api";

export function SingleVenue() {
  const { _id } = useParams();
  const [singleVenue, setSingleVenue] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getVenueById(_id).then((res) => {
      setSingleVenue(res);
      setLoading(true);
      console.log(res);
    });
  }, [_id]);

  return (
    <div>
      {loading ? (
        <div>
          <h1>{singleVenue.name}</h1>
          <img src={singleVenue.avatar_url} />
          <ul>
            <li>{singleVenue.contact.name}</li>
            <li>{singleVenue.contact.number}</li>
            <li>{singleVenue.contact.email}</li>
          </ul>
          <ul>
            <li>{singleVenue.location.number}</li>
            <li>{singleVenue.location.street}</li>
            <li>{singleVenue.location.postcode}</li>
            <li>{singleVenue.location.city}</li>
            <li>{singleVenue.location.country}</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
