import React, { useState, useEffect } from 'react';
import Legtracker from './utilities/Legtracker';

/*
 * Need to add error handling
 */

// could use props to pass down 'year' and 'hb' to scraper
const Test = () => {
  // initial state is empty array
  const [measures, setMeasures] = useState([]);
  const [hearings, setHearings] = useState([]);
  const [billDetails, setBillDetails] = useState({});
  // gets data from capitol site
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('rendered');
    Legtracker
      .scrapeMeasures(23, 'hb')
      .then(initialMeasures => {
        setMeasures(initialMeasures.scrapedData);
      });
    Legtracker
      .scrapeUpcomingHearings()
      .then(initialHearings => {
        setHearings(initialHearings.upcomingHearings);
      });
    Legtracker
      .scrapeBillDetails('HaffB', 137, 2022)
      .then(initialBillDet => {
        setBillDetails(initialBillDet);
      });
  }, []);
  // eslint-disable-next-line no-console
  return (
    <div className="d-flex flex-column align-items-center">
      <div>
        Measures: {measures.length}
      </div>
      <div>
        Upcoming hearings:
        {hearings.map(hearing => (<div key={hearing.dateTime}>{hearing.committee} , {hearing.dateTime}</div>))}
      </div>
      <div>
        {JSON.stringify(billDetails)};
      </div>
    </div>
  );
};

export default Test;
