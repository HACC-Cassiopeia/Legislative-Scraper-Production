import axios from 'axios';

const scrapeMeasures = async (year, mt) => {
  try {
    const request = await axios.get(`/api/scrapeMeasures/${year}/${mt}`);
    return request.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
};

const scrapeUpcomingHearings = async () => {
  try {
    const request = await axios.get('/api/scrapeUpcomingHearings');
    return request.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error!');
    return null;
  }
};

export default { scrapeMeasures, scrapeUpcomingHearings };
