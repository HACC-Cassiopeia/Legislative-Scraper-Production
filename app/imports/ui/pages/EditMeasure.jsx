import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(SavedMeasures._schema);

/* Renders the EditBill page for editing a single document. */
const EditMeasure = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = SavedMeasures.subscribeMeasureSaved();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = SavedMeasures.findDoc(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { office, archive, code, measurePdfUrl, measureArchiveUrl, measureTitle, reportTitle, description, statusHorS, statusDescription, statusDate, introducer, currentReferral, companion, doeAction, hearingDate, hearingTime,
      hearingLocation, doePosition, testifier, doeInternalStatus } = data;
    const collectionName = SavedMeasures.getCollectionName();
    // eslint-disable-next-line max-len
    const updateData = { id: _id, office, archive, code, measurePdfUrl, measureArchiveUrl, measureTitle, reportTitle, description, statusHorS, statusDescription, statusDate, introducer, currentReferral, companion, doeAction, hearingDate, hearingTime, hearingLocation, doePosition, testifier, doeInternalStatus };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Measure updated successfully', 'success'));
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_BILL} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Col className="text-center"><h2>Edit Bill</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={3}><TextField name="code" /></Col>
                  <Col sm={5}><TextField name="measureTitle" /></Col>
                  <Col sm={4}> <TextField name="introducer" /></Col>
                </Row>
                <Row>
                  <Col sm={3}> <SelectField name="office" /></Col>
                  <Col sm={9}><LongTextField name="description" /></Col>
                </Row>

                <Row>
                  <Col sm={3}> <TextField name="testifier" /></Col>
                  <Col sm={3}><TextField name="currentReferral" /></Col>
                  <Col sm={6}><TextField name="reportTitle" /></Col>
                </Row>

                <br />

                <Row>
                  <Col sm={6}> <LongTextField name="statusDescription" /></Col>
                  <Col sm={3}> <TextField name="statusDate" /></Col>
                  <Col sm={3}><TextField name="statusHorS" /></Col>
                </Row>

                <Row>
                  <Col sm={6}> <TextField name="hearingLocation" /></Col>
                  <Col sm={3}><TextField name="hearingDate" /></Col>
                  <Col sm={3}><TextField name="hearingTime" /></Col>
                </Row>

                <Row>
                  <Col sm={3}><TextField name="doeAction" /></Col>
                  <Col sm={6}><TextField name="doePosition" /></Col>
                  <Col sm={3}> <TextField name="doeInternalStatus" /></Col>
                </Row>

                <TextField name="measurePdfUrl" />
                <TextField name="measureArchiveUrl" />

                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditMeasure;
