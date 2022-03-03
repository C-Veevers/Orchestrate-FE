import '../Styling/UserGroups.css';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";
import { getUserGroups } from "../Utils/api";
import { Header } from "./Header";

export function UserGroups() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const { loggedUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    navigate("/groups");
  };
  useEffect(() => {
    getUserGroups(loggedUser._id).then((groupsFromApi) => {
      setGroups(groupsFromApi);
      setLoading(true);
    });
  }, [loggedUser._id]);

  return (
    <div>
      <div className="button-container-find-groups">
      <button className="uk-button uk-button-default" type='button' onClick={handleClick}>
        Find your Orchestra
      </button>
      </div>
      {loading ? (
        <ul>
          {groups.map((group) => {
            return (
              <li key={group.name}>
                <h2>{group.name}</h2>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
