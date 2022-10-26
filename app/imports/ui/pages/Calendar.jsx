import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Container } from 'react-bootstrap';
import Legtracker from '../utilities/Legtracker';
import CalModal from '../components/CalModal';

const Calendar = () => {
  const [upcomingHearings, setUpcomingHearings] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    document.title = 'DOE Legislative Tracker - Calendar';
    Legtracker
      .scrapeUpcomingHearings()
      .then(initialData => {
        setUpcomingHearings(initialData.upcomingHearings);
      });
  }, []);

  return (
    <div id="mainBody">
      <CalModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <Container className="p-lg-5">
        <FullCalendar
          defaultView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          plugins={[dayGridPlugin]}
          events={upcomingHearings.map(data => (
            {
              title: data.measure,
              start: data.dateTime,
            }
          ))}
          /* eslint-disable-next-line react/jsx-no-bind */
          eventClick={function (info) {
            info.jsEvent.preventDefault();
            handleShow();
          }}
        />
      </Container>
    </div>
  );
};

export default Calendar;
