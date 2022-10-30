import React, { useEffect } from 'react';
import { Button, Card, Col, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { jsPDF } from 'jspdf';
import { NavLink } from 'react-router-dom';
import { EnvelopeFill, FilePdfFill, HddFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Testimonies, testimonyStatuses } from '../../api/testimony/TestimonyCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import MobileSideBar from '../components/SideNavBar/MobileSideBar';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import DesktopSideBar from '../components/SideNavBar/DesktopSideBar';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  governorName: { type: String, defaultValue: 'DAVID Y. IGE' },
  governorTitle: { type: String, defaultValue: 'GOVERNOR' },
  testifier: String,
  testifierTitle: String,
  hearingDate: String,
  hearingTime: String,
  hearingLocation: String,
  committee: String,
  department: { type: String, defaultValue: 'Education' },
  billCode: String,
  billTitle: String,
  billPurpose: String,
  position: String,
  lastEditedBy: String,
  status: { type: String, allowedValues: testimonyStatuses },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const EditTestimony = () => {
  const { _id } = useParams();
  const { _code } = useParams();

  const { ready, testimony } = useTracker(() => {
    const subscription = Testimonies.subscribeTestimony();
    const rdy = subscription.ready();
    // TODO replace billcode with _code
    const testimonyItem = Testimonies.find({ _id: _id }).fetch();
    return {
      testimony: testimonyItem[0],
      ready: rdy,
    };
  }, false);

  useEffect(() => {
    document.title = `DOELT - Editing Testimony for ${_code}`;
  }, []);

  // On submit, insert the data.
  const submit = (data) => {
    const { governorName, governorTitle, testifier, testifierTitle, hearingDate, hearingTime, hearingLocation, committee, department, billCode, billTitle, billPurpose, position, lastEditedBy, status } = data;

    const collectionName = Testimonies.getCollectionName();
    const updateData = { _id: _id, governorName, governorTitle, testifier, testifierTitle, hearingDate, hearingTime, hearingLocation, committee, department, billCode, billTitle, billPurpose, position, lastEditedBy, status };

    updateMethod.callPromise({ collectionName, updateData })
      .then(() => {
        swal('Success', `Testimony for ${_code} has been edited`, 'success');
      })
      .catch(error => swal('Error', error.message, 'error'));

  };

  const navBarStyle = {
    backgroundColor: '#F7F7F7',
    hover: 'green',
    borderBottom: '2px solid #DDDDDD',
    zIndex: 200,
  };

  const pageStyle = {
    borderRadius: '0px',
    borderWidth: '0',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '900px',
  };

  const lilPadding = {
    paddingTop: '2px',
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;

  return (ready ? (
    <Col style={{ backgroundColor: '#e6e6e6', minWidth: '800px' }}>
      <DesktopSideBar id="nav" />
      {console.log('testimony', testimony)}
      <Col id="mainBody">
        <AutoForm className="p-5 mt-4 d-flex justify-content-center" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} model={testimony}>

          <Navbar className="fixed-top d-flex justify-content-center align-items-center" style={navBarStyle}>
            <div className="pt-3 px-4 d-flex gap-1 align-items-center justify-content-center">
              <div className="mb-3">Status:</div>
              <SelectField name="status" label="" />
            </div>
            <HddFill />
            <SubmitField className="testimonyNavbarButtons" value="Save Changes" />
            <FilePdfFill className="ms-3" />
            <Button
              id="generatePdfButton"
              className="my-3 ms-0 p-0"
              onClick={() => {
                // eslint-disable-next-line new-cap
                const doc = new jsPDF('portrait', 'mm', 'letter');
                const midPage = (doc.internal.pageSize.width / 2);
                const margins = 25;

                // TODO all variables should be loaded from db
                // test = testimony
                const governorName = (testimony.governorName ? testimony.governorName : 'DAVID Y. IGE');
                const testifierTitle = (testimony.testifierTitle ? testimony.testifierTitle : 'SUPERINTENDENT'); // could also be 'INTERIM SUPERINTENDENT'
                const testifier = (testimony.testifier ? testimony.testifier : 'JOHN DOE');
                const hearingDate = (testimony.hearingDate ? testimony.hearingDate : '10/20/2022');
                const hearingTime = (testimony.hearingTime ? testimony.hearingTime : '9:30A');
                const hearingLocation = (testimony.hearingLocation ? testimony.hearingLocation : '325 Via Videoconference');
                const committee = (testimony.committee ? testimony.committee : 'BOE');
                let testCommitteeFormatted;
                if (committee.length > 20) {
                  for (let i = 20; i > 0; i--) {
                    if (committee[i] === ' ') {
                      testCommitteeFormatted = `${committee.substring(0, i)}\n${committee.substring(i + 1)}`;
                      break;
                    }
                  }
                } else {
                  testCommitteeFormatted = committee;
                }
                const personTestifying = `${testifier}, ${testifierTitle}`;
                const billTitle = (testimony.billTitle ? testimony.billTitle : 'HB123 RELATING TO SCHOOL');
                const billPurpose = (testimony.billPurpose ? testimony.billPurpose : 'PURPOSE');
                const splitPurpose = doc.splitTextToSize(billPurpose, 165);

                // TODO fix rendering special chars (ā will not render in Helvetica - need to add a custom font)
                const position = (testimony.position ? testimony.position : 'POSITION');
                const splitPosition = doc.splitTextToSize(position, 218);

                // TODO figure out naming convention for testimonies
                const fileName = 'Test Testimony.pdf';

                // TODO fix alignment for governor and superintendent so when names change everything still looks good
                // HEADER
                doc.setFontSize(6);
                doc.setFont('helvetica', 'bold');
                doc.text(governorName, 15, 35);
                doc.text(testifier, midPage * 2 - 25, 35, { align: 'right' });
                doc.setFont('helvetica', 'normal');
                doc.text('GOVERNOR', 15.5, 38);
                doc.text(testifierTitle, midPage * 2 - 22, 38, { align: 'right' });
                doc.addImage('/images/hawaii-state-seal.png', 'png', midPage - 11, 24, 22, 22);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.text('STATE OF HAWAI‘I', midPage, 52, { align: 'center' });
                doc.text('DEPARTMENT OF EDUCATION', midPage, 55.5, { align: 'center' });
                doc.setFont('helvetica', 'normal');
                doc.text('P.O. BOX 2360', midPage, 59, { align: 'center' });
                doc.text('HONOLULU, HAWAI‘I 96804', midPage, 62.5, { align: 'center' });

                // DATE, TIME, LOCATION, COMMITTEE
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('Date:', midPage + 3, 74);
                doc.text('Time:', midPage + 3, 79);
                doc.text('Location:', midPage + 3, 84);
                doc.text('Committee:', midPage + 3, 89);
                doc.setFont('helvetica', 'normal');
                doc.text(hearingDate, midPage + 15, 74);
                doc.text(hearingTime, midPage + 16, 79);
                doc.text(hearingLocation, midPage + 23.5, 84);
                doc.text(`                     ${testCommitteeFormatted}`, midPage + 3, 89); // to get spacing on second line

                // DEPARTMENT, PERSON TESTIFYING, TITLE & PURPOSE OF BILL, CONTENT
                doc.setFont('helvetica', 'bold');
                doc.text('Department:', margins, 105);
                doc.text('Person Testifying:', margins, 115);
                doc.text('Title of Bill:', margins, 125);
                doc.text('Purpose of Bill:', margins, 135);
                doc.text('Department\'s Position:', margins, 155);
                doc.setFont('helvetica', 'normal');
                doc.text('Education', margins + 41, 105);
                doc.text(personTestifying, margins + 41, 115);
                doc.text(billTitle, margins + 41, 125);
                doc.text(splitPurpose, margins + 41, 135);
                doc.text(splitPosition, margins, 160);

                // TODO add more pages if testimony is too long for one page

                doc.save(fileName);
              }}
            >
              &nbsp;&nbsp;Generate PDF
            </Button>
          </Navbar>
          <Row>
            <ErrorsField style={{ width: '900px' }} />
            <Card style={pageStyle} className="shadow">
              <Card.Body className="pdfFiller">
                <Row className="pt-3">
                  <Col className="d-flex justify-content-center col-3 ps-5">
                    <Row>
                      <TextField className="m-0 pt-5 p-0 testimonyName" name="governorName" label="" placeholder="DAVID Y. IGE" />
                      <TextField className="m-0 p-0 testimonyTitle" name="governorTitle" label="" placeholder="GOVERNOR" />
                    </Row>
                  </Col>
                  <Col className="d-flex justify-content-center mt-5">
                    <Image
                      style={{ width: '10%', minWidth: '6em' }}
                      src="/images/hawaii-state-seal.png"
                      alt="HI state seal"
                    />
                  </Col>
                  <Col className="d-flex justify-content-center col-3 pe-5">
                    <Row>
                      <TextField className="m-0 pt-5 p-0 testimonyName" name="testifier" label="" placeholder="KEITH T. HAYASHI" />
                      <TextField className="m-0 p-0 testimonyTitle" name="testifierTitle" label="" placeholder="SUPERINTENDENT" />
                    </Row>
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Col className="text-center testimonyAddress pt-3">
                    <b>STATE OF HAWAI&apos;I<br />
                      DEPARTMENT OF EDUCATION<br />
                    </b>
                    P.O. BOX 2360<br />
                    HONOLULU, HAWAI&apos;I 96804
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>{/* Empty col for spacing */}</Col>
                  <Col style={{ lineHeight: '1.2em' }}>
                    <Row>
                      <Col className="d-flex justify-content-start">
                        <b style={lilPadding}>Date:</b>
                        <TextField className="m-0 ps-2" name="hearingDate" label="" placeholder="00/00/0000" />
                      </Col>
                    </Row>
                    <Row style={{ top: '-18px', position: 'relative' }}>
                      <Col className="d-flex justify-content-start">
                        <b style={lilPadding}>Time:</b>
                        <TextField className="m-0 ps-2" name="hearingTime" label="" placeholder="00:00 AM" />
                      </Col>
                    </Row>
                    <Row style={{ top: '-35px', position: 'relative' }}>
                      <Col className="d-flex justify-content-start">
                        <b style={lilPadding}>Location:</b>
                        <TextField className="m-0 ps-2" name="hearingLocation" label="" placeholder="Hearing Location" />
                      </Col>
                    </Row>
                    <Row style={{ top: '-52px', position: 'relative' }}>
                      <Col className="d-flex justify-content-start">
                        <b style={lilPadding}>Committee:</b>
                        <LongTextField style={{ width: '60%' }} className="m-0 ps-2" name="committee" label="" placeholder="Committee Name" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row style={{ top: '-60px', position: 'relative' }} className="mx-5">
                  <Col className="col-3">
                    <b>Department:</b>
                  </Col>
                  <Col>
                    <TextField style={{ width: '40%' }} name="department" label="" placeholder="Education" />
                  </Col>
                </Row>
                <Row style={{ top: '-62px', position: 'relative' }} className="mx-5">
                  <Col className="col-3">
                    <b>Person Testifying:</b>
                  </Col>
                  <Col>
                    <TextField style={{ width: '94%' }} name="testifier" label="" placeholder="Keith T. Hayashi" />
                    <TextField style={{ width: '94%' }} name="testifierTitle" label="" placeholder="Superintendent of Education" />
                  </Col>
                </Row>
                <Row style={{ top: '-62px', position: 'relative' }} className="mx-5">
                  <Col className="col-3">
                    <b>Title of Bill:</b>
                  </Col>
                  <Col>
                    <TextField style={{ width: '94%' }} name="billTitle" label="" placeholder="Bill Title Goes Here" />
                  </Col>
                </Row>
                <Row style={{ top: '-62px', position: 'relative' }} className="mx-5">
                  <Col className="col-3">
                    <b>Purpose of Bill:</b>
                  </Col>
                  <Col>
                    <LongTextField style={{ width: '94%' }} name="billPurpose" label="" placeholder="Bill Purpose Goes Here" />
                  </Col>
                </Row>
                <Row style={{ top: '-62px', position: 'relative' }} className="mx-5">
                  <b>Department&apos;s Position:</b>
                </Row>
                <Row style={{ top: '-62px', position: 'relative' }}>
                  <Col className="d-flex justify-content-center">
                    <LongTextField className="doePosition" style={{ width: '85.9%' }} name="position" label="" placeholder="Department Position Goes Here" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </AutoForm>
      </Col>

    </Col>
  ) : <LoadingSpinner />);
};

export default EditTestimony;
