import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { jsPDF } from 'jspdf';
import { NavLink } from 'react-router-dom';
import { EnvelopeFill, FilePdfFill, HddFill } from 'react-bootstrap-icons';
// import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Testimonies } from '../../api/testimony/TestimonyCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import SideNavBar from '../components/SideNavBar';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  governorName: String,
  governorTitle: String,
  testifier: String,
  testifierTitle: String,
  hearingDate: Date,
  hearingTime: String,
  hearingLocation: String,
  committee: String,
  department: String,
  testifierNameAndTitle: String,
  billTitle: String,
  billPurpose: String,
  position: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const EditTestimony = () => {
  // const { _code } = useParams();

  const [testimonies, setTestimonies] = useState([]);
  const { ready, testimony } = useTracker(() => {
    const subscription = Testimonies.subscribeTestimony();
    const rdy = subscription.ready();
    // TODO replace billcode with _code
    const testimonyItem = Testimonies.find({ billCode: 'HB410 HD1' }).fetch();
    return {
      testimony: testimonyItem[0],
      ready: rdy,
    };
  }, false);

  // TODO 'add testimony' pulls from SavedMeasures db, 'edit testimony' pulls from Testimony db
  //  we should probably make the 'pdf form' bit a component that can be reused in for both pages

  // TODO load from Testimony db
  // const { ready, bill } = useTracker(() => {
  //   const subscription = SavedMeasures.subscribeMeasureSaved();
  //   const rdy = subscription.ready();
  //   const billItem = SavedMeasures.find({ code: _code }).fetch();
  //   return {
  //     bill: billItem[0],
  //     ready: rdy,
  //   };
  // }, false);

  useEffect(() => {
    // todo add _code to edit testimony
    document.title = `DOELT - Edit Testimony for _code`;
    setTestimonies(testimony);
  }, []);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { committeeChair, committeeName, billNumber, draftNumber, hearingDate, hearingLocation, position, introduction } = data;

    const collectionName = Testimonies.getCollectionName();
    const definitionData = { committeeChair, committeeName, billNumber, draftNumber, hearingDate, hearingLocation, position, introduction };

    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      })
      .catch(error => swal('Error', error.message, 'error'));

  };

  const navBarStyle = {
    backgroundColor: '#F7F7F7',
    hover: 'green',
    borderBottom: '2px solid #DDDDDD',
    height: '50px',
    marginLeft: '14%',
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
  console.log('testimony', testimony);
  console.log('testimonies', testimonies);

  return (ready ? (
    <Col style={{ backgroundColor: '#e6e6e6', minWidth: '800px' }}>
      <SideNavBar id="nav" />
      <Col id="mainBody">
        <AutoForm className="p-5 mt-4 d-flex justify-content-center" ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>

          <Navbar className="fixed-top justify-content-center" style={navBarStyle}>
            <HddFill />
            <SubmitField className="testimonyNavbarButtons" value="Save Changes" />
            <Nav.Link className="m-5 testimonyNavbar" as={NavLink} to="#"> <EnvelopeFill className="mb-1" />&nbsp;&nbsp;Send for Review</Nav.Link>
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
                const governorName = 'DAVID Y. IGE';
                const superTitle = 'SUPERINTENDENT'; // could also be 'INTERIM SUPERINTENDENT'
                const superName = 'DR. CHRISTINA M. KISHIMOTO';
                const testDate = '02/09/2021';
                const testTime = '09:00 AM';
                const testLocation = '325 Via Videoconference';
                const testCommittee = 'House Energy & Environmental Protection';
                let testCommitteeFormatted;
                if (testCommittee.length > 20) {
                  for (let i = 20; i > 0; i--) {
                    if (testCommittee[i] === ' ') {
                      testCommitteeFormatted = `${testCommittee.substring(0, i)}\n${testCommittee.substring(i + 1)}`;
                      break;
                    }
                  }
                } else {
                  testCommitteeFormatted = testCommittee;
                }
                const personTestifying = 'Dr. Christina M. Kishimoto, Superintendent of Education';
                const billTitle = 'HB 0410 RELATING TO TREE PLANTING.';
                const billPurpose = 'Requires that eighth grade students and twelfth grade students in ' +
                  'Hawaii public schools along with University of Hawaii ' +
                  'undergraduate students plant trees.';
                const splitPurpose = doc.splitTextToSize(billPurpose, 165);

                // TODO fix rendering special chars (ā will not render in Helvetica - need to add a custom font)
                const departmentPosition = 'The Hawaii State Department of Education (Department) offers the following comments ' +
                  'on HB 410 regarding specific grade level mandate for tree planting.\n\n' +
                  'The Department agrees that educational endeavors around environmental protection, ' +
                  'biodiversity, and climate change mitigation are critical for youth to cultivate science ' +
                  'literacy and socially conscious citizenry and the Department is deeply committed to ' +
                  '‘aina-based education. To that end, the Department adopted the Next Generation ' +
                  'Science Standards (NGSS) in 2016. There is a clear trajectory of building ' +
                  'developmentally appropriate student understanding of topics such as climate and ' +
                  'human impacts on the environment from kindergarten through high school. In addition, ' +
                  'climate change and other topics of human-environment interaction are specifically ' +
                  'addressed in the Hawaii Core Standards for Social Studies.\n\n' +
                  'The Department’s school design strategy prioritizes a flexible and adaptive approach, ' +
                  'empowering each school to make decisions about specific contexts and partnerships for ' +
                  'developing high quality and relevant learning experiences based on the needs of their ' +
                  'students and the local community. It is through this lens that schools are able to ' +
                  'creatively address aina-based educational programs and projects that promote ' +
                  'environmental protection, biodiversity, and climate change mitigation.\n\n';
                const splitPosition = doc.splitTextToSize(departmentPosition, 218);

                // TODO figure out naming convention for testimonies
                const fileName = 'Test Testimony.pdf';

                // TODO fix alignment for governor and superintendent so when names change everything still looks good
                // HEADER
                doc.setFontSize(6);
                doc.setFont('helvetica', 'bold');
                doc.text(governorName, 15, 35);
                doc.text(superName, midPage * 2 - 15, 35, { align: 'right' });
                doc.setFont('helvetica', 'normal');
                doc.text('GOVERNOR', 15.5, 38);
                doc.text(superTitle, midPage * 2 - 20, 38, { align: 'right' });
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
                doc.text(testDate, midPage + 15, 74);
                doc.text(testTime, midPage + 16, 79);
                doc.text(testLocation, midPage + 23.5, 84);
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
                        <DateField className="m-0 ps-2" name="hearingDate" label="" type="date" placeholder="00/00/0000" />
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
                    <TextField style={{ width: '94%' }} name="testifierNameAndTitle" label="" placeholder="Keith T. Hayashi, Superintendent of Education" />
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
