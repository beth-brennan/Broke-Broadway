'use strict'

const {db, models: {User} } = require('../server/db')
const Show = require('../server/db/models/Show');
const TicketOption = require('../server/db/models/TicketOption');

const aladdin = {
    name: 'Aladdin',
    type: 'Musical',
    image: 'https://dj1gd759w71sg.cloudfront.net/content/uploads/2021/04/ALD_SocialShareIcon_v3.jpeg',
    website: 'http://www.aladdinthemusical.com/',
    open_date: '2014-02-26',
    close_date: null,
    theater: 'New Amsterdam',
    address1: '214 W. 42nd St',
    address2: 'between 7th and 8th'
};
const beetlejuice = {
    name: 'Beetlejuice',
    type: 'Musical',
    image: 'https://beetlejuicebroadway.com/_img/preview-FB.jpg',
    website: 'https://beetlejuicebroadway.com/',
    open_date: '2022-07-10',
    close_date: null,
    theater: 'Marquis',
    address1: '210 W. 46th St',
    address2: 'between Broadway and 8th'
};
const comefromaway = {
    name: 'Come From Away',
    type: 'Musical',
    image: 'https://www.mtishows.com/sites/default/files/show/hero/000501_hero.jpg',
    website: 'https://comefromaway.com/',
    open_date: '2017-02-18',
    close_date: '2022-10-02',
    theater: 'Schoenfeld',
    address1: '236 W. 45th St',
    address2: 'between 7th and 8th'
};
const drive = {
    name: 'How I Learned to Drive',
    type: 'Play',
    image: 'https://i.ytimg.com/vi/Xkx9Yj0sdSk/maxresdefault.jpg',
    website: 'https://www.manhattantheatreclub.com/shows/2021-22-season/how-i-learned-to-drive/',
    open_date: '2022-03-29',
    close_date: '2022-07-10',
    theater: 'Samuel Friedman',
    address1: '261 W. 47th St',
    address2: 'between Broadway and 8th'
};
const hamilton = {
    name: 'Hamilton',
    type: 'Musical',
    image: 'https://www.victoriapalacetheatre.co.uk/imgs/shows/hamilton/generic/hamilton-title-treatment-large.jpg',
    website: 'https://hamiltonmusical.com/new-york/home/',
    open_date: '2015-07-13',
    close_date: null,
    theater: 'Richard Rodgers',
    address1: '226 W. 46th St',
    address2: 'between Broadway and 8th'
};
const cursed = {
    name: 'Harry Potter and the Cursed Child',
    type: 'Play',
    image: 'https://broadway.harrypottertheplay.com/content/uploads/2022/05/HP22_1640x856-compressed.jpg',
    website: 'https://broadway.harrypottertheplay.com/',
    open_date: '2018-03-16',
    close_date: null,
    theater: 'Lyric',
    address1: '213 W. 42nd St',
    address2: 'between 7th and 8th'
};
const moulin = {
    name: 'Moulin Rouge!',
    type: 'Musical',
    image: 'https://moulinrougemusical.com/wp-content/uploads/2021/01/MOULIN_ROUGE_HORIZONTAL-1200x628-1.jpg',
    website: 'https://moulinrougemusical.com/new-york/home/',
    open_date: '2019-06-28',
    close_date: null,
    theater: 'Hirschfeld',
    address1: '302 W. 45th St',
    address2: 'between 8th and 9th'
};
const akimbo = {
    name: 'Kimberly Akimbo',
    type: 'Musical',
    image: 'https://assets.playbill.com/playbill-covers/_1200x630_crop_center-center_82_none/kimberly-akimbo.png?mtime=1655413065',
    website: 'https://kimberlyakimbothemusical.com/',
    open_date: '2022-11-10',
    close_date: null,
    theater: 'Booth',
    address1: '222 W. 45th St',
    address2: 'between 7th and 8th'
};

const aladdinLottery = {
  type: 'Digital Lottery',
  price: 30,
  restrictions: 'Credit card only. Enter at  from 7 PM the day before until 8:30 AM on the day of the performance. Winners will have 60 minutes to pay for their tickets online. 2 tickets per person.',
  link: 'https://lottery.broadwaydirect.com/show/aladdin'
};

const comeFromAwayLottery = {
  type: 'Digital Lottery',
  price: 53,
  restrictions: 'Credit card only. Available for Tuesday, Wednesday, and Thursday performances. Enter two days before the performance, up to 10 AM for matinees and 3 PM for evenings. 2 tickets per person.',
  link: 'https://www.comefromawaylottery.com'
};

const comeFromAwayRush = {
  type: 'Rush',
  price: 38,
  restrictions: 'Cash or credit card. Available when the box office opens, subject to availability. 2 tickets per person.'
};

const comeFromAwaySRO = {
  type: 'Standing Room',
  price: 32,
  restrictions: 'Cash or credit card accepted. Available when the show is sold out. 2 tickets per person.'
};

const driveStudent = {
  type: "Student Rush",
  price: 30,
  restrictions: 'Cash or credit card. Open only to current students. Available when the box office opens, subject to availability. 2 tickets per ID.'
};

const driveRush = {
  type: "Digital Rush",
  price: 35,
  restrictions: 'Credit card only. Available via TodayTix mobile app from 10 AM until sold out. 2 tickets per person.',
  link: 'https://todaytix.com'
};

const driveYoung = {
  type: "Young People",
  price: 30,
  restrictions: '30 Under 35. Cash or credit card. Open to anyone under 35 years old. Tickets can be purchased in advance. Sign up for free ahead of time.',
  link: 'https://www.manhattantheatreclub.com/season-tickets/30-under-35/'
};

const hamiltonLottery = {
  type: "Digital Lottery",
  price: 10,
  restrictions: 'Enter beginning at 10am Friday the week before the performance until 12pm Thursday the week before the performance. Winners are notified between 12pm and 4pm Thursday the week before the performance. Winners have 2 hours to purchase tickets. 2 tickets per person.',
  link: 'https://HamiltonBroadway.com/lottery'
};

const cursedLottery = {
  type: "Digital Lottery",
  price: 40,
  restrictions: 'Credit card only. Lottery tickets are only sold for both parts together. Enter via TodayTix mobile app beginning at 12:01 AM on Friday until 1pm for performances the following week. Winners are notified via push notification and email by 5pm Friday. Winners will have 60 minutes to pay for their tickets online. 2 tickets per person.',
  link: 'https://todaytix.com'
};

const moulinLottery = {
  type: "Digital Lottery",
  price: 34,
  restrictions: 'Credit card only. Enter beginning two days prior until 10am the day before the performance. Winners are notified by 11am the day before the performance. Tickets must be purchased by 3pm the day before the performance. 2 tickets per person.',
  link: 'https://www.luckyseat.com/shows/moulinrouge!themusical-newyork'
};

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const usersCreated = await Promise.all([
    User.create({ email: 'cody@cody.com', password: '12345' }),
    User.create({ email: 'murphy@murphy.com', password: '12345' }),
  ])

  // Creating Shows
const aladdinShow = await Show.create(aladdin);
const comefromawayShow = await Show.create(comefromaway);
const driveShow = await Show.create(drive);
const hamiltonShow = await Show.create(hamilton);
const cursedShow = await Show.create(cursed);
const moulinShow = await Show.create(moulin);
await Show.create(beetlejuice);
await Show.create(akimbo);

// Creating Ticket Options
const aladdinTicket = await TicketOption.create(aladdinLottery);
const comeFromAwayTicket1 = await TicketOption.create(comeFromAwayLottery);
const comeFromAwayTicket2 = await TicketOption.create(comeFromAwayRush);
const comeFromAwayTicket3 = await TicketOption.create(comeFromAwaySRO);
const driveTicket1 = await TicketOption.create(driveStudent);
const driveTicket2 = await TicketOption.create(driveRush);
const driveTicket3 = await TicketOption.create(driveYoung);
const hamiltonTicket = await TicketOption.create(hamiltonLottery);
const cursedTicket = await TicketOption.create(cursedLottery);
const moulinTicket = await TicketOption.create(moulinLottery);

// Connecting tickets to shows
await aladdinTicket.setShow(aladdinShow);
await comeFromAwayTicket1.setShow(comefromawayShow);
await comeFromAwayTicket2.setShow(comefromawayShow);
await comeFromAwayTicket3.setShow(comefromawayShow);
await driveTicket1.setShow(driveShow);
await driveTicket2.setShow(driveShow);
await driveTicket3.setShow(driveShow);
await hamiltonTicket.setShow(hamiltonShow);
await cursedTicket.setShow(cursedShow);
await moulinTicket.setShow(moulinShow);

// Adding favorites
await usersCreated[0].setShows([aladdinShow, hamiltonShow, moulinShow])
await usersCreated[1].setShows([comefromawayShow, driveShow, cursedShow])

  console.log(`seeded successfully`)
  return {
    users: {
      cody: usersCreated[0],
      murphy: usersCreated[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
