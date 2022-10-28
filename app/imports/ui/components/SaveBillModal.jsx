import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SaveBillModal = ({ show, onHide, onSubmit }) => {

  const offices = ['BOE', 'OCID', 'OFS', 'OFO', 'OHE', 'OITS', 'OSIP', 'OSSS', 'OTM', 'SUPT'];

  const schema = new SimpleSchema({
    office: { label: 'office', type: String, allowedValues: offices },
    doeAction: { label: 'doeAction', type: String },
    hearingDate: { label: 'hearingDate', type: String },
    hearingTime: { label: 'hearingTime', type: String },
    doePosition: { label: 'doePosition', type: String },
    testifier: { label: 'testifier', type: String },
    doeInternalStatus: { label: 'doeInternalStatus', type: String },
  });

  const bridge = new SimpleSchema2Bridge(schema);

  return (
    <Modal show={show} onHide={onHide}>
      <AutoForm schema={bridge} onSubmit={(data) => onSubmit(data)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Save Bill</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <SelectField
                id="saveBill-modal-office"
                name="office"
                placeholder="Office"
              />
            </Col>
            <Col>
              <TextField
                id="saveBill-modal-action"
                name="doeAction"
                placeholder="Action"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                id="saveBill-modal-hearingDate"
                name="hearingDate"
                placeholder="Hearing Date"
              />
            </Col>
            <Col>
              <TextField
                id="saveBill-modal-hearingTime"
                name="hearingTime"
                placeholder="Hearing Time"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                id="saveBill-modal-position"
                name="doePosition"
                placeholder="Position"
              />
            </Col>
            <Col>
              <TextField
                id="saveBill-modal-testifier"
                name="testifier"
                placeholder="Testifier"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                id="saveBill-modal-internalStatus"
                name="doeInternalStatus"
                placeholder="Internal Status"
              />
            </Col>
          </Row>
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
  onSubmit: PropTypes.func.isRequired,
};

export default SaveBillModal;
