import React, { useState } from 'react';
import { Alert, Card, Col, Image, Row, Table } from 'react-bootstrap';
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
    <Col style={{ backgroundColor: '#4c556f' }} className="p-0 m-0 g-0">
      <Table className="p-0 m-0 g-0" style={{ color: 'white', height: '100%', width: '100%', borderCollapse: 'collapse' }}>
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
              <h1><b>DOELT</b></h1>
            </Col>
          </Row>
          <Row className="g-0">
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
                <div className="d-flex justify-content-center small">Forgot password?</div>
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
        </tr>
        <tr valign="bottom" style={{ backgroundColor: '#2e374f' }} className="p-0 m-0">
          <Col className="d-flex justify-content-center pt-2 pb-0 m-0" style={{ width: '100%', backgroundColor: '#4c556f' }}>
            <Image
              style={{ width: '25%', minWidth: '14em' }}
              src="/images/capitol.png"
              className="p-0 m-0"
              alt="Hawaii State Capitol"
            />
          </Col>
          <div style={{ backgroundColor: '#2e374f', fontSize: 'smaller' }} className="pt-3 pb-0 m-0 d-flex justify-content-center text-center">
            Property of the Hawai&apos;i State Department of Education. Unauthorized access prohibited.
          </div>
          <div style={{ backgroundColor: '#2e374f', fontSize: 'small' }} className="p-0 m-0 d-flex justify-content-center text-center">
            <p><u>Contact Administrator</u></p>
          </div>
        </tr>
      </Table>
    </Col>
  );
};

export default SignIn;
