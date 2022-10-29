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
      <Button href="/edit-testimony"><Pencil /></Button>
    </td>
  </tr>
);

TestimonyRow.propTypes = {
  testimony: PropTypes.shape({
    hearingDate: PropTypes.string,
    billCode: PropTypes.string,
    testifier: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default TestimonyRow;
