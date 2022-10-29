import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { offices } from '../../api/savedMeasures/SavedMeasuresCollection';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const SavedBill = ({ bill }) => (
  <tr>
    <td>
      <div style={{ fontSize: '20px' }}><Link to={`/view/${bill.code}`}><strong>{bill.code}</strong></Link></div>
      <Accordion flush className="billAccordion">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{bill.measureTitle} </Accordion.Header>
          <Accordion.Body>{bill.description}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </td>
    <td>{bill.office ? bill.office : 'N/A'}</td>
    <td>{bill.doeAction ? bill.doeAction : 'N/A'}</td>
    <td>{bill.currentReferral ? bill.currentReferral : 'N/A'}</td>
    <td>
      {bill.hearingDate ? bill.hearingDate : 'N/A'} <br />
      {bill.hearingTime}
    </td>
    <td>{bill.doePosition ? bill.doePosition : 'N/A'}</td>
    <td>{bill.testifier ? bill.testifier : 'N/A'}</td>
    <td>{bill.doeInternalStatus ? bill.doeInternalStatus : 'N/A'}</td> {/* THIS IS AN INTERNALLY TRACKED DOE STATUS, NOT THE STATUS ON THE STATE WEBSITE */}
    <td>
      <Link to={`/edit-measure/${bill._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
SavedBill.propTypes = {
  bill: PropTypes.shape({
    office: { type: Array, optional: true },
    'office.$': {
      type: String,
      allowedValues: offices,
    },
    archive: { type: Boolean, optional: true },
    code: { type: String, optional: false },
    measurePdfUrl: { type: String, optional: true },
    measureArchiveUrl: { type: String, optional: true },
    measureTitle: { type: String, optional: true },
    reportTitle: { type: String, optional: true },
    description: { type: String, optional: true },
    statusHorS: { type: String, optional: true },
    statusDescription: { type: String, optional: true },
    statusDate: { type: String, optional: true },
    introducer: { type: String, optional: true },
    currentReferral: { type: String, optional: true },
    companion: { type: String, optional: true },
    doeAction: { type: String, optional: true },
    hearingDate: { type: String, optional: true },
    hearingTime: { type: String, optional: true },
    hearingLocation: { type: String, optional: true },
    doePosition: { type: String, optional: true },
    testifier: { type: String, optional: true },
    doeInternalStatus: { type: String, optional: true },
  }).isRequired,
};

export default SavedBill;
