import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { PencilSquare, FileEarmarkPlusFill, BoxArrowInDown } from 'react-bootstrap-icons';
import BillResolutionDetails from '../components/BillResolutionDetails';

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

const BillResolutionTracker = () => (
  <div id="mainBody">
    {/* TODO add functionality to edit, create monitoring report, and save to db buttons */}
    <Navbar className="fixed-top justify-content-start ps-5" style={navBarStyle}>
      <Nav.Link className="m-4" as={NavLink} to="#"> <PencilSquare className="mb-1" />&nbsp;&nbsp;Edit</Nav.Link>
      <Nav.Link className="m-4" as={NavLink} to="/add-testimony"> <FileEarmarkPlusFill className="mb-1" />&nbsp;&nbsp;Create Testimony</Nav.Link>
      <Nav.Link className="m-4" as={NavLink} to="#"> <FileEarmarkPlusFill className="mb-1" />&nbsp;&nbsp;Create Monitoring Report</Nav.Link>
      <Nav.Link className="m-4" style={saveStyle} as={NavLink} to="#"> <BoxArrowInDown className="mb-1" />&nbsp;&nbsp;Save to Database</Nav.Link>
    </Navbar>
    <div className="mt-5">
      <BillResolutionDetails />
    </div>
    <Container className="text-center"><h3>TODO: Bottom section (list of hearings w/ more info)</h3></Container>
  </div>
);

export default BillResolutionTracker;
