const baseURL = 'https://api.coingecko.com/api/v3'

export const fetchHistoricalTokenMarketData = (
  id: string,
  baseCurrency = 'usd'
) => {
  const coingeckoMaxTokenDataUrl =
    baseURL +
    `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=max&interval=daily`
  const coingeckoTwoDayTokenDataUrl =
    baseURL + `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=2`

  return Promise.all([
    fetch(coingeckoMaxTokenDataUrl),
    fetch(coingeckoTwoDayTokenDataUrl),
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      const prices = data[0].prices,
        dayPrices = data[1].prices,
        marketcaps = data[0].market_caps,
        volumes = data[0].total_volumes

      return { prices, dayPrices, marketcaps, volumes }
    })
    .catch((error) => console.log(error))
}
