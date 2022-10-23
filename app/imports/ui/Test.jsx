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
  // gets data from capitol site
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('rendered');
    Legtracker
      .scrapeMeasures(2022, 'hb')
      .then(initialMeasures => {
        setMeasures(initialMeasures.scrapedData);
      });
    Legtracker
      .scrapeUpcomingHearings()
      .then(initialHearings => {
        setHearings(initialHearings.upcomingHearings);
      });
  }, []);
  // eslint-disable-next-line no-console
  return (
    <>
      <div>
        Measures: {measures.length}
      </div>
      <div>
        Upcoming hearings:
        {hearings.map(hearing => (<div key={hearing.dateTime}>{hearing.committee} , {hearing.dateTime}</div>))}
      </div>
    </>
  );
};

export default Test;
