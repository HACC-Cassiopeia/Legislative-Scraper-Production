import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Row, Col, Button, Container, Table } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import SideNavBar from '../components/SideNavBar';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import NotificationBill from '../components/NotifcationBill';
// added
const Home = () => {
  const bills = useTracker(() => {
    Meteor.subscribe(SavedMeasures.subscribeMeasureSaved);

    return SavedMeasures.find().fetch();
  });

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
  };
  const mobileMainBody = {
    paddingLeft: '15%',
    width: 0.7 * width,
    maxWidth: 0.7 * width,
  };
  const breakPoint = 800;
  if (width < breakPoint) {
    return (
      <>
        <SideNavBar />
        &nbsp;
        <div id='mobileMainBody'>
          <Container fluid>
            <br />
            <h2
              style={{
                textAlign: 'center',
                fontWeight: 'bolder',
              }}>
              Legislative Tracking System
            </h2>
            <br />
            <Row>
              <Card>
                <Card.Header>
                  <b>
                    <Icon.FileEarmark /> &nbsp; UPCOMING HEARING
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
    <div>
      <SideNavBar />
      <div style={mainBodyStyle}>
        <h2
          style={{
            textAlign: 'center',
            fontWeight: 'bolder',
          }}>
          Legislative Tracking System
        </h2>
        <hr />
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <Card.Header>PROFILE</Card.Header>
                <Card.Body>
                  <Card.Title>Name:</Card.Title>
                  <Card.Subtitle>Email: </Card.Subtitle>
                  <Card.Text>
                    <div style={{ textAlign: 'center' }}>
                      <b>Role</b>
                      <br />
                      <hr />
                      <Button>EDIT PROFILE</Button>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Notifications</Card.Header>
                <Card.Body>
                  The list of upcoming hearings. A mini dashboard.
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Card>
            <Card.Header>UPCOMING HEARING</Card.Header>
            <Card.Body>A list of different hearing.</Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};
export default Home;
