import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, NavLink, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col
      style={{ backgroundColor: '#4c556f', textAlign: 'center' }}
      className="p-0 m-0 g-0"
    >
      <h2 style={{ color: 'white' }}>You are signed out.</h2>
      <br />
      <Container fluid>
        <Button
          style={{
            color: 'white',
            minWidth: '100px',
            maxWidth: '100px',
            marginLeft: '45%',
          }}
          as={NavLink}
          size="sm"
          href="/"
        >
          LOG BACK In
        </Button>
      </Container>
    </Col>
  );
};

export default SignOut;
