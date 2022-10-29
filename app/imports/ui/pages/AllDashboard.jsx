import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Table,
  Accordion,
  Dropdown,
  DropdownButton,
  Pagination,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import AllBill from '../components/AllBill';
import LegTracker from '../utilities/Legtracker';
import DesktopSideBar from '../components/SideNavBar/DesktopSideBar';

const AllDashboard = () => {
  /* states for item filtering */
  const [chamber, setChamber] = useState('');
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
    LegTracker
      .scrapeMeasures(year, type)
      .then(initialMeasures => {
        setMeasures(initialMeasures.scrapedData);
        setFilteredMeasures(initialMeasures.scrapedData);
        setBillNum('');
        setChamber('');
        setStatusDate('');
        setTitle('');
        setLoading(false);

        document.title = 'DOELT - View All Bills/Measures';
      });
  }, [year, type]);

  /* When the filtered data can just search the current array */
  useEffect(() => {
    let filtered = measures;
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
      filtered = filtered.filter(function (obj) {
        const slash = obj.statusDate.search('/');
        const objDate = +`${obj.statusDate.substring(0, slash)}.${
          obj.statusDate.substring(slash + 1, obj.statusDate.substring(slash + 1).search('/') + obj.statusDate.substring(0, slash).length + 1)}`;
        console.log(`filter date: ${+statusDate} bill status date: ${objDate}`);
        return objDate === +statusDate;
      });
    }
    setFilteredMeasures(filtered);
  }, [chamber, billNum, title, statusDate]);

  const [rowNumber, setRowNumber] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(
    currentPage * rowNumber - rowNumber,
  );
  const [lastIndex, setLastIndex] = useState(currentPage * rowNumber);

  let items = [];

  const handleClick = (page) => {
    setCurrentPage(page);

    setFirstIndex(page * rowNumber - rowNumber);
    setLastIndex(page * rowNumber);
    console.log({ firstIndex });
    console.log({ lastIndex });
  };

  if (Math.ceil(filteredMeasures.length / rowNumber) > 20) {
    items = [];
    for (let number = 1; number <= 20; number++) {
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
    items.push(
      <Pagination.Item
        key="..."
      >
        ...
      </Pagination.Item>,
    );
  } else {
    items = [];
    for (let number = 1; number <= Math.ceil(filteredMeasures.length / rowNumber); number++) {
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
  }

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="pt-3 text-center">
        <b>{year}: All {type === 'hb' ? 'House' : 'Senate'} Bills</b>
      </h2>
      <Col className="d-flex justify-content-center">
        <Link className="pb-2" to="/view/DOE">
          View DOE Bill/Measures
        </Link>
      </Col>
      <div id="filter-border">
        <Row className="py-3 px-3">
          <Col>
            Options:
          </Col>
          <Col>
            Bill Type <br />
            <DropdownButton
              id="dropdown-basic-button"
              variant="secondary"
              title={type === 'hb' ? 'House Bills' : 'Senate Bills'}
              onSelect={(e) => setType(e)}
            >
              <Dropdown.Item eventKey="hb">House Bills</Dropdown.Item>
              <Dropdown.Item eventKey="sb">Senate Bills</Dropdown.Item>
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
              Filters
            </Accordion.Header>
            <Accordion.Body>
              <Row className="py-3 px-3">
                <Col>
                  Bill Number <br />
                  <label htmlFor="Search by Bill Code">
                    <input
                      type="text"
                      placeholder="Enter bill number"
                      onChange={e => setBillNum(e.target.value)}
                    />
                  </label>
                </Col>
                <Col>
                  Bill Title <br />
                  <label htmlFor="Search by title">
                    <input
                      type="text"
                      placeholder="Relating to..."
                      onChange={e => setTitle(e.target.value)}
                    />
                  </label>
                </Col>
                <Col>
                  Status Date <br />
                  <label htmlFor="Search by status date">
                    <input
                      type="date"
                      placeholder="Enter date here"
                      onChange={e => {
                        const month = e.target.value.substring(5, 7);
                        const day = e.target.value.substring(8);
                        setStatusDate(`${month}.${day}`);
                      }}
                    />
                  </label>
                  <br />
                  <ButtonGroup className="btn-group-sm">
                    <Button className="dateFilterButtons">Before</Button>
                    <Button className="dateFilterButtons">On</Button>
                    <Button className="dateFilterButtons">After</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const returnList = () => (
    <div style={{ height: '100vh', overflowY: 'visible' }}>
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
          { filteredMeasures.length === 0 || loading
            ? ''
            : filteredMeasures
              .map((bill) => <AllBill key={bill._id} bill={bill} />)
              .slice(firstIndex, lastIndex)}
        </tbody>
      </Table>
      { loading ? <LoadingSpinner /> : ''}
      <Col className="d-flex justify-content-center">
        <Pagination className="pt-3 mb-2" style={{ color: 'black' }}>{items}</Pagination>
      </Col>
      <Row className="d-flex justify-content-center text-center pb-3">
        {loading ? ' ' : `${filteredMeasures.length} Results`}
      </Row>
    </div>
  );

  return (
    <Col>
      <DesktopSideBar page="bills" />
      <div id="mainBody">
        <Row id="dashboard-screen">
          <Col>
            <Row id="dashboard-filter">{returnFilter()}</Row>
            <Row id="dashboard-list">{returnList()}</Row>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default AllDashboard;
