import React, { useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import { ClipboardPlus } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import BillResolutionDetails from '../components/billDetails/BillResolutionDetails';
import DesktopSideBarCollapsed from '../components/SideNavBar/DesktopSideBarCollapsed';
import TestimonyTracker from '../components/testimony/TestimonyTracker';
import CreateTestimonyModal from '../components/testimony/CreateTestimonyModal';

const BillResolutionTracker = () => {
  const { _code } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row>
      <DesktopSideBarCollapsed page="bill" />
      <div id="mainBody" style={{ marginLeft: 90 }}>
        <div className="py-3">
          <Button onClick={handleShow} className="d-flex justify-content-center align-items-center gap-2 mb-3" style={{ marginLeft: 90 }}>
            <ClipboardPlus />
            <div>Create New Testimony</div>
          </Button>
          <CreateTestimonyModal
            show={show}
            _code={_code}
            handleClose={handleClose}
          />
          <BillResolutionDetails />
        </div>
        <TestimonyTracker _code={_code} />
      </div>
    </Row>
  );
};

export default BillResolutionTracker;
