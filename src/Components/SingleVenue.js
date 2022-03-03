import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById } from "../Utils/api";
import { Header } from "../Components/Header";
import "../Styling/SingleVenue.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

export function SingleVenue() {
  const { _id } = useParams();
  const [singleVenue, setSingleVenue] = useState({});

  const [loading, setLoading] = useState(false);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    getVenueById(_id).then((res) => {
      setSingleVenue(res);
      setLoading(true);
      console.log(res);
    });
  }, [_id]);

  return (
    <div>
      <Header />
      {loading ? (
        <div>
          <ul data-uk-accordion>
            <li className='add-events'>
              <button className='event-button uk-accordion-title '>
                Book Venue <span uk-icon='calendar'></span>
              </button>

              <div className='uk-accordion-content'>
                <div className='uk-flex uk-flex-center'>
                  <Calendar
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    colorPrimary='#0fbcf9'
                    colorPrimaryLight='rgba(75, 207, 250, 0.4)'
                    calendarClassName='responsive-calendar'
                    shouldHighlightWeekends
                    //disabledDays={[{year: 0000, month: 0, day:00}]}
                    renderFooter={() => (
                      <>
                        <div>
                          <p>Select Dates</p>
                        </div>
                        <p className='uk-margin'>
                          <button
                            className='uk-button uk-button-default uk-button-small'
                            type='button'
                            onClick={() => {
                              setSelectedDayRange({
                                from: null,
                                to: null,
                              });
                            }}>
                            Reset Value!
                          </button>
                          <button
                            className='uk-margin-left uk-button uk-button-default uk-button-small'
                            type='button'>
                            Book date
                          </button>
                          {error ? (
                            <>
                              <br />
                              Please Select a date range
                            </>
                          ) : null}
                        </p>
                      </>
                    )}
                  />
                </div>
              </div>
            </li>
          </ul>
          <h1>{singleVenue.name}</h1>
          <div className='venue-info'>
            <img src={singleVenue.map} />
            <div className='venue-details'>
              <div className='venue-contain'>
                <ul>
                  <p>Contact:</p>
                  <li>{singleVenue.contact.name}</li>
                  <li>{singleVenue.contact.number}</li>
                  <li>{singleVenue.contact.email}</li>
                </ul>
              </div>
              <div className='venue-contain'>
                <ul>
                  <p>Location:</p>
                  <li>
                    {singleVenue.location.number} {singleVenue.location.street}
                  </li>

                  <li>{singleVenue.location.postcode}</li>
                  <li>{singleVenue.location.city}</li>
                  <li>{singleVenue.location.country}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
