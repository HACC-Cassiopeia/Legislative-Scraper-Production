import { WebApp } from 'meteor/webapp';
import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();
/*
 *   mandatory parameters:
 *
 *      year:        2017 (goes back to 2009 as earliest date)
 *      report:      deadline
 *      active:      true (necessary only if measuretype is hb or sb)
 *      rpt_type:
 *      measuretype: [hb|sb|hr|sr|hcr|scr|gm]
 *
 *   Measure Type:
 *      hb:  House Bills
 *      sb:  Senate Bills
 *      hr:  House Resos
 *      sr:  Senate Resos
 *      hcr: House Concurrent Resos
 *      scr: Senate Concurrent Resos
 *      gm:  Governer's Messages
 */

app.get('/api/scrapeAll/:year/:mt', async (req, res) => {
  const year = req.params.year;
  const mt = req.params.mt;
  const url = `https://www.capitol.hawaii.gov/advreports/advreport.aspx?year=${year}&report=deadline&active=true&rpt_type=&measuretype=${mt}`;
  // connects to page
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const scrapedData = [];

  let index = 0;
  // if it's less than 10, add a zero in front to conform with format
  const getIndex = (num) => (num < 10 ? `0${index}` : index);

  $('tr', html).each(function () {
    index += 1;

    const code = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_HyperLink1`)
      .text();
    const measurePdfUrl = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_HyperLink2`)
      .attr('href');
    const measureArchiveUrl = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_HyperLink1`)
      .attr('href');
    const measureTitle = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_Label7`)
      .text();
    const reportTitle = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_Label1`)
      .text();
    const description = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_Label2`)
      .text();
    const statusHorS = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_Label3`)
      .text();
    const statusDescription = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_Label4`)
      .text();
    const statusDate = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_Label5`)
      .text();
    const introducer = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_Label27`)
      .text();
    const currentReferral = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_Label9`)
      .text();
    const companion = $(this)
      .find(`#GridViewReports_ctl${getIndex(index)}_Label6`)
      .find('a')
      .text();

    if (`${code}`.length !== 0) {
      // eslint-disable-next-line no-console
      scrapedData.push({
        code: `${code}`,
        measurePdfUrl: `${measurePdfUrl}`,
        measureArchiveUrl: `${measureArchiveUrl}`,
        measureTitle: `${measureTitle}`,
        reportTitle: `${reportTitle}`,
        description: `${description}`,
        statusHorS: `${statusHorS}`,
        statusDescription: `${statusDescription}`,
        statusDate: `${statusDate}`,
        introducer: `${introducer}`,
        currentReferral: `${currentReferral}`,
        companion: `${companion}`,
      });
    }
  });
  res.status(200).json({ scrapedData });
});

app.get('/api/scrapeUpcomingHearings', async (req, res) => {
  const url = 'https://www.capitol.hawaii.gov/upcominghearings.aspx';
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const upcomingHearings = [];
  let index = 1;

  const getIndex = (num) => (num < 10 ? `0${index}` : index);

  $('table#ctl00_ContentPlaceHolderCol1_GridView1 > tbody > tr', html)
    .has('td') // checks if 'td' element is inside of 'tr' element
    .each(function () {
      index += 1;

      const committee = $(this)
        .find(`span#ctl00_ContentPlaceHolderCol1_GridView1_ctl${getIndex(index)}_Label17`)
        .first()
        .text();
      const measure = $(this)
        .find(`#ctl00_ContentPlaceHolderCol1_GridView1_ctl${getIndex(index)}_HyperLink`)
        .text();
      const dateTime = $(this)
        .find(`#ctl00_ContentPlaceHolderCol1_GridView1_ctl${getIndex(index)}_Label27`)
        .first()
        .text();
      const room = $(this)
        .find(`#ctl00_ContentPlaceHolderCol1_GridView1_ctl${getIndex(index)}_Label27`)
        .last()
        .text();
      const noticeURL = $(this)
        .find(`#ctl00_ContentPlaceHolderCol1_GridView1_ctl${getIndex(index)}_HyperLink2`)
        .attr('href');
      const noticePdfURL = $(this)
        .find(`#ctl00_ContentPlaceHolderCol1_GridView1_ctl${getIndex(index)}_HyperLink3`)
        .attr('href');
      const youtubeURL = $(this)
        .find(`#ctl00_ContentPlaceHolderCol1_GridView1_ctl${getIndex(index)}_streamLink`)
        .attr('href');

      upcomingHearings.push({
        committee: committee,
        dateTime: dateTime,
        room: room,
        measure: measure,
        noticeURL: noticeURL,
        noticePdfURL: noticePdfURL,
        youtubeURL: youtubeURL,
      });
    });

  res.status(200).json({ upcomingHearings });

});

WebApp.connectHandlers.use(app);
