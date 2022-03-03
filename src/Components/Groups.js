import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import grouplogo from "../Images/group.jpeg";
import "../Styling/Groups.css";
import { getAllGroups } from "../Utils/api";
import { Header } from "./Header";
import { UserContext } from "../Contexts/User";
import { postGroup } from "../Utils/api";

export function Groups() {
  const [allGroups, setAllGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedUser } = useContext(UserContext);
  const [refresh, setRefresh] = useState(false);
  const [groupInfo, setGroupInfo] = useState({
    owner: loggedUser._id,
    contact: {
      name: "",
      email: "",
    },
    name: "",
    avatar_url: "",
  });
  // const [isOpen, setIsOpen] = useState(false);
  // const navigate = useNavigate();

  // const toggleGroup = () => {
  //   setIsOpen(!isOpen);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    postGroup(groupInfo).then((res) => {
      setAllGroups((currGroups) => {
        return [res[0], ...currGroups];
      });

      setRefresh(!refresh);
      setGroupInfo({
        owner: loggedUser._id,
        contact: {
          name: "",
          email: "",
        },
        name: "",
        avatar_url: "",
      });
    });
  };

  const nameHandler = (event) => {
    const newName = event.target.value;
    const updatedGroup = { ...groupInfo };
    updatedGroup.name = newName;
    updatedGroup.avatar_url = `https://avatars.dicebear.com/api/initials/${newName}.svg`;
    setGroupInfo(updatedGroup);
  };

  const contactHandler = (event) => {
    const newContact = event.target.value;
    const updatedGroup = { ...groupInfo };
    updatedGroup.contact.name = newContact;
    setGroupInfo(updatedGroup);
  };
  const emailHandler = (event) => {
    const newEmail = event.target.value;
    const updatedGroup = { ...groupInfo };
    updatedGroup.contact.email = newEmail;
    setGroupInfo(updatedGroup);
  };
  useEffect(() => {
    getAllGroups().then((groups) => {
      setAllGroups(groups);
      setLoading(true);
    });
  }, [refresh]);

  return (
    <>
      <Header />
      <div>
        <ul data-uk-accordion>
          <li className='uk-close'>
            <button className='uk-accordion-title add-group-button button-li'>
              Add Group
            </button>
            <div className='uk-accordion-content'>
              <form onSubmit={submitHandler}>
                <h1>New Group</h1>
                <div>
                  <input
                    type='text'
                    placeholder='Group Name'
                    onChange={nameHandler}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Main Contact'
                    onChange={contactHandler}
                  />
                </div>
                <div>
                  <input
                    type='email'
                    placeholder='Email'
                    onChange={emailHandler}
                  />
                </div>
                <button className='create-group-button' type='submit'>
                  create
                </button>
              </form>
            </div>
          </li>
        </ul>
        {loading ? (
          <div className='display-groups'>
            <ul>
              {allGroups.map((group) => {
                return (
                  // <li key={`g${group._id}`}>
                  //   <Link to={`/groups/${group._id}`}>
                  //     <p>{group.name}</p>
                  //     <img
                  //       src={`https://avatars.dicebear.com/api/initials/${group.name}.svg`}
                  //       style={{
                  //         width: "100px",
                  //         borderRadius: "50%",
                  //       }}
                  //       alt={group.name}
                  //     />

                  //     {loggedUser._id === group.owner ? (
                  //       <>
                  //         <br />
                  //         <button>Delete Group</button>
                  //       </>
                  //     ) : null}
                  //     <p>Group Contact: {group.contact.name}</p>

                  //     {group.members.length === 1 ? (
                  //       <p>member: {group.members.length} </p>
                  //     ) : (
                  //       <p>members: {group.members.length} </p>
                  //     )}
                  //   </Link>
                  // </li>
                  <div className='group-card'>
                    <li key={`g${group._id}`}>
                      <Link to={`/groups/${group._id}`} className='singlecard'>
                        <div id='group-name'>
                          <p>{group.name}</p>
                        </div>
                        <div className='logo-contact'>
                          <div id='group-img'>
                            <img
                              className='group-logo'
                              src={group.avatar_url}
                            />
                          </div>
                          <div className='right-side'>
                            <div id='group-contact'>
                              <p>Group Lead: {group.contact.name}</p>
                            </div>

                            <div className='members'>
                              {group.members.length === 1 ? (
                                <p>member: {group.members.length} </p>
                              ) : (
                                <p>members: {group.members.length} </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        ) : (
          <div data-uk-spinner></div>
        )}
      </div>
    </>
  );
}
