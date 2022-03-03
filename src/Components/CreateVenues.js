import React from "react";
import "../Styling/CreateGroup.css";

const CreateVenues = ({ handleClose }) => {
  return (
    <div className='popup-box'>
      <div className='box'>
        <span className='close-icon' onClick={handleClose}>
          x
        </span>
        {
          <>
            <form>
              <h1>New Venue</h1>
              <div>
                <label>Name : </label>
                <input type='text' />
              </div>
              <div>
                <label>Your avatar: </label>
                <input type='text' />
              </div>
              <div>
                <label>Main Contact :</label>
                <input type='text' />
              </div>
              <div>
                <label> Telephone :</label>
                <input type='number' />
              </div>
              <div>
                <label>Email :</label>
                <input type='email' />
              </div>
              <div>
                <div>
                  <label>Street : </label>
                  <input type='text' />
                </div>
                <div>
                  <label>Number : </label>
                  <input type='text' />
                </div>
                <div>
                  <label>Postcode : </label>
                  <input type='text' />
                </div>
                <div>
                  <label>City : </label>
                  <input type='text' />
                </div>
                <div>
                  <label>Country : </label>
                  <input type='text' />
                </div>
              </div>
              <button>create</button>
            </form>
          </>
        }
      </div>
    </div>
  );
};

export default CreateVenues;
