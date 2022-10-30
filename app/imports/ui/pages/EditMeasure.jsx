import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { ChevronLeft, List } from 'react-bootstrap-icons';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import DesktopSideBarExpanded from '../components/SideNavBar/DesktopSideBarExpanded';
import DesktopSideBarCollapsed from '../components/SideNavBar/DesktopSideBarCollapsed';

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
    const document = SavedMeasures.find({ _id: _id }).fetch();
    return {
      doc: document[0],
      ready: rdy,
    };
  }, false);
  const [expanded, setExpanded] = useState(false);
  const closeWidth = '62px';
  const openWidth = '131.5px';

  // On successful submit, insert the data.
  const submit = (data) => {
    const { office, archive, code, measurePdfUrl, measureArchiveUrl, measureTitle, reportTitle, description, statusHorS, statusDescription, statusDate, introducer, currentReferral, companion, doeAction, hearingDate, hearingTime,
      hearingLocation, doePosition, testifier, doeInternalStatus } = data;
    const collectionName = SavedMeasures.getCollectionName();
    // eslint-disable-next-line max-len
    const updateData = { _id: _id, office, archive, code, measurePdfUrl, measureArchiveUrl, measureTitle, reportTitle, description, statusHorS, statusDescription, statusDate, introducer, currentReferral, companion, doeAction, hearingDate, hearingTime, hearingLocation, doePosition, testifier, doeInternalStatus };
    updateMethod.callPromise({ collectionName, updateData })
      .then(() => swal('Success', 'Measure updated successfully', 'success'))
      .catch(error => swal('Error', error.message, 'error'));
  };
  // const mainBodyLeftMargin = {
  //   marginLeft: expanded ? openWidth : closeWidth,
  // };
  const closedButtonStyle = {
    backgroundColor: '#2e374f',
    width: closeWidth,
    borderRadius: 0,
    borderWidth: 0,
    fontWeight: 'normal',
    fontSize: '20px',
    boxShadow: 'none',
  };
  const buttonStyle = {
    backgroundColor: '#2e374f',
    borderWidth: 0,
    borderRadius: 0,
    width: openWidth,
    fontWeight: 'normal',
    fontSize: '20px',
    marginTop: 0,
    boxShadow: 'none',
  };
  function getDesktopSidebar() {
    if (expanded) {
      return (
        <Col className="col-3" style={{ position: 'fixed' }}>
          <Button
            onClick={() => setExpanded(false)}
            className="py-2 px-3 text-end navButtons"
            style={buttonStyle}
          >
            <ChevronLeft />
          </Button>
          <DesktopSideBarExpanded page="home" />
        </Col>
      );
    }
    return (
      <Col style={{ position: 'fixed' }}>
        <Button
          onClick={() => setExpanded(true)}
          className="py-2 px-3 text-center navButtons"
          style={closedButtonStyle}
        >
          <List />
        </Button>
        <DesktopSideBarCollapsed page="home" />
      </Col>
    );
  }
  let fRef = null;
  // TODO add nav bar and style this page
  return ready ? (
    <Container id={PAGE_IDS.EDIT_BILL} className="py-3">
      {console.log(doc)}
      <Row className="justify-content-center">
        <Col xs={12}>
          <Col className="text-center"><h2>Edit Bill</h2></Col>
          <AutoForm schema={bridge} ref={ref => { fRef = ref; }} onSubmit={data => submit(data, fRef)} model={doc}>
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
