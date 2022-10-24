import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accordion, Col, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasures';
import SavedBill from '../components/SavedBill';
import LoadingSpinner from '../components/LoadingSpinner';
import SideNavBar from '../components/SideNavBar';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Dashboard = () => {
  const [office, setOffice] = useState('Select an Office');
  const [action, setAction] = useState('Select a Status');
  const [status, setStatus] = useState('Select an Action');

  const { ready, bills } = useTracker(() => {
    const subscription = Meteor.subscribe(SavedMeasures.userPublicationName);
    const rdy = subscription.ready();
    const billItems = SavedMeasures.collection.find({}).fetch();
    return {
      bills: billItems,
      ready: rdy,
    };
  }, []);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="pt-3 text-center"><b>DOE-Tracked Bills and Measures</b></h2>
      <Link className="d-flex justify-content-center pb-2" to="/view/all">View All Bill/Measures</Link>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filter Options</Accordion.Header>
          <Accordion.Body>
            <Row className="pb-4">
              <Col>
                Bill # <br />
                <label htmlFor="Search by Bill #">
                  <input type="text" placeholder="Enter bill #" />
                </label>
              </Col>
              <Col>
                Edit Date <br />
                <label htmlFor="Search by edit date">
                  <input type="text" placeholder="Enter date" />
                </label>
              </Col>
              <Col>
                Sort by Hearing Date <br />
                <label htmlFor="Search by hearing date">
                  <input type="text" placeholder="Enter date" />
                </label>
              </Col>
              <Col>
                Title <br />
                <label htmlFor="Search by title">
                  <input type="text" placeholder="Enter title" />
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                Office <br />
                <DropdownButton
                  id="dropdown-basic-button"
                  title={office}
                  onSelect={(e) => setOffice(e)}
                >
                  <Dropdown.Item eventKey="OCID">OCID</Dropdown.Item>
                  <Dropdown.Item eventKey="OFO">OFO</Dropdown.Item>
                  <Dropdown.Item eventKey="OFS">OFS</Dropdown.Item>
                  <Dropdown.Item eventKey="OHE">OHE</Dropdown.Item>
                  <Dropdown.Item eventKey="OITS">OITS</Dropdown.Item>
                  <Dropdown.Item eventKey="OSIP">OSIP</Dropdown.Item>
                  <Dropdown.Item eventKey="OSSS">OSSS</Dropdown.Item>
                  <Dropdown.Item eventKey="OTM">OTM</Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col>
                Status <br />
                <DropdownButton
                  id="dropdown-basic-button"
                  title={action}
                  onSelect={(e) => setAction(e)}
                >
                  <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                  <Dropdown.Item eventKey="Another action">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Something else">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col>
                Action <br />
                <DropdownButton
                  id="dropdown-basic-button"
                  title={status}
                  onSelect={(e) => setStatus(e)}
                >
                  <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                  <Dropdown.Item eventKey="Another action">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Something else">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col />
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );

  const returnList = () => (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <Table striped>
        <thead style={{ zIndex: 200 }}>
          <tr>
            <th>Bill / Resolution</th>
            <th>Office</th>
            <th>Action</th>
            <th>Committee</th>
            <th>Hearing</th>
            <th>Position</th>
            <th>Testifier</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          { bills.length === 0 ? <LoadingSpinner /> : bills.map((bill) => <SavedBill key={bill._id} bill={bill} />) }
        </tbody>
      </Table>
    </div>
  );

  return (ready ? (
    <div>
      <SideNavBar />
      <div id="mainBody">
        <Row id="dashboard-screen">
          <Col>
            <Row id="dashboard-filter">{returnFilter()}</Row>
            <Row id="dashboard-list">{returnList()}</Row>
          </Col>
        </Row>
      </div>
    </div>
  ) : <LoadingSpinner />);
};

export default Dashboard;
