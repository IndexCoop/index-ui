const { GoogleSpreadsheet } = require('google-spreadsheet')

const trackReferral = async (
  referral: string,
  transactionId: string,
  transactionStatus: string,
  currencyId: string,
  productId: string,
  isBuyOrder: boolean
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
      product_id: productId,
      currency_id: currencyId,
      is_buy_order: isBuyOrder,
    })
  } catch (err) {
    console.error(err)
  }
}

export default trackReferral
