import React from 'react';
import { Col, Image, Row, Container } from 'react-bootstrap';

// added

const introMessageStyle = {
  textAlign: 'center',
  fontWeight: 'bolder',
  color: 'black',
  marginLeft: '10%',
  fontSize: '16px',
};

const landingStyleA = {
  backgroudnColor: 'whitesmoke',
  textAlign: 'center',
};

const landingStyleB = {
  backgroundColor: 'cyan',
  textAlign: 'center',
};

const centerBreak = {
  height: '65px',
};

const messageStyle = {
  display: 'block',
  textAlign: 'center',
  height: '50%',
  marginLeft: '20%',
};

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div>
    <div className="headerTopTitle">
      <div style={centerBreak} />
      <Container fluid style={introMessageStyle}>
        <h3 style={{ top: '50%' }}>Track & Monitor your proposals</h3>
        <p>
          Have an idea to improve Hawaii <br />
          Keep a track of it here!
        </p>
      </Container>
    </div>

    <Row style={landingStyleA}>
      <Col style={messageStyle}>
        <h3>Check the different proposals</h3>
        <p>See what kind of ideas are being proposed.</p>
      </Col>
      <Col>
        <Image
          style={{ maxWidth: '45%' }}
          src="https://1.bp.blogspot.com/-C6vAsZfl8ic/Xq5vGe5oFpI/AAAAAAABYtE/DPvun2JQUYI7iLNp__Q2zZX5gitobZwyACEwYBhgL/s1600/computer_document_spreadsheet.png"
        />
      </Col>
    </Row>
    <Row style={landingStyleB}>
      <Col style={messageStyle}>
        <h3>Organize Decisions Neatly</h3>
        <p>
          Based on your position, add comments, approve, or deny the proposals.
        </p>
      </Col>

      <Col>
        <Image
          style={{ maxWidth: '35%' }}
          src="https://4.bp.blogspot.com/-n39YthHIJDY/Wn1VskGy9MI/AAAAAAABKEU/600dCV5x4uINvIyB_1a2xI82mxzA5kOZACLcBGAs/s350/computer_businessman1_smile.png"
        />
      </Col>
    </Row>
    <div style={messageStyle}>
      <p>Created for DOE</p>
    </div>
  </div>
);

export default Landing;
