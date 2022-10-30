import React from 'react';
import { Row, Button } from 'react-bootstrap';
import { ClipboardPlus } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import BillResolutionDetails from '../components/billDetails/BillResolutionDetails';
import DesktopSideBar from '../components/SideNavBar/DesktopSideBar';
import TestimonyTracker from '../components/testimony/TestimonyTracker';
import CreateTestimonyModal from '../components/testimony/CreateTestimonyModal';

const BillResolutionTracker = () => {
  const { _code } = useParams();

  return (
    <Row>
      <DesktopSideBar page="bill" />
      <div id="mainBody">
        <div className="py-3">
          <Button className="d-flex justify-content-center align-items-center gap-2 mb-3">
            <ClipboardPlus />
            <div>Create New Testimony</div>
          </Button>
          <CreateTestimonyModal />
          <BillResolutionDetails />
        </div>
        <TestimonyTracker _code={_code} />
      </div>
    </Row>
  );
};

export default BillResolutionTracker;
