import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Container } from 'react-bootstrap';
// added
function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = `0${month}`;
  }

  return dayString.replace('YEAR', year).replace('MONTH', month);
}

const events = [
  {
    title: 'Meeting',
    start: getDate('YEAR-MONTH-11T10:30:00+00:00'),
    end: getDate('YEAR-MONTH-11T12:30:00+00:00'),
  },
  { title: 'Happy Hour', start: getDate('YEAR-MONTH-13T17:30:00+00:00') },
  { title: 'Dinner', start: getDate('YEAR-MONTH-18T20:00:00+00:00') },
];

const Calendar = () => {
  useEffect(() => {
    document.title = 'DOE Legislative Tracker - Calendar';
  });

  return (
    <div id="mainBody">
      <Container className="p-lg-5">
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          plugins={[dayGridPlugin]}
          events={events}
        />
      </Container>
    </div>
  );
};

export default Calendar;
