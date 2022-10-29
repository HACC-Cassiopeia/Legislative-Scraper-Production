import React from 'react';
import { Button } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';

const TestimonyRow = () => (
  <tr>
    <td>
      <div>Hearing Date</div>
    </td>
    <td>
      <div>Title</div>
    </td>
    <td>
      <div>Testifier</div>
    </td>
    <td>
      <div>Status</div>
    </td>
    <td>
      <Button><Pencil /></Button>
    </td>
  </tr>
);

export default TestimonyRow;
