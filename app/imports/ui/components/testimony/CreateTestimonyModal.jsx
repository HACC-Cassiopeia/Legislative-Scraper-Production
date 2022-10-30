import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { SavedMeasures } from '../../../api/savedMeasures/SavedMeasuresCollection';

// eslint-disable-next-line react/prop-types
const CreateTestimonyModal = ({ show, handleClose, _code }) => {
  const { ready, bill } = useTracker(() => {
    const subscription = SavedMeasures.subscribeMeasureSaved();
    const rdy = subscription.ready();
    const billItem = SavedMeasures.find({ code: _code }).fetch();
    return {
      bill: billItem[0],
      ready: rdy,
    };
  }, false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTestimonyModal;
