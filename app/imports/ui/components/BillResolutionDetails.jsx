import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { Archive, FilePdfFill, Youtube } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
// import { Meteor } from 'meteor/meteor';
import LoadingSpinner from './LoadingSpinner';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import Legtracker from '../utilities/Legtracker';

const BillResolutionDetails = () => {
  const { _code } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, bill } = useTracker(() => {
    const subscription = SavedMeasures.subscribeMeasureSaved();
    const rdy = subscription.ready();
    const billItem = SavedMeasures.find({ code: _code }).fetch();
    return {
      bill: billItem[0],
      ready: rdy,
    };
  }, false);

  // eslint-disable-next-line consistent-return
  const getScraperParams = (billData) => {
    if (ready && billData !== undefined) {
      const billInfo = billData.code.split(' ');
      const year = billData.statusDate;
      return ({
        bt: `${billInfo[0].slice(0, 2)}`,
        bn: `${billInfo[0].slice(2)}`,
        year: `${year.slice(year.length - 4, year.length)}`,
      });
    }
    return undefined;
  };

  const billObj = getScraperParams(bill);

  const [billDetails, setBillDetails] = useState({});
  useEffect(() => {
    document.title = `DOELT - ${_code}`;
    if (ready && bill !== undefined) {
      Legtracker
        .scrapeBillDetails(billObj.bt, billObj.bn, billObj.year)
        .then(initialData => {
          setBillDetails(initialData);
        });
    }
  }, [ready]);

  // TODO change depending on bill status
  const billStatusStyle = {
    backgroundColor: '#f5f5f5',
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

  // Hearing Date and Time
  const billDateAndTime = () => {
    if (billDetails.hearingNotices !== undefined && billDetails.hearingNotices.length !== 0) {
      return billDetails.hearingNotices[billDetails.hearingNotices.length - 1].dateTime;
    }
    return 'N/A';
  };
  // Hearing Location
  const billLocation = () => {
    if (billDetails.hearingNotices !== undefined && billDetails.hearingNotices.length !== 0) {
      return billDetails.hearingNotices[billDetails.hearingNotices.length - 1].room;
    }
    return 'N/A';
  };
  // All Versions
  const versions = () => {
    if (billDetails.measureVersions !== undefined && billDetails.measureVersions.length !== 0) {
      return billDetails.measureVersions.map(data => (
        <div>
          <a href={data.measureVersionsUrl} target="_blank" rel="noreferrer noopener">
            {data.measureVersionsText}
          </a>
        </div>
      ));
    }
    return 'N/A';
  };
  // Committee Reports
  const committeeReports = () => {
    if (billDetails.committeeReports !== undefined && billDetails.committeeReports.length !== 0) {
      return billDetails.committeeReports.map(data => (
        <div>
          <a href={data.committeeReportsPdf}>{data.committeeReportsText}</a>
        </div>
      ));
    }
    return 'N/A';
  };
  // Youtube
  const youtube = () => {
    if (billDetails.hearingNotices !== undefined && billDetails.hearingNotices.length !== 0) {
      return billDetails.hearingNotices.map(data => (
        <div>
          <a href={data.youtubeUrl} target="_blank" rel="noreferrer noopener">
            {`${data.committee} ${data.dateTime}`}
          </a>
        </div>
      ));
    }
    return 'N/A';
  };
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
              {/* LEG TYPE TODO aren't these all bills? Putting this as bill temp. */}
              Bill
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
                    {`${theRestOfIntroducers()} \n${billDetails.initialDate}`}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
              <b>Hearing Date and Time</b>
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              {billDateAndTime()}
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
              {billLocation()}
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
              {versions()}
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
              {committeeReports()}
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
              {youtube()}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default BillResolutionDetails;
