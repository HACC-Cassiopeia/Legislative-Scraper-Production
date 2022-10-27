import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Table,
  Accordion,
  Dropdown,
  DropdownButton,
  Pagination,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import SideNavBar from '../components/SideNavBar';
import AllBill from '../components/AllBill';
import LegTracker from '../utilities/Legtracker';

const AllDashboard = () => {
  /* states for item filtering */

  const [office, setOffice] = useState('Select an Office');
  const [action, setAction] = useState('Select a Status');
  const [status, setStatus] = useState('Select an Action');
  const [measures, setMeasures] = useState([]);

  // TODO get year and type from filters
  useEffect(() => {
    LegTracker.scrapeMeasures(2022, 'hb').then((initialMeasures) => {
      setMeasures(initialMeasures.scrapedData);
      console.log(initialMeasures.scrapedData[0]);
    });
    document.title = 'DOE Legislative Tracker - View All Bills/Measures';
  }, []);
  const rowNumber = 50;
  const totalPageIndex = Math.ceil(measures.length / rowNumber);
  console.log(totalPageIndex);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [firstIndex, setFirstIndex] = useState(
    currentPage * rowNumber - rowNumber,
  );
  const [lastIndex, setLastIndex] = useState(currentPage * rowNumber);

  const items = [];

  const handleClick = (page) => {
    setCurrentPage(page);

    setFirstIndex(page * rowNumber - rowNumber);
    setLastIndex(page * rowNumber);
    console.log({ firstIndex });
    console.log({ lastIndex });
  };

  for (let number = 1; number <= totalPageIndex; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handleClick(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="pt-3 text-center">
        <b>2022: All House Bills</b>
      </h2>
      <Link className="d-flex justify-content-center pb-2" to="/view/DOE">
        View DOE-Tracked Bill/Measures
      </Link>
      <Pagination>{items}</Pagination>
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
      <div style={{ textAlign: 'center' }} />
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
          {measures.length === 0
            ? ''
            : measures
              .map((bill) => <AllBill key={bill._id} bill={bill} />)
              .slice(firstIndex, lastIndex)}
        </tbody>
      </Table>
      {measures.length === 0 ? <LoadingSpinner /> : ''}
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
