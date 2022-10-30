import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Row, Image, Table, Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { DoorOpen } from 'react-bootstrap-icons';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col style={{ backgroundColor: '#4c556f' }} className="p-0 m-0 g-0">
      <Table
        className="p-0 m-0 g-0"
        style={{
          color: 'white',
          height: '100%',
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <tr valign="top p-0 m-0">
          <Row className="g-0">
            <Col className="d-flex justify-content-center">
              <Image
                style={{ width: '10%', minWidth: '6em' }}
                className="mt-4"
                src="/images/doe-logo.png"
                alt="DOE seal"
              />
            </Col>
          </Row>
          <Row className="g-0">
            <Col className="d-flex justify-content-center mt-3">
              <h1>
                <b>DOELT</b>
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center mt-3">
              <Card style={{ width: '30rem', backgroundColor: '#2f374f', color: 'white' }} className="text-center">
                <Card.Body>
                  <Card.Header>You have sign out!</Card.Header>
                  <Card.Text>
                    Click on the button below to enter our system again.
                  </Card.Text>
                  <Button href="/signin">Sign In <DoorOpen /></Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </tr>
        <tr
          valign="bottom"
          style={{ backgroundColor: '#2e374f' }}
          className="p-0 m-0"
        >
          <Col
            className="d-flex justify-content-center pt-2 pb-0 m-0"
            style={{ width: '100%', backgroundColor: '#4c556f' }}
          >
            <Image
              style={{ width: '25%', minWidth: '14em' }}
              src="/images/capitol.png"
              className="p-0 m-0"
              alt="Hawaii State Capitol"
            />
          </Col>
          <div
            style={{ backgroundColor: '#2e374f', fontSize: 'smaller' }}
            className="pt-3 pb-0 m-0 d-flex justify-content-center text-center"
          >
            Property of the Hawai&apos;i State Department of Education.
            Unauthorized access prohibited.
          </div>
          <div
            style={{ backgroundColor: '#2e374f', fontSize: 'small' }}
            className="p-0 m-0 d-flex justify-content-center text-center"
          >
            <p>
              <u>Contact Administrator</u>
            </p>
          </div>
        </tr>
      </Table>
    </Col>
  );
};

export default SignOut;
