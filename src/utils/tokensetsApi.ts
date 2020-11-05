const baseURL = 'https://api.tokensets.com/public'

export const fetchTokenBuySellData = (
  id: string,
  isBuyOrder: boolean,
  requestQuantity: number | string,
  currencyId: string,
  activeField: 'set' | 'currency'
) => {
  const buyOrSellRoute = isBuyOrder ? 'buy_price' : 'sell_price'
  const requestUrl = `${baseURL}/v2/portfolios/${id}/${buyOrSellRoute}?quantity=${requestQuantity}&currency=${currencyId}&input_type=${activeField}`

  return fetch(requestUrl)
    .then((response) => {
      console.log('response is', response)
      return response
    })
    .catch((error) => console.log(error))
}
