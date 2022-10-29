import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Row } from 'react-bootstrap';
import { FileEarmarkPlusFill, BoxArrowInDown } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import BillResolutionDetails from '../components/BillResolutionDetails';
import DesktopSideBar from '../components/SideNavBar/DesktopSideBar';
import TestimonyTracker from '../components/testimony/TestimonyTracker';

const navBarStyle = {
  backgroundColor: '#FFFFFF',
  borderBottom: '2px solid #DDDDDD',
  height: '50px',
  marginLeft: '14%',
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

const BillResolutionTracker = () => {
  const { _code } = useParams();

  return (
    <Row>
      <DesktopSideBar page="bill" />
      <div id="mainBody">
        {/* TODO add functionality to edit, create monitoring report, and save to db buttons */}
        <Navbar className="fixed-top justify-content-center" style={navBarStyle}>
          <Nav.Link className="m-4" as={NavLink} to={`/add-testimony/${_code}`}> <FileEarmarkPlusFill className="mb-1" />&nbsp;&nbsp;Create New Testimony</Nav.Link>
          <Nav.Link className="m-4" as={NavLink} to="#"> <FileEarmarkPlusFill className="mb-1" />&nbsp;&nbsp;Create Monitoring Report</Nav.Link>
          <Nav.Link className="m-4" style={saveStyle} as={NavLink} to="#"> <BoxArrowInDown className="mb-1" />&nbsp;&nbsp;Save to Database</Nav.Link>
        </Navbar>
        <div className="mt-5">
          <BillResolutionDetails />
        </div>
        <TestimonyTracker _code={_code} />
      </div>
    </Row>
  );
};

export default BillResolutionTracker;
