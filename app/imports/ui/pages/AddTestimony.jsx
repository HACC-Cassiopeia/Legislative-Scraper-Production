import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { jsPDF } from 'jspdf';
import { Testimonies } from '../../api/testimony/Testimony';
// ADDED
// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  committeeChair: String,
  committeeName: String,
  billNumber: String,
  draftNumber: String,
  hearingDate: String,
  hearingLocation: String,
  position: String,
  introduction: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddTestimony = () => {

  useEffect(() => {
    document.title = 'DOE Legislative Tracker - Add Testimony';
  });

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { committeeChair, committeeName, billNumber, draftNumber, hearingDate, hearingLocation, position, introduction } = data;
    // const owner = Meteor.user().username;

    Testimonies.collection.insert(
      { committeeChair, committeeName, billNumber, draftNumber, hearingDate, hearingLocation, position, introduction },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>New Testimony</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="committeeChair" /></Col>
                  <Col><TextField name="committeeName" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="billNumber" /></Col>
                  <Col><TextField name="draftNumber" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="hearingLocation" /></Col>
                  <Col><TextField name="hearingDate" /></Col>
                </Row>
                <TextField name="position" />
                <LongTextField name="introduction" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Col className="text-center">
            <Button
              className="my-3"
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
                doc.addImage('/images/hawaii-state-seal.gif', 'gif', midPage - 11, 24, 22, 22);
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
              Generate Testimony PDF
            </Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTestimony;
