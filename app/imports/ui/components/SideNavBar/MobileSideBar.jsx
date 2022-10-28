import React, { useState, useEffect } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { HouseFill, CardList, CalendarEventFill, QuestionCircle } from 'react-bootstrap-icons';
import '../style/Component.css';
import PropTypes from 'prop-types';
import MobileSignOutCheck from '../MobileSignOutCheck';

const MobileSideBar = (props) => {
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
    };
  }, []);

  const closeSideBarStyle = {
    position: 'fixed',
    width: '60px',
    minHeight: '100vh',
    backgroundColor: '#2e374f',
    color: 'white',
    fontSize: '14px',
    zIndex: 300,
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

  const { page } = props;

  return (
    <Nav className="justify-content-start" style={closeSideBarStyle} activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/" className="py-3" style={page === 'home' ? closedSelected : closedReg}>
          <HouseFill className="mb-1 ms-1" style={{ fontSize: '20px' }} />
        </Nav.Link>
        <Nav.Link href="/view/DOE" className="py-3" style={page === 'bills' ? closedSelected : closedReg}>
          <CardList className="mb-1 ms-1" style={{ fontSize: '20px' }} />
        </Nav.Link>
        <Nav.Link href="/calendar" className="py-3" style={page === 'calendar' ? closedSelected : closedReg}>
          <CalendarEventFill className="mb-1 ms-1" style={{ fontSize: '20px' }} />
        </Nav.Link>
        <MobileSignOutCheck style={{ fontSize: '20px' }} />
        <Button style={{
          position: 'absolute',
          bottom: 0,
          left: '8px',
          fontSize: '20px',
          backgroundColor: '#2e374f',
          borderWidth: 0,
        }}
        ><QuestionCircle />
        </Button>
      </Nav.Item>
    </Nav>
  );
};

MobileSideBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default MobileSideBar;
