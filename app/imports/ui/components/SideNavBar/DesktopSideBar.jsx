import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Nav, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import SignUpModal from '../SignUpModal';
import SignInModal from '../SignInModal';
import SignoutCheck from '../SignoutCheck';
import MobileSignInModal from '../MobileSignInModal';
import MobileSignUpModal from '../MobileSignUpModal';
import MobileSignOutCheck from '../MobileSignOutCheck';

const DesktopSideBar = () => {
  const showSideBarStyle = {
    position: 'fixed',
    minHeight: '100vh',
    maxWidth: '15%',
    minWidth: '20%',
    backgroundColor: 'cyan',
    color: 'white',
    fontSize: '16px',
    textAlign: 'center',
    zIndex: 100,
  };

  const closeSideBarStyle = {
    position: 'fixed',
    maxWidth: '15%',
    minWidth: '10%',

    minHeight: '100vh',
    backgroundColor: 'cyan',
    color: 'white',
    fontSize: '16px',
    textAlign: 'center',
    zIndex: 10,
  };

  const [show, setShow] = useState('false');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(
    () => ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
    }),
    [],
  );

  return (
    <div>
      {show ? (
        <Nav style={showSideBarStyle} activeKey="/home">
          <Nav.Item>
            <Button
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: '20px',
              }}
              onClick={handleClose}
            >
              <Icon.ArrowBarLeft />
            </Button>
            <Nav.Link href="/" style={{ color: 'black' }}>
              <Icon.HouseDoor /> <b>HOME</b>
            </Nav.Link>
            <Nav.Link href="/all-dashboard" style={{ color: 'black' }}>
              <Icon.Clipboard /> <b>DASHBOARD</b>
            </Nav.Link>

            {currentUser
              ? [
                <>
                  <Nav.Link href="/home" style={{ color: 'black' }}>
                    <Icon.Inbox /> <b>NOTIFICATION</b>
                  </Nav.Link>
                  <Nav.Link href="/calendar" style={{ color: 'black' }}>
                    <Icon.Calendar /> <b>CALENDAR</b>
                  </Nav.Link>
                </>,
              ]
              : ''}
            {currentUser === '' ? (
              <div style={{ textAlign: 'center', lineHeight: '45pt' }}>
                <SignInModal />
                <br />
                <SignUpModal />
              </div>
            ) : (
              <>
                &nbsp; <SignoutCheck />
              </>
            )}
            <Nav.Link />
          </Nav.Item>
        </Nav>
      ) : (
        <Nav style={closeSideBarStyle} activeKey="/home">
          <Nav.Item>
            <Button
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: '20px',
              }}
              onClick={handleShow}
            >
              <Icon.List />
            </Button>
            <Nav.Link href="/" style={{ color: 'black' }}>
              <Icon.HouseDoor />
            </Nav.Link>
            <Nav.Link href="/all-dashboard" style={{ color: 'black' }}>
              <Icon.Clipboard />
            </Nav.Link>
            {currentUser
              ? [
                <>
                  <Nav.Link href="/home" style={{ color: 'black' }}>
                    <Icon.Inbox />
                  </Nav.Link>
                  <Nav.Link href="/calendar" style={{ color: 'black' }}>
                    <Icon.Calendar />
                  </Nav.Link>
                </>,
              ]
              : ''}
            {currentUser === '' ? (
              <div style={{ textAlign: 'center', lineHeight: '45pt' }}>
                <MobileSignInModal />
                <br />
                <MobileSignUpModal />
              </div>
            ) : (
              <MobileSignOutCheck />
            )}
            <Nav.Link />
          </Nav.Item>
        </Nav>
      )}
    </div>
  );
};
export default DesktopSideBar;
