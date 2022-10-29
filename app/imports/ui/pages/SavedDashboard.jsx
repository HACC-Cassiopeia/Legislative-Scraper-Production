import React, { useEffect, useState } from 'react';
import { Accordion, Col, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { SavedMeasures } from '../../api/savedMeasures/SavedMeasuresCollection';
import SavedBill from '../components/SavedBill';
import LoadingSpinner from '../components/LoadingSpinner';
import DesktopSideBar from '../components/SideNavBar/DesktopSideBar';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Dashboard = () => {
  const [office, setOffice] = useState('');
  const [action, setAction] = useState('');
  const [chamber, setChamber] = useState('');
  const [billNum, setBillNum] = useState('');
  const [statusDate, setStatusDate] = useState('');
  const [hearingDate, setHearingDate] = useState('');
  const [title, setTitle] = useState('');

  const [filteredMeasures, setFilteredMeasures] = useState([]);

  // TODO: Find a way to save bills into filteredMeasures
  const { ready, bills } = useTracker(() => {
    const subscription = SavedMeasures.subscribeMeasureSaved();
    const rdy = subscription.ready();
    const billItem = SavedMeasures.find({}, {}).fetch();
    return {
      bills: billItem,
      ready: rdy,
    };
  }, false);

  useEffect(() => {
    document.title = 'DOELT - View DOE Bills/Measures';
  }, []);

  useEffect(() => {
    let filtered = bills;
    if (chamber) {
      filtered = filtered.filter(function (obj) { return obj.statusHorS === chamber; });
    }
    if (billNum) {
      filtered = filtered.filter(function (obj) { return obj.code.toLowerCase().includes(billNum.toLowerCase()); });
    }
    if (title) {
      filtered = filtered.filter(function (obj) { return obj.measureTitle.toLowerCase().includes(title.toLowerCase()); });
    }
    setFilteredMeasures(filtered);
  }, [chamber, billNum, title, statusDate]);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="pt-3 text-center"><b>DOE Bills/Measures</b></h2>
      <Link className="d-flex justify-content-center pb-2" to="/view/all">View All Bill/Measures</Link>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Filter Options
            </Accordion.Header>
            <Accordion.Body>
              <Row className="py-3 px-3">
                <Col>
                  Bill Code <br />
                  <label htmlFor="Search by Bill Code">
                    <input
                      type="text"
                      placeholder="Enter bill code here"
                      onChange={e => setBillNum(e.target.value)}
                    />
                  </label>
                </Col>
                <Col>
                  Title <br />
                  <label htmlFor="Search by title">
                    <input
                      type="text"
                      placeholder="Enter title"
                      onChange={e => setTitle(e.target.value)}
                    />
                  </label>
                </Col>
                <Col>
                  Hearing Date <br />
                  <label htmlFor="Search by hearing date">
                    <input
                      type="text"
                      placeholder="Enter date here"
                      onChange={e => setHearingDate(e.target.value)}
                    />
                  </label>
                </Col>
                <Col>
                  Status Date <br />
                  <label htmlFor="Search by status date">
                    <input
                      type="text"
                      placeholder="Enter date here"
                      onChange={e => setStatusDate(e.target.value)}
                    />
                  </label>
                </Col>
              </Row>
              <Row className="py-3 px-3">
                <Col>
                  Chamber <br />
                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="secondary"
                    title={chamber === '' ? 'Select a Chamber' : chamber}
                    onSelect={(e) => setChamber(e)}
                  >
                    <Dropdown.Item eventKey="S">S</Dropdown.Item>
                    <Dropdown.Item eventKey="H">H</Dropdown.Item>
                  </DropdownButton>
                </Col>
                <Col>
                  Office <br />
                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="secondary"
                    title={office === '' ? 'Select an Office' : office}
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
                  Action <br />
                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="secondary"
                    title={action === '' ? 'Select an Action' : action}
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
                <Col />
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const returnList = () => (
    <div style={{ height: '100vh', overflowY: 'visible' }}>
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
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          { bills.length === 0 ? ' ' : bills.map((bill) => <SavedBill key={bill._id} bill={bill} />) }
        </tbody>
      </Table>
      { bills.length === 0 ? <div className="d-flex justify-content-center">No bills/measures found in DOE database</div> : '' }
    </div>
  );

  return (
    <Col>
      <DesktopSideBar page="bills" />
      <div id="mainBody">
        <Row id="dashboard-screen">
          <Col>
            <Row id="dashboard-filter">{returnFilter()}</Row>
            { ready ? <Row id="dashboard-list">{returnList()}</Row> : '' }
            { ready ? '' : <LoadingSpinner /> }
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default Dashboard;
