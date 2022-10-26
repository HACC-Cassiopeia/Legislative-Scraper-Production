import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

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
    <td>*offices assigned*</td>
    <td>*action to be taken*</td>
    <td>{bill.currentReferral}</td>
    <td>*hearing date/time*</td>
    <td>*DOE position*</td>
    <td>*testifier*</td>
    <td>*internal status*</td> {/* THIS IS AN INTERNALLY TRACKED DOE STATUS, NOT THE STATUS ON THE STATE WEBSITE */}
  </tr>
);

// Require a document to be passed to this component.
SavedBill.propTypes = {
  bill: PropTypes.shape({
    code: PropTypes.string,
    office: PropTypes.shape({
      office: PropTypes.string,
    }),
    measurePdfUrl: PropTypes.string,
    measureArchiveUrl: PropTypes.string,
    measureTitle: PropTypes.string,
    reportTitle: PropTypes.string,
    description: PropTypes.string,
    statusHorS: PropTypes.string,
    statusDescription: PropTypes.string,
    statusDate: PropTypes.string,
    introducer: PropTypes.string,
    currentReferral: PropTypes.string,
    companion: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default SavedBill;
