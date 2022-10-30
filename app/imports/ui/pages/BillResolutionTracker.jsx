import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Col, Button } from 'react-bootstrap';
import { FileEarmarkPlusFill, BoxArrowInDown, ChevronLeft, List } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import BillResolutionDetails from '../components/billDetails/BillResolutionDetails';
import TestimonyTracker from '../components/testimony/TestimonyTracker';
import DesktopSideBarExpanded from '../components/SideNavBar/DesktopSideBarExpanded';
import DesktopSideBarCollapsed from '../components/SideNavBar/DesktopSideBarCollapsed';

const BillResolutionTracker = () => {
  const { _code } = useParams();
  const [expanded, setExpanded] = useState(false);
  const closeWidth = '62px';
  const openWidth = '131.5px';

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
  const navBarStyle = {
    backgroundColor: '#FFFFFF',
    borderBottom: '2px solid #DDDDDD',
    marginLeft: expanded ? openWidth : closeWidth,
    padding: '8px',
    margin: 0,
  };
  const saveStyle = {
    backgroundColor: '#418c5c',
    color: 'white',
    borderRadius: '5px',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    'a:hover': 'blue',
  };
  function getDesktopSidebar() {
    if (expanded) {
      return (
        <Col className="col-3" style={{ position: 'fixed', zIndex: '9999' }}>
          <Button
            onClick={() => setExpanded(false)}
            className="py-2 px-3 text-end navButtons"
            style={buttonStyle}
          >
            <ChevronLeft />
          </Button>
          <DesktopSideBarExpanded page="bill-details" />
        </Col>
      );
    }
    return (
      <Col style={{ position: 'fixed', zIndex: '9999' }}>
        <Button
          onClick={() => setExpanded(true)}
          className="py-2 px-3 text-center navButtons"
          style={closedButtonStyle}
        >
          <List />
        </Button>
        <DesktopSideBarCollapsed page="bill-details" />
      </Col>
    );
  }

  return (
    <>
      {getDesktopSidebar()}
      <Col className="d-flex justify-content-center">
        <div style={{ marginLeft: expanded ? openWidth : closeWidth }}>
          <Navbar className="fixed-top justify-content-center" style={navBarStyle}>
            <Nav.Link className="mx-4" as={NavLink} to={`/add-testimony/${_code}`}> <FileEarmarkPlusFill className="mb-1" />&nbsp;&nbsp;Create New Testimony</Nav.Link>
            <Nav.Link className="mx-4" as={NavLink} to="#"> <FileEarmarkPlusFill className="mb-1" />&nbsp;&nbsp;Create Monitoring Report</Nav.Link>
            <Nav.Link className="mx-4" style={saveStyle} as={NavLink} to="#"> <BoxArrowInDown className="mb-1" />&nbsp;&nbsp;Save to Database</Nav.Link>
          </Navbar>
          <div className="mt-5 mx-4">
            <BillResolutionDetails />
          </div>
          <TestimonyTracker _code={_code} />
        </div>
      </Col>
    </>
  );
};

export default BillResolutionTracker;
