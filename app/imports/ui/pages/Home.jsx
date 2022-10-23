import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import SideNavBar from '../components/SideNavBar';
// added
const Home = () => {
  const mainBodyStyle = {
    marginLeft: '25%',
    maxWidth: '65vw',
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
  const breakPoint = 800;
  if (width < breakPoint) {
    return (
      <>
        <SideNavBar />
        &nbsp;
        <div id="mobileMainBody">
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
                    <Icon.Bell /> &nbsp; NOTIFICATIONS
                  </b>
                </Card.Header>
                <Card.Body>
                  The list of upcoming hearings. A mini dashboard.
                </Card.Body>
              </Card>
            </Row>
            <br />
            <Row>
              <Card>
                <Card.Header>
                  <b>
                    <Icon.FileEarmark /> &nbsp; UPCOMING HEARING
                  </b>
                </Card.Header>
                <Card.Body>A list of different hearing.</Card.Body>
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
          }}
        >
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
