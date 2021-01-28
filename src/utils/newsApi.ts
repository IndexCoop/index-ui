const { GoogleSpreadsheet } = require('google-spreadsheet')

const fetchNews = async () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
  const SHEET_ID = process.env.REACT_APP_NEWS_GOOGLE_SHEET_ID
  const doc = new GoogleSpreadsheet(SHEET_ID)

  let rows = []
  try {
    doc.useApiKey(API_KEY)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    rows = await sheet.getRows()
  } catch (err) {
    console.error(err)
  }

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
