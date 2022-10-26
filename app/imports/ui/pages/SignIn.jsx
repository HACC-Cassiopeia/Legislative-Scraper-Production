import React, { useState } from 'react';
import { Alert, Card, Col, Image, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router-dom';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  if (redirect) {
    return (<Navigate to="/" />);
  }

  return (
    <Col style={{ backgroundColor: '#4c556f', color: 'white' }}>
      <Row>
        <Col className="d-flex justify-content-center">
          <Image
            style={{ width: '10%', minWidth: '50px' }}
            className="mt-5"
            src="/images/doe-logo.png"
            alt="DOE seal"
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center mt-3">
          <h1><b>DOELT</b></h1>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <AutoForm schema={bridge} onSubmit={data => submit(data)} className="justify-content-center" style={{ minWidth: '20%' }}>
            <Card style={{ backgroundColor: '#4c556f', color: 'white', borderWidth: 0 }}>
              <Card.Body className="pb-2 pt-2">
                <TextField id={COMPONENT_IDS.SIGN_IN_FORM_EMAIL} name="email" placeholder="Employee ID" label="" />
                <TextField id={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD} name="password" placeholder="Password" type="password" label="" />
                <ErrorsField />
                <SubmitField className="logInButton d-flex justify-content-center" id={COMPONENT_IDS.SIGN_IN_FORM_SUBMIT} value="Log in" />
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-center">Forgot password?</div>
          </AutoForm>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
      <footer style={{ position: 'absolute', bottom: '0' }}>
        <Col className="d-flex justify-content-center">
          <Image
            style={{ width: '25%' }}
            className="mt-5"
            src="/images/capitol.png"
            alt="Hawaii State Capitol"
          />
        </Col>
        <div style={{ backgroundColor: '#2e374f', fontSize: 'smaller' }} className="py-3 d-flex justify-content-center">
          Property of the Hawai&apos;i State Department of Education. Unauthorized access prohibited.
        </div>
      </footer>
    </Col>
  );
};

export default SignIn;
