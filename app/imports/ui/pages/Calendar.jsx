import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Container } from 'react-bootstrap';
import Legtracker from '../utilities/Legtracker';
import CalModal from '../components/CalModal';

const Calendar = () => {
  const [upcomingHearings, setUpcomingHearings] = useState([]);
  // modal states
  const [show, setShow] = useState(false);
  const [measure, setMeasures] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');
  const [youtube, setYoutube] = useState('');
  const [noticeLink, setNoticeLink] = useState('');
  const [noticeLinkPdf, setNoticeLinkPdf] = useState('');
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

  const hasUpcomingHearings = () => {
    if (upcomingHearings.length === 0) {
      return [];
    }
    return upcomingHearings.map(data => (
      {
        title: data.measure,
        start: data.dateTime,
        room: data.room,
        youtube: data.youtubeURL,
        noticeLink: data.noticeURL,
        noticePdfLink: data.noticePdfURL,
      }
    ));
  };

  return (
    <div id="mainBody">
      <CalModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        measure={measure}
        time={time}
        room={room}
        youtube={youtube}
        noticeUrl={noticeLink}
        noticePdf={noticeLinkPdf}
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
          events={hasUpcomingHearings()}
          /* eslint-disable-next-line react/jsx-no-bind */
          eventClick={function (info) {
            info.jsEvent.preventDefault();
            setMeasures(info.event.title);
            setTime(info.event.start.toLocaleString());
            setRoom(info.event.extendedProps.room);
            setYoutube(info.event.extendedProps.youtube);
            setNoticeLink(info.event.extendedProps.noticeLink);
            setNoticeLinkPdf(info.event.extendedProps.noticePdfLink);
            handleShow();
          }}
        />
      </Container>
    </div>
  );
};

export default Calendar;
