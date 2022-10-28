import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Row, Container, Table, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import MobileSideBar from '../components/SideNavBar/MobileSideBar';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import NotificationBill from '../components/notificationRelated/NotifcationBill';
import NotificationBody from '../components/notificationRelated/NotificationBody';
import Legtracker from '../utilities/Legtracker';
import DesktopSideBar from '../components/SideNavBar/DesktopSideBar';

const Home = () => {
  const bills = useTracker(() => {
    Meteor.subscribe(SavedMeasures.subscribeMeasureSaved);

    return SavedMeasures.find().fetch();
  });

  const [upcomingHearings, setUpcomingHearings] = useState([]);

  useEffect(() => {
    document.title = 'DOE Legislative Tracker - Calendar';
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

  const mainBodyStyle = {
    paddingLeft: '22%',
    width: 0.8 * width,
    textAlign: 'center',
  };
  const mobileMainBody = {
    marginLeft: '60px',
    width: 0.9 * width,
    fontSize: '10px',
  };

  return (
    <>
      {width < breakPoint ? <MobileSideBar page="home" /> : <DesktopSideBar id="desktopSidebar" page="home" />}
      <Col style={width < breakPoint ? mobileMainBody : mainBodyStyle} className="d-flex justify-content-center">
        <Container>
          <h2 className="pt-4 text-center">
            <b>Legislative Tracking System</b>
          </h2>
          <Row>
            <Card>
              <Card.Header>
                <b>
                  <Icon.Bell /> &nbsp; Upcoming Hearings
                </b>
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>START</th>
                      <th>ROOM</th>
                      <th>YOUTUBE</th>
                      <th>NOTICE URL</th>
                      <th>PDF URL</th>
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
            <Card>
              <Card.Header>
                <b>
                  <Icon.FileEarmark /> &nbsp; Mini Dashboard
                </b>
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>CODE</th>
                      <th>MEASURE TITLE</th>
                      <th>Current Referal</th>
                      <th>Status Date</th>
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
    </>
  );
};

export default Home;
