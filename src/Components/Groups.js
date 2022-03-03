import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        const newGroups = [res, ...currGroups];
        return newGroups;
      });

      setRefresh(!refresh);
    });
  };

  const nameHandler = (event) => {
    const newName = event.target.value;
    const updatedGroup = { ...groupInfo };
    updatedGroup.name = newName;
    updatedGroup.avatar_url = `https://avatars.dicebear.com/api/initials/${newName}.svg`;
    setGroupInfo(updatedGroup);
  };

  const imageHandler = (event) => {
    const newImage = event.target.value;
    const updatedGroup = { ...groupInfo };
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
            <a className='uk-accordion-title' href='#'>
              Add Group
            </a>
            <div className='uk-accordion-content'>
              <form onSubmit={submitHandler}>
                <h1>New Group</h1>
                <div>
                  <label>Group Name : </label>
                  <input type='text' onChange={nameHandler} />
                </div>

                <div>
                  <label>Group Image: </label>
                  <input type='text' onChange={imageHandler} />
                </div>
                <div>
                  <label>Main Contact :</label>
                  <input type='text' onChange={contactHandler} />
                </div>
                <div>
                  <label>Email :</label>
                  <input type='email' onChange={emailHandler} />
                </div>
                <button type='submit'>create</button>
              </form>
            </div>
          </li>
        </ul>
        <div>
          {/* <input type='button' value='Add Group' onClick={toggleGroup} />
          {isOpen && (
            <CreateGroup
              handleClose={toggleGroup}
              setAllGroups={setAllGroups}
              setIsOpen={setIsOpen}
            />
          )} */}
        </div>
        {loading ? (
          <div>
            <ul>
              {allGroups.map((group) => {
                return (
                  <li key={`g${group._id}`}>
                    <Link to={`/groups/${group._id}`}>
                      <p>{group.name}</p>
                      <img
                        src={`https://avatars.dicebear.com/api/initials/${group.name}.svg`}
                        style={{
                          width: "100px",
                          borderRadius: "50%",
                        }}
                      />

                      {loggedUser._id === group.owner ? (
                        <>
                          <br />
                          <button>Delete Group</button>
                        </>
                      ) : null}
                      <p>Group Contact: {group.contact.name}</p>

                      {group.members.length === 1 ? (
                        <p>member: {group.members.length} </p>
                      ) : (
                        <p>members: {group.members.length} </p>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>....Loading</div>
        )}
      </div>
    </>
  );
}
