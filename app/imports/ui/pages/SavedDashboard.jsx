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

  const { ready, bills } = useTracker(() => {
    const subscription = SavedMeasures.subscribeMeasureSaved();
    const rdy = subscription.ready();
    const billItem = SavedMeasures.find({}, {}).fetch();
    return {
      bills: billItem,
      ready: rdy,
    };
  }, false);

  const textBoxStyle = {
    borderRadius: '10px',
    borderWidth: '1px',
    paddingLeft: '8px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingRight: '8px',
  };

  useEffect(() => {
    document.title = 'DOELT - View DOE Bills/Measures';
  }, []);

  // set bills in filteredMeasures when finished loading
  useEffect(() => {
    if (ready) {
      setFilteredMeasures(bills);
    }
  }, [ready]);

  // for filtering
  useEffect(() => {
    let filtered = bills;
    console.log(bills);
    if (chamber) {
      filtered = filtered.filter(function (obj) { return obj.statusHorS === chamber; });
    }
    if (billNum) {
      filtered = filtered.filter(function (obj) { return obj.code.toLowerCase().includes(billNum.toLowerCase()); });
    }
    if (title) {
      filtered = filtered.filter(function (obj) { return obj.measureTitle.toLowerCase().includes(title.toLowerCase()); });
    }
    if (statusDate) {
      filtered = filtered.filter(function (obj) { return obj.statusDate.includes(statusDate); });
    }
    // filter option fields from modal, first need to check if populated
    if (hearingDate) {
      filtered = filtered.filter(function (obj) { return obj.hearingDate ? obj.hearingDate.includes(hearingDate) : false; });
    }
    if (office) {
      filtered = filtered.filter(function (obj) { return obj.office ? obj.office.includes(office) : false; });
    }
    if (action) {
      filtered = filtered.filter(function (obj) { return obj.doeAction ? obj.doeAction.toLowerCase().includes(action.toLowerCase()) : false; });
    }
    setFilteredMeasures(filtered);
  }, [chamber, billNum, title, statusDate, office, action, hearingDate]);

  const returnFilter = () => (
    <div className="pb-3">
      <h1 className="mt-4 text-center mb-2"><b>DOE Bills/Measures</b></h1>
      <Row>
        <Col className="d-flex justify-content-center">
          <Link className="d-flex justify-content-center mb-3 small" to="/view/all">
            View All Bill/Measures
          </Link>
        </Col>
      </Row>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Filter Options
            </Accordion.Header>
            <Accordion.Body>
              <Row className="py-3 px-3">
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by Bill Code">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Bill Number
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      style={textBoxStyle}
                      placeholder="Enter bill number"
                      onChange={e => setBillNum(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by title">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Bill Title
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      style={textBoxStyle}
                      placeholder="Relating to..."
                      onChange={e => setTitle(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by hearing date">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Hearing Date
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      style={textBoxStyle}
                      placeholder="Enter date here"
                      onChange={e => setHearingDate(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by status date">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Status Date
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      style={textBoxStyle}
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
                    <Dropdown.Item eventKey="BOE">BOE</Dropdown.Item>
                    <Dropdown.Item eventKey="OCID">OCID</Dropdown.Item>
                    <Dropdown.Item eventKey="OFO">OFO</Dropdown.Item>
                    <Dropdown.Item eventKey="OFS">OFS</Dropdown.Item>
                    <Dropdown.Item eventKey="OHE">OHE</Dropdown.Item>
                    <Dropdown.Item eventKey="OITS">OITS</Dropdown.Item>
                    <Dropdown.Item eventKey="OSIP">OSIP</Dropdown.Item>
                    <Dropdown.Item eventKey="OSSS">OSSS</Dropdown.Item>
                    <Dropdown.Item eventKey="OTM">OTM</Dropdown.Item>
                    <Dropdown.Item eventKey="SUPT">SUPT</Dropdown.Item>
                  </DropdownButton>
                </Col>
                <Col>
                  Action <br />
                  <label htmlFor="Search by status date">
                    <input
                      type="text"
                      placeholder="Enter action here"
                      onChange={e => setAction(e.target.value)}
                    />
                  </label>
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
      <Table striped className="border border-2">
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
          { filteredMeasures.length === 0 ? ' ' : filteredMeasures.map((bill) => <SavedBill key={bill._id} bill={bill} />) }
        </tbody>
      </Table>
      { filteredMeasures.length === 0 ? <div className="d-flex justify-content-center">No bills/measures found in DOE database</div> : '' }
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
