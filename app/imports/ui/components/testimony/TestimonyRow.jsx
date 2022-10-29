import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';

// eslint-disable-next-line react/prop-types
const TestimonyRow = ({ testimony, _code }) => (
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
      <Button href={`/edit-testimony/${_code}/${testimony._id}`}><Pencil /></Button>
    </td>
  </tr>
);

TestimonyRow.propTypes = {
  testimony: PropTypes.shape({
    hearingDate: PropTypes.string,
    billCode: PropTypes.string,
    testifier: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default TestimonyRow;
