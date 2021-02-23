const { GoogleSpreadsheet } = require('google-spreadsheet')

const addReferral = async (
  transactionId: string,
  referral: string,
  transactionStatus: string
) => {
  try {
    const credentials = JSON.parse(
      process.env.REACT_APP_REFERRAL_GOOGLE_API_KEY!
    )
    const SHEET_ID = process.env.REACT_APP_REFERRAL_GOOGLE_SHEET_ID
    const doc = new GoogleSpreadsheet(SHEET_ID)

    doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    await sheet.addRow({
      referral_id: referral,
      transaction_id: transactionId,
      transaction_status: transactionStatus,
    })
  } catch (err) {
    console.error(err)
  }
}

export default addReferral
