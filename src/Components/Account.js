import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";
import { Header } from "./Header";
import "../Styling/Account.css";

export function Account() {
  const navigate = useNavigate();
  const { loggedUser, setUser, isLoggedIn } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [newInst, setNewInst] = useState("");
  const [refresh, setRefresh] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const instrumentsInput = (event) => {
    setNewInst(event.target.value);
    console.log(newInst);
  };

  const deleteInstrument = (instrument) => {
    let updatedUser = { ...loggedUser };
    const newInsts = updatedUser.instruments.filter(
      (insts) => insts !== instrument
    );
    updatedUser.instruments = newInsts;
    setUser(updatedUser);
  };
  const AddInstruments = () => {
    let updateUser = { ...loggedUser };
    updateUser.instruments.push(newInst);
    setUser(updateUser);
    setRefresh(!refresh);
  };
  useEffect(() => {
    if (isLoggedIn) {
    } else {
      navigate("/login");
    }
  }, [editing, refresh, loggedUser, isLoggedIn, navigate]);
  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <div className='uk-flex-column uk-flex-around'>
            <div className='uk-width-1-1'>
              {editing ? null : (
                <button
                  className='account-button'
                  onClick={() => {
                    setEditing(true);
                  }}>
                  Edit Account <span data-uk-icon='icon: pencil'></span>
                </button>
              )}
            </div>
            <div className='uk-flex-column uk-width-1-1 uk-flex-around uk-margin-medium-top'>
              <div>
                <img alt="user image" src={loggedUser.avatar_url} className='account-img' />
              </div>
              <section className='account-form'>
                {editing ? (
                  <form onSubmit={submitHandler}>
                    <div>
                      <input type='text' placeholder={loggedUser.name.first} />

                      <input type='text' placeholder={loggedUser.name.last} />
                    </div>
                    <div>
                      <input type='text' placeholder={loggedUser.email} />
                    </div>
                    <div>
                      <input
                        type='text'
                        placeholder={loggedUser.location.postcode}
                      />
                      <br />
                      <input
                        type='text'
                        placeholder={loggedUser.location.city}
                      />
                      <br />
                      <input
                        type='text'
                        placeholder={loggedUser.location.country}
                      />
                      <br />
                    </div>
                    <div>
                      <label htmlFor='instrument'>Instruments:</label>
                      <input
                        name='instrument'
                        type='text'
                        onChange={instrumentsInput}
                      />
                      <button
                        onClick={() => {
                          AddInstruments();
                        }}>
                        Add
                      </button>
                      <br />
                      <div>
                        {loggedUser.instruments.map((instrument) => {
                          return (
                            <div
                              onClick={() => {
                                deleteInstrument(instrument);
                              }}>
                              {instrument}
                              <span data-uk-icon='close'></span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEditing(false);
                      }}>
                      Apply Changes
                    </button>
                  </form>
                ) : (
                  <>
                    <p className='uk-margin-top'>
                      User : {loggedUser.username}
                      <br />
                      Name:{loggedUser.name.first} {loggedUser.name.last}
                      <br />
                      Email: {loggedUser.email}
                      <br />
                      Location : {loggedUser.location.postcode},{" "}
                      {loggedUser.location.city}, {loggedUser.location.country}
                    </p>
                    <ul>
                      Instruments:
                      {loggedUser.instruments.map((instrument) => {
                        return <li key={loggedUser.name}>{instrument}</li>;
                      })}
                    </ul>
                  </>
                )}
              </section>
            </div>{" "}
          </div>
        </>
      ) : null}
    </>
  );
}
