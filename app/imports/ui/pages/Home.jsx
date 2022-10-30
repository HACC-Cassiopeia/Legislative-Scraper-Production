import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Row, Container, Table, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { Roles } from 'meteor/alanning:roles';
import { FileText } from 'react-bootstrap-icons';
import MobileSideBar from '../components/SideNavBar/MobileSideBar';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import NotificationBill from '../components/notificationRelated/NotifcationBill';
import NotificationBody from '../components/notificationRelated/NotificationBody';
import Legtracker from '../utilities/Legtracker';
import DesktopSideBar from '../components/SideNavBar/DesktopSideBar';
import LoadingSpinner from '../components/LoadingSpinner';
import TestimonyRow from '../components/testimony/TestimonyRow';
import { Testimonies } from '../../api/testimony/TestimonyCollection';

const Home = () => {
  const { ready, bills } = useTracker(() => {
    const subscription = SavedMeasures.subscribeMeasureSaved();
    const rdy = subscription.ready();
    const billsItems = SavedMeasures.find({}, {}).fetch();
    return {
      bills: billsItems,
      ready: rdy,
    };
  }, false);

  const isAdmin = () => {
    const loggedInUser = Meteor.user();
    if (loggedInUser) {
      if (Roles.userIsInRole(loggedInUser, ['ADMIN'])) {
        console.log('user is an admin');
      }
    } else {
      console.log('user is not an admin');
    }
  };

  isAdmin();
  const [upcomingHearings, setUpcomingHearings] = useState([]);
  console.log(Meteor.user());
  useEffect(() => {
    document.title = 'DOELT - Home';
    Legtracker.scrapeUpcomingHearings().then((initialData) => {
      setUpcomingHearings(initialData.upcomingHearings);
    });
  }, []);

  const { readyTestimony, testimonies } = useTracker(() => {
    const subscription = Testimonies.subscribeTestimony();
    const rdy = subscription.ready();
    // TODO replace billcode with _code
    const testimoniesItems = Testimonies.find({}, {}).fetch();
    return {
      testimonies: testimoniesItems,
      readyTestimony: rdy,
    };
  }, false);

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

  const mainBodyStyle = {
    paddingLeft: '22%',
    width: 0.8 * width,
    textAlign: 'center',
  };
  const mobileMainBody = {
    textAlign: 'center',
    fontSize: '10px',
  };

  const sectionHeaders = {
    color: 'white',
    backgroundColor: '#37425e',
  };

  return (
    <div style={{ backgroundColor: '#ece9e9', height: '100%', overflow: 'auto' }}>
      {width < breakPoint ? (
        <MobileSideBar page="home" />
      ) : (
        <DesktopSideBar page="home" />
      )}
      <Col
        style={width < breakPoint ? mobileMainBody : mainBodyStyle}
        className="d-flex justify-content-center"
      >
        <Container>
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
                  {upcomingHearings.length > 0 ? (
                    <tbody>
                      {upcomingHearings
                        .map((hearing) => (
                          <NotificationBody hearing={hearing} />
                        ))
                        .slice(0, 14)}
                    </tbody>
                  ) : (
                    '-'
                  )}
                </Table>
                {upcomingHearings.length > 0 ? (
                  '-'
                ) : (
                  <p>No upcoming hearings found.</p>
                )}
              </Card.Body>
            </Card>
          </Row>
          <br />
          <Row>
            <Card className="p-0">
              <Card.Header style={sectionHeaders}>
                <FileText /> &nbsp; Testimonies
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead style={{ zIndex: 200 }}>
                    <tr>
                      <th>Hearing Date</th>
                      <th>Bill No</th>
                      <th>Testifier</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonies.map(testimony => (
                      <TestimonyRow
                        key={testimony._id}
                        testimony={testimony}
                        _code={testimony.billCode}
                      />
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Row>
          <br />
          <Row>
            <Card className="p-0">
              <Card.Header style={sectionHeaders}>
                <Icon.CardChecklist
                  className="mb-1"
                  style={{ fontSize: '20px' }}
                />{' '}
                &nbsp; Mini Dashboard
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead style={{ zIndex: 200 }}>
                    <tr>
                      <th>Bill</th>
                      <th>Title</th>
                      <th>Current Referral</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  {ready ? (
                    <tbody>
                      {bills.map((bill) => (
                        <NotificationBill key={bills._id} bills={bill} />
                      ))}
                    </tbody>
                  ) : <LoadingSpinner />}
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
