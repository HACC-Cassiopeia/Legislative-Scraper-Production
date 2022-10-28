import React, { useState, useEffect } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { HouseFill, CardList, CalendarEventFill, List } from 'react-bootstrap-icons';
import '../style/Component.css';
import DesktopSideBar from './DesktopSideBar';
import MobileSignOutCheck from '../MobileSignOutCheck';

const MobileSideBar = () => {
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
  const breakPoint = 800;

  const closeSideBarStyle = {
    position: 'fixed',
    width: '60px',
    minHeight: '100vh',
    backgroundColor: '#2e374f',
    color: 'white',
    fontSize: '14px',
    zIndex: 300,
  };

  const closedButtonStyle = {
    backgroundColor: '#2e374f',
    width: '60px',
    fontWeight: 'normal',
    fontSize: '20px',
    marginLeft: 0,
    padding: 0,
    marginTop: 0,
    marginRight: '5px',
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

  if (width > breakPoint) {
    return <DesktopSideBar />;
  }
  return (
    <Nav className="justify-content-start" style={closeSideBarStyle} activeKey="/home">
      <Nav.Item>
        <Button
          className="py-2 px-3 text-center"
          style={closedButtonStyle}
          onClick={handleShow}
        >
          <List />
        </Button>
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
        <Nav.Link />
      </Nav.Item>
    </Nav>
  );
};
export default MobileSideBar;
