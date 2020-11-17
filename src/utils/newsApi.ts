const newsContent = [
  {
    image: 'https://miro.medium.com/max/1400/1*jGrGl4jcZ_uUQZ3xDM-Ntw.png',
    title: 'Index Coop October Recap',
    author: 'Kiba',
    readTime: '5 minute read',
    link: 'https://medium.com/indexcoop/index-coop-october-update-d6e004136bb5',
  },
  {
    image:
      'https://pbs.twimg.com/profile_banners/1312497976883904512/1602012492/1500x500',
    title: 'How to Capture Intrinsic Productivity in an Index Fund',
    author: 'Over analyser',
    readTime: '4 minute read',
    link:
      'https://overanalyser.medium.com/how-to-capture-intrinsic-productivity-in-an-index-fund-18e6d88db776',
  },
  {
    image:
      'https://cdn.substack.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F886aa0e0-20dc-490c-892e-d5ecd2495e26_1280x720.jpeg',
    title: 'View From the Nest #1',
    author: 'DarkForestCapital',
    readTime: '5 minute read',
    link: 'https://indexcoop.substack.com/p/view-from-the-nest-1',
  },
]

const fetchNews = () => {
  return newsContent
}

export default fetchNews
