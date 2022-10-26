import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Container } from 'react-bootstrap';
import Legtracker from '../utilities/Legtracker';
import CalModal from '../components/CalModal';

const Calendar = () => {
  const [upcomingHearings, setUpcomingHearings] = useState([]);
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
      <CalModal />
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
        />
      </Container>
    </div>
  );
};

export default Calendar;
