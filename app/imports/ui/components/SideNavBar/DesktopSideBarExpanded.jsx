import React from 'react';
import { Nav, Button, Col } from 'react-bootstrap';
import {
  HouseFill,
  CardList,
  CalendarEventFill,
  QuestionCircle,
  Save2,
} from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import SignoutCheck from '../SignoutCheck';

const DesktopSideBarExpanded = (props) => {
  const openWidth = '130px';
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
            href="/view/all"
            className="py-3 navButtons"
            style={page === 'all-bills' ? openSelected : openReg}
          >
            <CardList className="mb-1 me-3 ms-1" style={{ fontSize: '20px' }} />
            All Bills
          </Nav.Link>
          <Nav.Link
            href="/view/DOE"
            className="py-3 navButtons"
            style={page === 'doe-bills' ? openSelected : openReg}
          >
            <Save2
              style={{ fontSize: '20px' }}
              className="mb-1 me-3 ms-1"
            />DOE Bills
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

DesktopSideBarExpanded.propTypes = {
  page: PropTypes.string.isRequired,
};

export default DesktopSideBarExpanded;
