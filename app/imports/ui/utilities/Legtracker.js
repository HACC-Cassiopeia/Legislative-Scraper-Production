import axios from 'axios';

const scrapeMeasures = async (year, mt) => {
  try {
    const request = await axios.get(`/api/scrapeMeasures/${year}/${mt}`);
    return request.data;
  } catch {
    // eslint-disable-next-line no-console
    console.log('error: please use year and measure type as params');
    return null;
  }
};

const scrapeUpcomingHearings = async () => {
  try {
    const request = await axios.get('/api/scrapeUpcomingHearings');
    return request.data;
  } catch {
    // eslint-disable-next-line no-console
    console.log('error!');
    return null;
  }
};

export default { scrapeMeasures, scrapeUpcomingHearings };