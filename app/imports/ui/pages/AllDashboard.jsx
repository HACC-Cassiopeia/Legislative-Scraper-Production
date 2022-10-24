import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Table,
  Accordion,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import SideNavBar from '../components/SideNavBar';
import AllBill from '../components/AllBill';
import scrapers from '../utilities/scrapers';

const AllDashboard = () => {
  /* states for item filtering */
  const [office, setOffice] = useState('Select an Office');
  const [action, setAction] = useState('Select a Status');
  const [status, setStatus] = useState('Select an Action');

  const [measures, setMeasures] = useState([]);

  // TODO get year and type from filters
  useEffect(() => {
    scrapers
      .scrapeAll(2022, 'hb')
      .then(initialMeasures => {
        setMeasures(initialMeasures.scrapedData);
      });
  });

  useEffect(() => {
    document.title = 'DOE Legislative Tracker - View All Bills/Measures';
  });

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="pt-3 text-center"><b>2022: All House Bills</b></h2>
      <Link className="d-flex justify-content-center pb-2" to="/view/DOE">View DOE-Tracked Bill/Measures</Link>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filter Options</Accordion.Header>
          <Accordion.Body>
            <Row className="pb-4">
              <Col>
                Bill # <br />
                <label htmlFor="Search by Bill #">
                  <input type="text" placeholder="Enter bill # here" />
                </label>
              </Col>
              <Col>
                Edit Date <br />
                <label htmlFor="Search by edit date">
                  <input type="text" placeholder="Enter date here" />
                </label>
              </Col>
              <Col>
                Sort by Hearing Date <br />
                <label htmlFor="Search by hearing date">
                  <input type="text" placeholder="Enter date here" />
                </label>
              </Col>
              <Col>
                Title <br />
                <label htmlFor="Search by title">
                  <input type="text" placeholder="Enter title here" />
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
            <th>DOE DB</th>
            <th>Bill / Resolution</th>
            <th>Committee</th>
            <th>Companion</th>
            <th>Introducer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{ measures?.length === 0 ? ' ' : measures?.map((bill) => <AllBill key={bill._id} bill={bill} />) }
        </tbody>
      </Table>
      { measures?.length === 0 ? <LoadingSpinner /> : ' ' }
    </div>
  );

  return (
    <div>
      <SideNavBar id="nav" />
      <div id="mainBody">
        <Row id="dashboard-screen">
          <Col>
            <Row id="dashboard-filter">{returnFilter()}</Row>
            <Row id="dashboard-list">{returnList()}</Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AllDashboard;
