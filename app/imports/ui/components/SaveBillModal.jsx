import React from 'react';
import { Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SaveBillModal = ({ show, onHide }) => {

  const schema = new SimpleSchema({
    office: String,
    action: String,
    hearingDate: String,
    position: String,
    testifier: String,
    internalStatus: String,
  });

  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { office, action, hearingDate, position, testifier, internalStatus } = doc;
    console.log('submit pressed!');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <AutoForm schema={bridge} onSubmit={(data) => submit(data)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Save Bill</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            id="saveBill-modal-office"
            name="office"
            placeholder="Office"
          />
          <TextField
            id="saveBill-modal-action"
            name="action"
            placeholder="Action"
          />
          <TextField
            id="saveBill-modal-hearingDate"
            name="hearingDate"
            placeholder="Hearing Date"
          />
          <TextField
            id="saveBill-modal-position"
            name="position"
            placeholder="Position"
          />
          <TextField
            id="saveBill-modal-testifier"
            name="testifier"
            placeholder="Testifier"
          />
          <TextField
            id="saveBill-modal-internalStatus"
            name="internalStatus"
            placeholder="Internal Status"
          />
          <ErrorsField />
          <div className="text-center">
            <SubmitField id="signin-form-submit" />
          </div>
        </Modal.Body>
      </AutoForm>
    </Modal>
  );
};

SaveBillModal.propTypes = {
  show: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default SaveBillModal;
