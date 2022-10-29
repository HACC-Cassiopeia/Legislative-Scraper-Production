import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Table } from 'react-bootstrap';
import { Testimonies } from '../../../api/testimony/TestimonyCollection';
import TestimonyRow from './TestimonyRow';
import LoadingSpinner from '../LoadingSpinner';

const TestimonyTracker = () => {
  const { ready, testimony } = useTracker(() => {
    const subscription = Testimonies.subscribeTestimony();
    const rdy = subscription.ready();
    // TODO replace billcode with _code
    const testimonyItem = Testimonies.find({ billCode: 'HB1422' }).fetch();
    return {
      testimony: testimonyItem,
      ready: rdy,
    };
  }, false);

  return (ready ? (
    <Container className="text-center">
      {console.log(testimony)}
      <h3>Testimonies</h3>
      <Table striped>
        <thead style={{ zIndex: 200 }}>
          <tr>
            <th>Hearing Date</th>
            <th>Title</th>
            <th>Testifier</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <TestimonyRow />
          <TestimonyRow />
          <TestimonyRow />
          <TestimonyRow />
          <TestimonyRow />
          <TestimonyRow />
          <TestimonyRow />
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner />);
};

export default TestimonyTracker;
