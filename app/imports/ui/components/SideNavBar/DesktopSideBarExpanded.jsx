import React, { useState, useEffect } from 'react';
import { Nav, Button, Col } from 'react-bootstrap';
import {
  ChevronLeft,
  HouseFill,
  CardList,
  CalendarEventFill,
  List,
  QuestionCircle,
} from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import SignoutCheck from '../SignoutCheck';
import MobileSignOutCheck from '../MobileSignOutCheck';

const DesktopSideBar = (props) => {
  // the width of the screen using React useEffect
  const [width, setWidth] = useState(window.innerWidth);
  // make sure that it changes with the window size
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
      console.log(width);
    };
  }, []);

  const openWidth = '130px';
  const closeWidth = '62px';
  const { page } = props;

  const showSideBarStyle = {
    position: 'fixed',
    minHeight: '100vh',
    minWidth: openWidth,
    // maxWidth: openWidth,  <- these lines mess up the layout by making the navbar too narrow
    // width: openWidth,
    backgroundColor: '#2e374f',
    color: 'white',
    fontSize: '14px',
    zIndex: 300,
  };

  const closeSideBarStyle = {
    position: 'fixed',
    width: closeWidth,
    minWidth: closeWidth,
    maxWidth: closeWidth,
    minHeight: '100vh',
    backgroundColor: '#2e374f',
    color: 'white',
    fontSize: '14px',
    zIndex: 300,
  };

  const buttonStyle = {
    backgroundColor: '#2e374f',
    borderWidth: 0,
    minWidth: openWidth,
    fontWeight: 'normal',
    fontSize: '20px',
    marginLeft: 0,
    padding: 0,
    marginTop: 0,
    marginRight: '5px',
    boxShadow: 'none',
  };

  const closedButtonStyle = {
    backgroundColor: '#2e374f',
    width: '60px',
    borderWidth: 0,
    fontWeight: 'normal',
    fontSize: '20px',
    marginLeft: 0,
    padding: 0,
    marginTop: 0,
    marginRight: '5px',
    boxShadow: 'none',
  };

  const closedSelected = {
    width: '60px',
    color: 'white',
    backgroundColor: '#242c41',
  };

  const closedReg = {
    width: '60px',
    color: 'white',
    backgroundColor: '#2e374f',
  };

  const openSelected = {
    color: 'white',
    backgroundColor: '#242c41',
  };

  const openReg = {
    color: 'white',
    backgroundColor: '#2e374f',
  };

  return (
    <Col className="col-3">
      <Nav
        style={showSideBarStyle}
        className="justify-content-start"
        activeKey="/home"
      >
        <Nav.Item style={{ width: '100%' }}>
          <Button
            className="py-2 ms-2 px-3 text-end navButtons"
            style={buttonStyle}
          >
            <ChevronLeft />
          </Button>
          <Nav.Link
            href="/"
            className="py-3 navButtons"
            style={page === 'home' ? openSelected : openReg}
          >
            <HouseFill
              style={{ fontSize: '20px' }}
              className="mb-1 me-3 ms-1"
            />
            Home
          </Nav.Link>
          <Nav.Link
            href="/view/DOE"
            className="py-3 navButtons"
            style={page === 'bills' ? openSelected : openReg}
          >
            <CardList
              style={{ fontSize: '20px' }}
              className="mb-1 me-3 ms-1"
            />
            View Bills
          </Nav.Link>
          <Nav.Link
            href="/calendar"
            className="py-3 navButtons"
            style={page === 'calendar' ? openSelected : openReg}
          >
            <CalendarEventFill
              style={{ fontSize: '20px' }}
              className="mb-1 me-3 ms-1"
            />
            Calendar
          </Nav.Link>
          <SignoutCheck />
          <Button
            className="navButtons"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '8px',
              fontSize: '20px',
              backgroundColor: '#2e374f',
              borderWidth: 0,
              boxShadow: 'none',
            }}
          >
            <QuestionCircle />
          </Button>
        </Nav.Item>
      </Nav>
    </Col>
  );
};

DesktopSideBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default DesktopSideBar;
