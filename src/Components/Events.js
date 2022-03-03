import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import { useEffect, useState, useContext } from 'react'
import { setUserEvent, getUserEvents, removeEvent } from '../Utils/api'
import { UserContext } from '../Contexts/User';

export function Events() {

    const [eventList, setEventList] = useState([])
    const { loggedUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
    const [eventTitle, setEventTitle] = useState('')
    const [refresh, setRefresh] = useState(false)

    const updateEvents = () => {
        if (selectedDayRange.from === null || selectedDayRange.to === null) {
            setError(true)
            setRefresh(!refresh)
        } else {
            setError(false)
            setUserEvent(selectedDayRange, loggedUser._id, eventTitle).then(() => {
                setSelectedDayRange({
                    from: null,
                    to: null
                })
                setRefresh(!refresh)
            })
        }
    }

    const inputHandler = (event) => {
        setEventTitle(event.target.value)
    }

    const deleteEvent = (id) => {
        removeEvent(id, loggedUser._id).then(() => {
            setRefresh(!refresh)
        })
    }

    useEffect(() => {
        getUserEvents(loggedUser._id).then((events) => {
            setEventList(events)
            setIsLoading(false)
        })
    }, [refresh, loggedUser._id])

    return (
        <div>
            <h4>Event Component</h4>
            <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" data-uk-slider>
                <ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-flex uk-flex-center">
                    {!isLoading
                        ? eventList.map((event) => {
                            const { title = 'rehearsal' } = event
                            const from = event.from
                            const to = event.to
                            return (
                                <div class="uk-panel">
                                    <div key={event._id} className="uk-card uk-card-default uk-card-body">
                                        <div class="uk-position-center">
                                            {title}
                                            <br />{`from ${from.day}/${from.month}/${from.year}`}<br />
                                            {`to ${to.day}/${to.month}/${to.year}`}
                                        </div>
                                        <div>
                                            <button onClick={() => { deleteEvent(event._id) }}>X</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : <p>Loading</p>
                    }
                </ul>

                <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
                <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>

            </div>
            <ul data-uk-accordion>
                <li>
                    <button className="uk-button uk-button-default uk-accordion-title ">
                        Add Event <span uk-icon="calendar"></span>
                    </button>
                    <div className="uk-accordion-content">
                        <div className="uk-flex uk-flex-center">
                            <Calendar
                                value={selectedDayRange}
                                onChange={setSelectedDayRange}
                                colorPrimary="#0fbcf9"
                                colorPrimaryLight="rgba(75, 207, 250, 0.4)"
                                calendarClassName="responsive-calendar"
                                shouldHighlightWeekends
                                //disabledDays={[{year: 0000, month: 0, day:00}]}
                                renderFooter={() => (<>
                                    <div><input onChange={inputHandler} placeholder='Enter event title'></input></div>
                                    <p className='uk-margin'>
                                        <button className='uk-button uk-button-primary uk-button-small'
                                            type="button"
                                            onClick={() => {
                                                setSelectedDayRange({
                                                    from: null,
                                                    to: null
                                                })
                                            }}
                                        >
                                            Reset Value!
                                        </button>
                                        <button className='uk-margin-left uk-button uk-button-primary uk-button-small'
                                            type="button"
                                            onClick={() => { updateEvents() }}
                                        >
                                            Add Event
                                        </button>
                                        {(error) ? <><br />Please Select a date range</> : null}
                                    </p></>)}
                            />
                        </div>
                    </div>
                </li>
            </ul >
        </div>



    )
}






