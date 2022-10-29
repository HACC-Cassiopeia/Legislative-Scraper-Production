import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Table } from 'react-bootstrap';
import { Testimonies } from '../../../api/testimony/TestimonyCollection';
import TestimonyRow from './TestimonyRow';
import LoadingSpinner from '../LoadingSpinner';

const TestimonyTracker = () => {
  const { ready, testimonies } = useTracker(() => {
    const subscription = Testimonies.subscribeTestimony();
    const rdy = subscription.ready();
    // TODO replace billcode with _code
    const testimoniesItems = Testimonies.find({ billCode: 'HB1422' }).fetch();
    return {
      testimonies: testimoniesItems,
      ready: rdy,
    };
  }, false);

  return (ready ? (
    <Container className="text-center">
      {console.log(testimonies)}
      <h3>Testimonies</h3>
      <Table striped>
        <thead style={{ zIndex: 200 }}>
          <tr>
            <th>Hearing Date</th>
            <th>Bill No</th>
            <th>Testifier</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {testimonies.map(testimony => (
            <TestimonyRow key={testimony._id} testimony={testimony} />
          ))}
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner />);
};

export default TestimonyTracker;
