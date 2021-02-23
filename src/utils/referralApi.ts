import cred from 'serviceAccount.json'
const { GoogleSpreadsheet } = require('google-spreadsheet')

const addReferral = async (transactionId: string, referral: string) => {
  const SHEET_ID = process.env.REACT_APP_REFERRAL_GOOGLE_SHEET_ID
  const doc = new GoogleSpreadsheet(SHEET_ID)

  try {
    doc.useServiceAccountAuth(cred)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    await sheet.addRow({
      referral_id: referral,
      transaction_id: transactionId,
    })
  } catch (err) {
    console.error(err)
  }
}

export default addReferral
