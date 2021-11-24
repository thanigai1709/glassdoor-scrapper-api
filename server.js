const axios = require('axios')
const cheerio = require('cheerio')
const targetUrl =
  'https://www.glassdoor.co.in/Reviews/Excrin-Think-Labs-Chennai-Reviews-EI_IE1971807.0,17_IL.18,25_IM1067.htm'

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', async function (req, res) {
  axios
    .get(targetUrl)
    .then((page) => {
      const $ = cheerio.load(page.data);
      const companyDetails = $('#EiReviewsContainer h1.eiReviews__EIReviewsPageStyles__newPageHeader').html();
      const overalReview = $('#EiReviewsContainer h2[data-test="overallReviewCount"]').html();
      const ratingHTML = $(
        '#EmpStats .v2__EIReviewsRatingsStylesV2__ratingInfo',
      ).html()
      const rating = $(
        '#EmpStats .v2__EIReviewsRatingsStylesV2__ratingNum',
      ).html()
      console.log("console added");
      res.send({companyDetails, rating, ratingHTML, overalReview })
    })
    .catch((err) => {
      res.status(502).send(err)
    })
})

app.listen(PORT, () => {
  console.log(`Scrapper running on PORT ${PORT}`);
})
