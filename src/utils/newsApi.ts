const { GoogleSpreadsheet } = require('google-spreadsheet')

const newsContent = [
  {
    image:
      'https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fb3ce60ca-2d25-4d98-8f07-c9cee24b0d6c_1188x680.png',
    title: 'View From the Nest #7',
    author: 'DarkForestCapital',
    readTime: '5 minute read',
    link: 'https://indexcoop.substack.com/p/view-from-the-nest-7',
  },
  {
    image:
      'https://cdn.substack.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F1b2fedcd-32fd-41a3-a795-0250e8c47656_2880x1620.png',
    title: 'View From the Nest #6',
    author: 'DarkForestCapital',
    readTime: '7 minute read',
    link: 'https://indexcoop.substack.com/p/view-from-the-nest-6',
  },
  {
    image: 'https://pbs.twimg.com/media/Eofx3xYVgAAjFhk?format=jpg&name=large',
    title: 'View From the Nest #5',
    author: 'DarkForestCapital',
    readTime: '5 minute read',
    link: 'https://indexcoop.substack.com/p/view-from-the-nest-5',
  },
  {
    image: 'http://i3.ytimg.com/vi/NITWj6NqTuU/maxresdefault.jpg',
    title: 'Talking Crypto With Regan Bozman (Index Core Contributor)',
    author: 'Gabriel Haines',
    readTime: '1 hour podcast',
    link: 'https://www.youtube.com/watch?v=NITWj6NqTuU&feature=youtu.be',
  },
  {
    image: 'https://miro.medium.com/max/1400/0*c1iwaImJm9AYc4iw',
    title: 'View From the Nest #4 (Weekly Summary)',
    author: 'DarkForestCapital',
    readTime: '5 minute read',
    link:
      'https://indexcoop.substack.com/p/view-from-the-nest-4-monthly-review',
  },
  {
    image: 'https://miro.medium.com/max/1400/0*c1iwaImJm9AYc4iw',
    title: 'Digging into Divergence Loss',
    author: 'Overanalyser',
    readTime: '5 minute read',
    link:
      'https://overanalyser.medium.com/digging-into-divergence-loss-30a1ec17c2f5',
  },
  {
    image: 'https://miro.medium.com/max/1400/0*c1iwaImJm9AYc4iw',
    title: 'View From the Nest #3 (Weekly Summary)',
    author: 'DarkForestCapital',
    readTime: '5 minute read',
    link: 'https://indexcoop.substack.com/p/view-from-the-nest-3',
  },
  {
    image: 'https://miro.medium.com/max/1400/0*c1iwaImJm9AYc4iw',
    title: 'View From the Nest #2 (Weekly Summary)',
    author: 'DarkForestCapital',
    readTime: '5 minute read',
    link: 'https://indexcoop.substack.com/p/view-from-the-nest-2',
  },
  {
    image: 'https://miro.medium.com/max/1400/1*jGrGl4jcZ_uUQZ3xDM-Ntw.png',
    title: 'Index Coop October Recap',
    author: 'Kiba',
    readTime: '5 minute read',
    link: 'https://medium.com/indexcoop/index-coop-october-update-d6e004136bb5',
  },
  {
    image: 'https://miro.medium.com/max/1400/0*c1iwaImJm9AYc4iw',
    title: 'The Top Secret, Open Source, Composable, Master Plan',
    author: 'Overanalyser',
    readTime: '5 minute read',
    link:
      'https://overanalyser.medium.com/the-top-secret-open-source-composable-master-plan-5957b974574a',
  },
  {
    image: 'http://i3.ytimg.com/vi/H64oDYVoffQ/maxresdefault.jpg',
    title: 'Talking Crypto With Over Analyser',
    author: 'Gabriel Haines',
    readTime: '1 hour podcast',
    link: 'https://www.youtube.com/watch?v=H64oDYVoffQ&feature=youtu.be',
  },
  {
    image: 'https://miro.medium.com/max/1400/1*eJwOjiCrBvKIl-1SEp8s6Q.png',
    title: 'Rebalancing $DPI',
    author: 'Overanalyser',
    readTime: '4 minute read',
    link: 'https://overanalyser.medium.com/rebalancing-dpi-b074a792bc70',
  },
  {
    image: 'https://miro.medium.com/max/1400/0*c1iwaImJm9AYc4iw',
    title: 'View From the Nest #1 (Weekly Summary)',
    author: 'DarkForestCapital',
    readTime: '5 minute read',
    link: 'https://indexcoop.substack.com/p/view-from-the-nest-1',
  },
  {
    image: 'https://miro.medium.com/max/1400/0*c1iwaImJm9AYc4iw',
    title: 'How to Capture Intrinsic Productivity in an Index Fund',
    author: 'Overanalyser',
    readTime: '4 minute read',
    link:
      'https://overanalyser.medium.com/how-to-capture-intrinsic-productivity-in-an-index-fund-18e6d88db776',
  },
  {
    image: 'https://miro.medium.com/max/1400/0*c1iwaImJm9AYc4iw',
    title: 'Introducing the Index Cooperative',
    author: 'The Index Coop',
    readTime: '7 minute read',
    link:
      'https://medium.com/indexcoop/introducing-the-index-cooperative-a4eaaf0bcfe2',
  },
]

const fetchNews = async () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_SEEHTS_API_KEY
  const SHEET_ID = process.env.REACT_APP_NEWS_GOOGLE_SHEET_ID
  const doc = new GoogleSpreadsheet(SHEET_ID)
  doc.useApiKey(API_KEY)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  let rows = await sheet.getRows()
  let news = rows.map((row: any) => {
    return {
      image: row['image'],
      title: row['title'],
      author: row['author'],
      readTime: row['readTime'],
      link: row['link'],
    }
  })
  return news.reverse()
}

export default fetchNews
