import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { Archive, FilePdfFill, Youtube } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from './LoadingSpinner';
import { ScraperData } from '../../api/scraperData/ScraperData';

// added
const BillResolutionDetails = () => {

  const { _code } = useParams();

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, bill } = useTracker(() => {
    const subscription = Meteor.subscribe(ScraperData.userPublicationName);
    const rdy = subscription.ready();
    const billItem = ScraperData.collection.find({ code: _code }).fetch();
    return {
      bill: billItem[0],
      ready: rdy,
    };
  }, false);

  useEffect(() => {
    document.title = `DOE Legislative Tracker - ${_code}`;
  });

  // TODO change depending on bill status
  const billStatusStyle = {
    backgroundColor: '#f5f5f5',
  };

  const fakeLink4Rob = {
    color: '#6f5cf3',
    textDecorationLine: 'underline',
  };

  function introducerShortened() {
    // eslint-disable-next-line for-direction
    for (let i = 0; i < bill.introducer.length; i++) {
      if (bill.introducer[i] === ' ' && i > 3) {
        return bill.introducer.substring(0, i - 1);
      }
    }
    return bill.introducer;
  }

  function theRestOfIntroducers() {
    // eslint-disable-next-line for-direction
    for (let i = 0; i < bill.introducer.length; i++) {
      if (bill.introducer[i] === ' ' && i > 3) {
        return bill.introducer.substring(i);
      }
    }
    return bill.introducer;
  }

  // TODO if bill not found, need to redirect to 404
  return (ready ? (
    <Container className="text-center border border-1 small mb-5">
      <Row style={{ backgroundColor: '#ddf3dd' }}>
        <Col>
          {/* EMPTY COL FOR ALIGNMENT */}
        </Col>
        <Col>
          <h3 className="pt-2">
            <a href={bill.measureArchiveUrl} target="_blank" rel="noreferrer"><b>{bill.code}</b></a>
            &nbsp;
            <a aria-label="PDF link" href={bill.measurePdfUrl} target="_blank" rel="noreferrer"><FilePdfFill className="pb-1" /></a>
          </h3>
        </Col>
        <Col className="text-end">
          <Card style={billStatusStyle} className="p-2 m-1 float-end flex-row">
            <Archive className="m-1 me-2" />
            {/* TODO Status? */}
            Deferred/Inactive
          </Card>
        </Col>
      </Row>
      <Row className="py-1">
        <b>{bill.measureTitle}</b>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Report Title</b>
            </Col>
          </Row>
          <Row>
            <Col className="py-2">
              {bill.reportTitle}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Description</b>
            </Col>
          </Row>
          <Row>
            <Col className="py-2">
              {bill.description}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="border border-bottom-0 border-start-0 border-end-0">
        <Col>
          <Row>
            <Col className="border border-top-0 border-start-0 border-end-0">
              <b>Office</b>
            </Col>
          </Row>
          <Row>
            <Col className="py-2">
              {/* TODO get offices, need to add this to the saved measures db */}
            </Col>
          </Row>
        </Col>
        <Col className="border border-top-0 border-bottom-0">
          <Row>
            <Col className="border border-top-0 border-start-0 border-end-0">
              <b>Action</b>
            </Col>
          </Row>
          <Row>
            <Col className="py-2">
              {/* TODO add 'action,' not sure if this is something that they add or what. didn't see it on the bill's page */}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="border border-top-0 border-start-0 border-end-0">
              <b>Companion</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO this should be a link. need to get link for companion from individual bill page */}
              {bill.companion}
            </Col>
          </Row>
        </Col>
        <Col className="border border-top-0 border-bottom-0 border-end-0">
          <Row>
            <Col className="border border-top-0 border-start-0 border-end-0">
              <b>Leg Type</b>
            </Col>
          </Row>
          <Row>
            <Col className="py-2">
              {/* LEG TYPE TODO aren't these all bills? */}
              **Bill**
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="border border-start-0 border-end-0 border-bottom-0">
        <Col className="border border-top-0 border-bottom-0 border-start-0">
          <Row>
            <Col className="border border-top-0 border-start-0 border-end-0">
              <b>Introduced by</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              <Accordion flush className="introducerAccordion">
                <Accordion.Item eventKey="0">
                  <Accordion.Header> {introducerShortened()} </Accordion.Header>
                  <Accordion.Body>
                    {`${theRestOfIntroducers()} \n**00/00/0000**`}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              {/* TODO have to scrap the date somehow? didn't see it on the bill page */}
            </Col>
          </Row>
        </Col>
        <Col className="border border-top-0 border-bottom-0 border-start-0">
          <Row>
            <Col className="border border-top-0 border-start-0 border-end-0">
              <b>Committee Referral</b>
            </Col>
          </Row>
          <Row>
            <Col className="py-2">
              {bill.currentReferral}
            </Col>
          </Row>
        </Col>
        <Col className="border border-top-0 border-bottom-0 border-start-0">
          <Row>
            <Col className="border border-top-0 border-start-0 border-end-0">
              <b>Act #</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO act num? not sure what this is */}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="border border-top-0 border-start-0 border-end-0">
              <b>Supt&apos;s</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO supplements, not sure what this is either */}
              <input type="checkbox" />
                &nbsp;Binder
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="border border-top-0 border-bottom-0 border-start-0">
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Hearing Date</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO hearing date, it looks like this is scraped from the 'hearing notices' section on the bill page */}
              **Tue 03/02/2021**
            </Col>
          </Row>
        </Col>
        <Col className="border border-top-0 border-bottom-0 border-start-0">
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Hearing Time</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO hearing time, same as above */}
              **11:00 AM**
            </Col>
          </Row>
        </Col>
        <Col className="border border-top-0 border-bottom-0 border-start-0">
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Hearing Location</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO hearing location, same as above */}
              **308 Via Videoconference**
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Notified of Hearings</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO 'notified of hearings' section from lotus notes. no idea */}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="border border-top-0 border-bottom-0 border-start-0">
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Committee</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO 'committee' section, did not see this on the bill page */}
              **House Finance**
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Last Status Text</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {`${bill.statusDate}: ${bill.statusDescription}`}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>All Versions</b>
            </Col>
          </Row>
          <Row className="py-1">
            <Col>
              {/* TODO 'versions,' needs to be scraped from bill page */}
              <div style={fakeLink4Rob}>**HB1078 HD1**</div>
              <div style={fakeLink4Rob}>**HB1078**</div>
            </Col>
          </Row>
        </Col>
        <Col className="border border-top-0 border-bottom-0">
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Committee Reports</b>
            </Col>
          </Row>
          <Row className="py-1">
            <Col>
              {/* TODO 'committee reports,' same as above */}
              <div style={fakeLink4Rob}>**HB1078 HD1 HSCR479**</div>
              <div style={fakeLink4Rob}>**HB1078 HD1 HSCR784**</div>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="border border-start-0 border-end-0">
              <Youtube /><b>&nbsp;YouTube</b>
            </Col>
          </Row>
          <Row className="py-1">
            <Col>
              {/* TODO add YouTube links, same as above */}
              <div style={fakeLink4Rob}>**HEARING EDN 02-16-21 2:00P**</div>
              <div style={fakeLink4Rob}>**HEARING FIN 03-02-21 1 11:00A**</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="py-1 border border-bottom-0 border-start-0 border-end-0">
          {/* TODO what is this section? who are these people? */}
          **Alysha Kim 305-9806; Annie Kalama 305-9806; Mandi Morgan 305-9806**<br />
          **Charlene Miyakawa 305-9806; Esther Kim 305-9806; Wowie Ramos 305-9750**
        </Col>
      </Row>
      <Row>
        <Col className="border border-top-0 border-bottom-0 border-start-0 col-sm-1">
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Similar</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO 'similar'... no idea. I think from this section down is all internal DOE use */}
            </Col>
          </Row>
        </Col>
        <Col className="border border-top-0 border-bottom-0 border-start-0 col-sm-2">
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Lead Office Position</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO lead office position */}
            </Col>
          </Row>
        </Col>
        <Col className="border border-top-0 border-bottom-0 border-start-0">
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Testifier</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO testifier */}
              **04/04/2022 1:30 PM - Randall T. Tanaka** <br />
              <div style={fakeLink4Rob}>**03/22/2022 2:00 PM - Keith Hayashi / Randall Tanaka**</div>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Approved Testimony</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO approved testimony list... these links are scraped from the bill page */}
              <div style={fakeLink4Rob}><FilePdfFill /> **SB3096-HD2_EDN_04-04-22_FIN_Support.pdf**</div>
              <div style={fakeLink4Rob}><FilePdfFill /> **SB3096-SD1_EDN_03-22-22_EDN_Support.pdf**</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="border border-top-0 border-bottom-0 border-start-0">
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Monitoring Reports</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO 'monitoring reports' - I think this is for internal DOE use */}
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="border border-start-0 border-end-0">
              <b>Hearing Comments</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {/* TODO 'hearing comments' - same as above */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default BillResolutionDetails;
