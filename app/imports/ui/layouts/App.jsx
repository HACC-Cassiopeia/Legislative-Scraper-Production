import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Footer from '../components/stuffComponents/Footer';
import ListStuff from '../pages/stuffPages/ListStuff';
import ListStuffAdmin from '../pages/stuffPages/ListStuffAdmin';
import AddStuff from '../pages/stuffPages/AddStuff';
import EditStuff from '../pages/stuffPages/EditStuff';
import NotFound from '../pages/stuffPages/NotFound';
import SignUp from '../pages/stuffPages/SignUp';
import SignOut from '../pages/stuffPages/SignOut';
// import NavBar from '../components/stuffComponents/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/stuffPages/NotAuthorized';
import { ROLE } from '../../api/role/Role';

/*
 * From Legislature-Tracker
 * Imports that are commented out means that they're using unsecure methods
 * instead of meteor methods
 */
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import AllDashboard from '../pages/AllDashboard';
import SavedDashboard from '../pages/SavedDashboard';
import BillResolutionTracker from '../pages/BillResolutionTracker';
import AddTestimony from '../pages/AddTestimony';
import Test from '../Test';
import Calendar from '../pages/Calendar';
import EditTestimony from '../pages/EditTestimony';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    {/* <div className="d-flex flex-column min-vh-100"> */}
    {/*  <NavBar /> */}
    {/*  <Routes> */}
    {/*    <Route exact path="/" element={<Landing />} /> */}
    {/*    <Route path="/signin" element={<SignIn />} /> */}
    {/*    <Route path="/signup" element={<SignUp />} /> */}
    {/*    <Route path="/signout" element={<SignOut />} /> */}
    {/*    <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} /> */}
    {/*    <Route path="/list" element={<ProtectedRoute><ListStuff /></ProtectedRoute>} /> */}
    {/*    <Route path="/add" element={<ProtectedRoute><AddStuff /></ProtectedRoute>} /> */}
    {/*    <Route path="/edit/:_id" element={<ProtectedRoute><EditStuff /></ProtectedRoute>} /> */}
    {/*    <Route path="/admin" element={<AdminProtectedRoute><ListStuffAdmin /></AdminProtectedRoute>} /> */}
    {/*    <Route path="/notauthorized" element={<NotAuthorized />} /> */}
    {/*    <Route path="*" element={<NotFound />} /> */}
    {/*    <Route path="/test" element={<Test />} /> */}
    {/*  </Routes> */}
    {/*  <Footer /> */}
    {/* </div> */}
    <div className="d-flex flex-column min-vh-100">
      <Routes>
        <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/view/all" element={<ProtectedRoute><AllDashboard /></ProtectedRoute>} />
        <Route path="/view/DOE" element={<ProtectedRoute><SavedDashboard /></ProtectedRoute>} />
        <Route path="/add-testimony/:_code" element={<ProtectedRoute><AddTestimony /></ProtectedRoute>} />
        <Route path="/edit-testimony" element={<ProtectedRoute><EditTestimony /></ProtectedRoute>} />
        <Route path="/view/:_code" element={<ProtectedRoute><BillResolutionTracker /></ProtectedRoute>} />
        <Route path="/test" element={<Test />} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/list" element={<ProtectedRoute><ListStuff /></ProtectedRoute>} />
        <Route path="/add" element={(<ProtectedRoute><AddStuff /></ProtectedRoute>)} />
        <Route path="/edit/:_id" element={(<ProtectedRoute><EditStuff /></ProtectedRoute>)} />
        <Route path="/admin" element={<AdminProtectedRoute><ListStuffAdmin /></AdminProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </Router>
);

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  children: <Landing />,
};

export default App;
