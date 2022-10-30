import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Row, Container, Table, Col, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { ChevronLeft, List } from 'react-bootstrap-icons';
import MobileSideBar from '../components/SideNavBar/MobileSideBar';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import NotificationBill from '../components/notificationRelated/NotifcationBill';
import NotificationBody from '../components/notificationRelated/NotificationBody';
import Legtracker from '../utilities/Legtracker';
import DesktopSideBarCollapsed from '../components/SideNavBar/DesktopSideBarCollapsed';
import DesktopSideBarExpanded from '../components/SideNavBar/DesktopSideBarExpanded';

const Home = () => {
  const bills = useTracker(() => {
    Meteor.subscribe(SavedMeasures.subscribeMeasureSaved);

    return SavedMeasures.find().fetch();
  });

  const closeWidth = '62px';
  const openWidth = '131.5px';
  const [expanded, setExpanded] = useState(false);
  const [upcomingHearings, setUpcomingHearings] = useState([]);

  useEffect(() => {
    document.title = 'DOELT - Home';
    Legtracker.scrapeUpcomingHearings().then((initialData) => {
      setUpcomingHearings(initialData.upcomingHearings);
    });
  }, []);

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

  const mainBodyWidth = {
    width: 0.75 * width,
    textAlign: 'center',
  };
  const mainBodyLeftMargin = {
    marginLeft: expanded ? openWidth : closeWidth,
  };
  const mobileMainBody = {
    marginLeft: '60px',
    width: 0.9 * width,
    fontSize: '10px',
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
  const sectionHeaders = {
    color: 'white',
    backgroundColor: '#37425e',
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
    <div style={{ backgroundColor: '#ece9e9', height: '100%' }}>
      {width < breakPoint ? <MobileSideBar page="home" /> : getDesktopSidebar()}
      <Col style={width < breakPoint ? mobileMainBody : mainBodyLeftMargin} className="d-flex justify-content-center">
        <Container style={mainBodyWidth}>
          <h1 className="pt-4 m-0 text-center">
            <b>DOELT</b>
          </h1>
          <h6 className="p-0">Department of Education Legislative Tracker</h6>
          <Row className="pt-3">
            <Card className="p-0">
              <Card.Header style={sectionHeaders}>
                <Icon.BellFill className="mb-1" /> &nbsp; Upcoming Hearings
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date/Time</th>
                      <th>Location</th>
                      <th>Video</th>
                      <th>URL</th>
                      <th>PDF</th>
                    </tr>
                  </thead>
                  { upcomingHearings.length > 0 ? (
                    <tbody>
                      {upcomingHearings.map((hearing) => <NotificationBody hearing={hearing} />).slice(0, 14)}
                    </tbody>
                  ) : <p /> }
                </Table>
                { upcomingHearings.length > 0 ? <p /> : <p>No upcoming hearings found.</p> }
              </Card.Body>
            </Card>
          </Row>
          <br />
          <Row>
            <Card className="p-0">
              <Card.Header style={sectionHeaders}>
                <Icon.CardChecklist className="mb-1" style={{ fontSize: '20px' }} /> &nbsp; Mini Dashboard
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>Bill</th>
                      <th>Title</th>
                      <th>Current Referral</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((bill) => (
                      <NotificationBill key={bills._id} bills={bill} />
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </Col>
    </div>
  );
};

export default Home;
