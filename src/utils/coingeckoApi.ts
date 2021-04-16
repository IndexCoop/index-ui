const baseURL = 'https://api.coingecko.com/api/v3'

export const fetchHistoricalTokenMarketData = (
  id: string,
  baseCurrency = 'usd'
) => {
  const coingeckoMaxTokenDataUrl =
    baseURL +
    `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=max&interval=daily`
  const coingeckoHourlyTokenDataUrl =
    baseURL + `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=30`

  return Promise.all([
    fetch(coingeckoMaxTokenDataUrl),
    fetch(coingeckoHourlyTokenDataUrl),
  ])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      const prices = data[0].prices,
        hourlyPrices = data[1].prices,
        marketcaps = data[0].market_caps,
        volumes = data[0].total_volumes

      return { prices, hourlyPrices, marketcaps, volumes }
    })
    .catch((error) => console.log(error))
}
