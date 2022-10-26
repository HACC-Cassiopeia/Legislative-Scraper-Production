import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
// import { PAGE_IDS } from '../../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(SavedMeasures._schema);

/* Renders the EditMeasure page for editing a single document. */
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
    // eslint-disable-next-line max-len
    const { office, archive, code, measurePdfUrl, measureArchiveUrl, measureTitle, reportTitle, description, statusHorS, statusDescription, statusDate, introducer, currentReferral, companion, doeAction, hearingDate, hearingTime, hearingLocation, doePosition, testifier, doeInternalStatus } = data;
    const collectionName = SavedMeasures.getCollectionName();
    // eslint-disable-next-line max-len
    const updateData = { id: _id, office, archive, code, measurePdfUrl, measureArchiveUrl, measureTitle, reportTitle, description, statusHorS, statusDescription, statusDate, introducer, currentReferral, companion, doeAction, hearingDate, hearingTime, hearingLocation, doePosition, testifier, doeInternalStatus };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Measure</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                office, doeAction, doePosition, doeInternalStatus
                <TextField name="office" placeholder="Office" />
                <TextField name="doeAction" placeholder="Doe Action" />
                <TextField name="doePosition" placeholder="Doe Position" />
                <TextField name="doeInternalStatus" placeholder="Doe Internal Status" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditMeasure;
