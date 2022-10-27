import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Row, Col, Button, Container, Table } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import SideNavBar from '../components/SideNavBar';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import NotificationBill from '../components/notificationRelated/NotifcationBill';
import NotificationBody from '../components/notificationRelated/NotificationBody';
import Legtracker from '../utilities/Legtracker';
// added
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

  const hasUpcomingHearings = () => {
    if (upcomingHearings.length === 0) {
      return [];
    }
    return upcomingHearings.map((data) => ({
      title: data.measure,
      start: data.dateTime,
      room: data.room,
      youtube: data.youtubeURL,
      noticeLink: data.noticeURL,
      noticePdfLink: data.noticePdfURL,
    }));
  };

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
  const mainBodyStyle = {
    paddingLeft: '25%',
    width: 0.8 * width,
    maxWidth: 0.8 * width,
    minHeight: 0.8 * width,
    textAlign: 'center',
  };
  const mobileMainBody = {
    paddingLeft: '15%',
    width: 0.9 * width,
    maxWidth: 0.9 * width,
    minWidth: 0.9 * width,
    fontSize: '10px',
  };
  const breakPoint = 800;
  if (width < breakPoint) {
    return (
      <>
        <SideNavBar />
        &nbsp;
        <div style={mobileMainBody}>
          <Container fluid>
            <br />
            <h4
              style={{
                textAlign: 'center',
                fontWeight: 'bolder',
              }}
            >
              Legislative Tracking System
            </h4>
            <Row>
              <Card>
                <Card.Header>
                  <b>
                    <Icon.Bell /> &nbsp; Upcoming Hearing
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
                    <tbody>
                      {upcomingHearings
                        .map((hearing) => (
                          <NotificationBody hearing={hearing} />
                        ))
                        .slice(0, 14)}
                    </tbody>
                  </Table>
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
                      {bills.map((bills) => (
                        <NotificationBill key={bills._id} bills={bills} />
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Row>
          </Container>
        </div>
      </>
    );
  }
  return (
    <>
      <SideNavBar />
      &nbsp;
      <div style={mainBodyStyle}>
        <Container fluid>
          <br />
          <h2
            style={{
              textAlign: 'center',
              fontWeight: 'bolder',
            }}
          >
            Legislative Tracking System
          </h2>
          <Row>
            <Card>
              <Card.Header>
                <b>
                  <Icon.Bell /> &nbsp; Upcoming Hearing
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
                  <tbody>
                    {upcomingHearings
                      .map((hearing) => <NotificationBody hearing={hearing} />)
                      .slice(0, 14)}
                  </tbody>
                </Table>
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
                    {bills.map((bills) => (
                      <NotificationBill key={bills._id} bills={bills} />
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Home;
