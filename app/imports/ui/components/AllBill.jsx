import React from 'react';
import PropTypes from 'prop-types';
// import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { CloudCheckFill } from 'react-bootstrap-icons';
import { Accordion, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { SavedMeasures } from '../../api/savedMeasure/SavedMeasureCollection';
import SmallerSpinner from './SmallerSpinner';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AllBill = ({ bill }) => {

  const { ready, saved } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = SavedMeasures.subscribeMeasureSaved();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const svd = SavedMeasures.find().fetch();
    return {
      saved: svd,
      ready: rdy,
    };
  }, []);

  const checkSaved = saved ?
    <div style={{ textAlign: 'center', fontSize: '20px' }}><CloudCheckFill /></div>
    : (
      <Button
        style={{ backgroundColor: '#418c5c', color: 'white', borderColor: '#297e4b' }}
        onClick={() => SavedMeasures.collection.insert(bill)}
      >Save
      </Button>
    );

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
    return '';
  }

  return (
    <tr>
      <td>
        {ready ? checkSaved : <SmallerSpinner class="d-flex justify-content-center" />}
      </td>
      <td>
        <div style={{ fontSize: '20px' }}><Link to={`/view/${bill.code}`}><strong>{bill.code}</strong></Link></div>
        <Accordion flush className="billAccordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{bill.measureTitle} </Accordion.Header>
            <Accordion.Body>{bill.description}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </td>
      <td>{bill.currentReferral}</td>
      <td>{bill.companion}</td>
      <td>
        <Accordion flush className="introducerAccordionList">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{introducerShortened()} </Accordion.Header>
            <Accordion.Body>{theRestOfIntroducers()}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </td>
      <td>{`(${bill.statusHorS}) ${bill.statusDescription} ${bill.statusDate}`}</td>
    </tr>
  );
};

// Require a document to be passed to this component.
AllBill.propTypes = {
  bill: PropTypes.shape({
    code: PropTypes.string,
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

export default AllBill;
