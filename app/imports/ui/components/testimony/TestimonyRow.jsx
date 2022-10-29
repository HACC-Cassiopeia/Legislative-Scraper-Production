import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';

const TestimonyRow = ({ testimony }) => (
  <tr>
    <td>
      <div> {testimony.hearingDate ? testimony.hearingDate : '-'}</div>
    </td>
    <td>
      <div> { testimony.billCode ? testimony.billCode : '-' }</div>
    </td>
    <td>
      <div>{ testimony.testifier ? testimony.billCode : '-'}</div>
    </td>
    <td>
      <div> { testimony.status ? testimony.status : '-'}</div>
    </td>
    <td>
      <Button href="#"><Pencil /></Button>
    </td>
  </tr>
);

TestimonyRow.propTypes = {
  testimony: PropTypes.shape({
    hearingDate: { type: String, optional: true },
    billCode: { type: String, optional: true },
    testifier: { type: String, optional: true },
    status: { type: String, optional: true },
  }).isRequired,
};

export default TestimonyRow;
