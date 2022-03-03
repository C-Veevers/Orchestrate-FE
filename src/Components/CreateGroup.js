import React, { useContext, useState } from "react";
import { UserContext } from "../Contexts/User";
import "../Styling/CreateGroup.css";
import { postGroup } from "../Utils/api";

const CreateGroup = ({ handleClose, setAllGroups, setIsOpen }) => {
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

  const submitHandler = (event) => {
    event.preventDefault();
    postGroup(groupInfo).then((res) => {
      setAllGroups((currGroups) => {
        console.log(currGroups);
        console.log(res);
        const newGroups = [res, ...currGroups];
        return newGroups;
      });
      setIsOpen(false);
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

  return (
    <>
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
        <button>create</button>
      </form>
    </>
  );
};

export default CreateGroup;
