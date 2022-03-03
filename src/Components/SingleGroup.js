import grouplogo from "../Images/group.jpeg";
import "../Styling/SingleGroup.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import {
  getGroupOwner,
  getSingleGroup,
  getSingleGroupMembers,
} from "../Utils/api";

export function SingleGroup() {
  const { _id } = useParams();
  const [singleGroup, setSingleGroup] = useState({});
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState({});
  const [members, setMembers] = useState([]);
  const [instruments, setInstruments] = useState([]);

  const instrumentsInventory = () => {
    const instruments = {};
    members.map((member) => {
      member.instruments.map((instrument) => {
        instruments[instrument]
          ? (instruments[instrument] += 1)
          : (instruments[instrument] = 1);
      });
    });

    owner.instruments.map((instrument) => {
      instruments[instrument]
        ? (instruments[instrument] += 1)
        : (instruments[instrument] = 1);
    });
    const instrumentsList = Object.keys(instruments);
    setInstruments(instrumentsList);
  };

  useEffect(async () => {
    const group = await getSingleGroup(_id);
    setSingleGroup(group);
    const creator = await getGroupOwner(_id);
    setOwner(creator);
    const groupMembs = await getSingleGroupMembers(_id);
    setMembers(groupMembs);
    setLoading(true);
    instrumentsInventory();
  }, [_id]);

  // useEffect(() => {}, []);

  return (
    <div>
      <Header />
      <div className='singleGroup-contain'>
        {loading ? (
          <>
            <h1>{singleGroup.name}</h1>
            <img
              className='single-group-img'
              src={singleGroup.avatar_url}
              alt={`${singleGroup.name} picture`}
            />
            <p>
              Group Leader : {owner.name.first} {owner.name.last}
            </p>
            <button>
              Join <span data-uk-icon='icon: plus-circle'></span>
            </button>

            <ul>
              {members.length === 1 ? (
                <p>Current group member:</p>
              ) : members.length === 0 ? (
                <p>No members</p>
              ) : (
                <h3>Current Group Members</h3>
              )}
              {members.map((member) => {
                return (
                  <li key={member._id}>
                    <img
                      className='group-user-avatar'
                      src={member.avatar_url}
                    />
                    <br />
                    <p>
                      {member.name.first} {member.name.last}
                      <br />
                      Instruments: {member.instruments[0]}
                    </p>
                    <hr />
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p>....Loading</p>
        )}
      </div>
    </div>
  );
}
