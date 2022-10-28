import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Nav } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import * as Icon from 'react-bootstrap-icons';
import './style/Component.css';
import { ROLE } from '../../api/role/Role';
import DesktopSideBar from './SideNavBar/DesktopSideBar';
import MobileSignOutCheck from './MobileSignOutCheck';
import MobileSignInModal from './MobileSignInModal';
import MobileSignUpModal from './MobileSignUpModal';

const SideNavBar = () => {
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

  const mobileSideBarStyle = {
    position: 'fixed',
    width: 0.09 * width,
    maxWidth: 0.1 * width,
    minHeight: '100vh',
    backgroundColor: 'cyan',
    color: 'white',
    fontSize: '13px',
    textAlign: 'left',
    zIndex: 10,
  };

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(
    () => ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
    }),
    [],
  );

  if (width > breakPoint) {
    return <DesktopSideBar />;
  }
  return (
    <Nav style={mobileSideBarStyle} activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/" style={{ color: 'black' }}>
          <Icon.HouseDoor />
        </Nav.Link>

        {currentUser
          ? [
            <>
              <Nav.Link href="/view/DOE" style={{ color: 'black' }}>
                <Icon.Clipboard />
              </Nav.Link>
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
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
          <Nav.Link href="/edit-roles" style={{ color: 'black' }}>
            <Icon.Clipboard />
          </Nav.Link>

        ) : ''}
        <Nav.Link />
      </Nav.Item>
    </Nav>
  );
};
export default SideNavBar;
