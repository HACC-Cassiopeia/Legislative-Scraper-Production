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
import LegTracker from '../utilities/Legtracker';

const AllDashboard = () => {
  /* states for item filtering */
  const [status, setStatus] = useState('');
  const [billNum, setBillNum] = useState('');
  const [statusDate, setStatusDate] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('hb');
  const [year, setYear] = useState('2022');

  const [measures, setMeasures] = useState([]);
  const [filteredMeasures, setFilteredMeasures] = useState([]);
  const [loading, setLoading] = useState(false);

  /* When the filtered data needs to call the api */
  useEffect(() => {
    setLoading(true);
    Legtracker
      .scrapeMeasures(year, type)
      .then(initialMeasures => {
        setMeasures(initialMeasures.scrapedData);
        console.log(initialMeasures.scrapedData[0]);

        setFilteredMeasures(initialMeasures.scrapedData);
        setBillNum('');
        setStatus('');
        setStatusDate('');
        setTitle('');
        setLoading(false);

        document.title = 'DOE Legislative Tracker - View All Bills/Measures';
      });
  }, [year, type]);

  /* When the filtered data can just search the current array */
  useEffect(() => {
    let filtered = measures;
    if (status) {
      filtered = filtered.filter(function (obj) { return obj.statusHorS === status; });
    }
    if (billNum) {
      filtered = filtered.filter(function (obj) { return obj.code.toLowerCase().includes(billNum.toLowerCase()); });
    }
    if (title) {
      filtered = filtered.filter(function (obj) { return obj.measureTitle.toLowerCase().includes(title.toLowerCase()); });
    }
    if (statusDate) {
      filtered = filtered.filter(function (obj) { return obj.statusDate.toLowerCase().includes(statusDate.toLowerCase()); });
    }
    setFilteredMeasures(filtered);
  }, [status, billNum, title, statusDate]);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="pt-3 text-center"><b>2022: All House Bills</b></h2>
      <Link className="d-flex justify-content-center pb-2" to="/view/DOE">View DOE-Tracked Bill/Measures</Link>
      <div id="filter-border">
        <Row className="py-3 px-3">
          <Col>
            Filter Options:
          </Col>
          <Col>
            Bill Type <br />
            <DropdownButton
              id="dropdown-basic-button"
              variant="secondary"
              title={type}
              onSelect={(e) => setType(e)}
            >
              <Dropdown.Item eventKey="hb">hb</Dropdown.Item>
              <Dropdown.Item eventKey="sb">sb</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            Year <br />
            <DropdownButton
              id="dropdown-basic-button"
              variant="secondary"
              title={year}
              onSelect={(e) => setYear(e)}
            >
              <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
              <Dropdown.Item eventKey="2021">2021</Dropdown.Item>
              <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
              <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
              <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
              <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
              <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
              <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
              <Dropdown.Item eventKey="2014">2014</Dropdown.Item>
              <Dropdown.Item eventKey="2013">2013</Dropdown.Item>
              <Dropdown.Item eventKey="2012">2012</Dropdown.Item>
              <Dropdown.Item eventKey="2011">2011</Dropdown.Item>
              <Dropdown.Item eventKey="2010">2010</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col />
          <Col />
        </Row>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              More Filter Options
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
                  Status Date <br />
                  <label htmlFor="Search by status date">
                    <input
                      type="text"
                      placeholder="Enter date here"
                      onChange={e => setStatusDate(e.target.value)}
                    />
                  </label>
                </Col>
                <Col>
                  Title <br />
                  <label htmlFor="Search by title">
                    <input
                      type="text"
                      placeholder="Enter title here"
                      onChange={e => setTitle(e.target.value)}
                    />
                  </label>
                </Col>
                <Col>
                  Status <br />
                  <DropdownButton
                    id="dropdown-basic-button"
                    variant="secondary"
                    title={status === '' ? 'Select a Status' : status}
                    onSelect={(e) => setStatus(e)}
                  >
                    <Dropdown.Item eventKey="S">S</Dropdown.Item>
                    <Dropdown.Item eventKey="H">H</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const returnList = () => (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <Table striped>
        <thead style={{ zIndex: 200 }}>
          <tr>
            <th>DOE DB</th>
            <th>Bill / Resolution</th>
            <th>Status</th>
            <th>Introducer(s)</th>
            <th>Referral</th>
            <th>Companion</th>
          </tr>
        </thead>
        <tbody>
          { filteredMeasures.length === 0 || loading ? ' ' : filteredMeasures.map((bill) => <AllBill key={bill._id} bill={bill} />) }
        </tbody>
      </Table>
      { filteredMeasures.length === 0 || loading ? <LoadingSpinner /> : ' ' }
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
