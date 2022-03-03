import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      {loading ? (
        <>
          <h1>{singleGroup.name}</h1>
          <img
            src={singleGroup.avatar_url}
            alt={`${singleGroup.name} picture`}
            style={{ height: "200px", width: "400px" }}
          />
          <p>
            Created by : {owner.name.first} {owner.name.last}
          </p>
          <ul>
            {members.length === 1 ? (
              <p>member</p>
            ) : members.length === 0 ? (
              <p>No members</p>
            ) : (
              <p>members</p>
            )}
            {members.map((member) => {
              return (
                <li>
                  <img
                    style={{ height: "200px", width: "400px" }}
                    src={member.avatar_url}
                  />
                  <br />
                  {member.name.first} {member.name.last}
                </li>
              );
            })}
          </ul>
          <ul>
            {instruments.length === 1 ? (
              <p>Instrument</p>
            ) : instruments.length === 0 ? (
              <p>No instruments</p>
            ) : (
              <p>Instruments</p>
            )}
            {instruments.map((instrument) => {
              return <li>{instrument}</li>;
            })}
          </ul>
        </>
      ) : (
        <p>....Loading</p>
      )}
    </div>
  );
}
