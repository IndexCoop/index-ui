const baseURL = 'https://api.coingecko.com/api/v3'

export const fetchHistoricalTokenMarketData = (
  id: string,
  startTime: number | string,
  endTime: number | string,
  baseCurrency = 'usd'
) => {
  const startTimeUnix = new Date(startTime).valueOf();
  const endTimeUnix = new Date(endTime).valueOf();
  const coingeckoHistoricalTokenDataUrl = baseURL +
    `/coins/${id}/market_chart/range` +
    `?vs_currency=${baseCurrency}&from=${startTimeUnix}&to=${endTimeUnix}`

  return fetch(coingeckoHistoricalTokenDataUrl)
    .then(response => response.json())
    .then(response => {
      /** @notes from API docs
       * Minutely data will be used for duration within 1 day
       * Hourly data will be used for duration between 1 day and 90 days
       * Daily data will be used for duration above 90 days.
      */
      const {
        prices,
        market_caps: marketcaps,
        total_volumes: volumes,
      } = response
      return { prices, marketcaps, volumes }
    })
    .catch(error => console.log(error));
}
