import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Container, Col, Button } from 'react-bootstrap';
import { ChevronLeft, List } from 'react-bootstrap-icons';
import Legtracker from '../utilities/Legtracker';
import CalModal from '../components/CalModal';
import DesktopSideBarCollapsed from '../components/SideNavBar/DesktopSideBarCollapsed';
import DesktopSideBarExpanded from '../components/SideNavBar/DesktopSideBarExpanded';

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
  const [expanded, setExpanded] = useState(false);
  const closeWidth = '62px';
  const openWidth = '131.5px';

  useEffect(() => {
    document.title = 'DOELT - Calendar';
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
  const mainBodyLeftMargin = {
    marginLeft: expanded ? openWidth : closeWidth,
  };
  const closedButtonStyle = {
    backgroundColor: '#2e374f',
    width: closeWidth,
    borderRadius: 0,
    borderWidth: 0,
    fontWeight: 'normal',
    fontSize: '20px',
    boxShadow: 'none',
  };
  const buttonStyle = {
    backgroundColor: '#2e374f',
    borderWidth: 0,
    borderRadius: 0,
    width: openWidth,
    fontWeight: 'normal',
    fontSize: '20px',
    marginTop: 0,
    boxShadow: 'none',
  };
  function getDesktopSidebar() {
    if (expanded) {
      return (
        <Col className="col-3" style={{ position: 'fixed' }}>
          <Button
            onClick={() => setExpanded(false)}
            className="py-2 px-3 text-end navButtons"
            style={buttonStyle}
          >
            <ChevronLeft />
          </Button>
          <DesktopSideBarExpanded page="home" />
        </Col>
      );
    }
    return (
      <Col style={{ position: 'fixed' }}>
        <Button
          onClick={() => setExpanded(true)}
          className="py-2 px-3 text-center navButtons"
          style={closedButtonStyle}
        >
          <List />
        </Button>
        <DesktopSideBarCollapsed page="home" />
      </Col>
    );
  }

  return (
    <Col>
      {getDesktopSidebar()}
      <div style={mainBodyLeftMargin} className="d-flex justify-content-center">
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
    </Col>

  );
};

export default Calendar;
