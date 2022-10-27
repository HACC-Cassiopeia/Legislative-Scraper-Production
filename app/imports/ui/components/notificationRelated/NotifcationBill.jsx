import React from 'react';
import PropTypes from 'prop-types';

const NotificationBill = ({ bills }) => (
  <tbody>
    <tr>
      <td>{bills.code}</td>
      <td>{bills.measureTitle}</td>
      <td>{bills.currentReferral}</td>
      <td>{bills.statusDate}</td>
    </tr>
  </tbody>
);

NotificationBill.propTypes = {
  bills: PropTypes.object,
};

export default NotificationBill;
