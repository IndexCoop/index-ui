import { ethTokenAddress } from 'constants/ethContractAddresses'

const baseURL = 'https://api.coingecko.com/api/v3'

export const fetchHistoricalTokenMarketData = (
  id: string,
  baseCurrency = 'usd'
) => {
  const coingeckoMaxTokenDataUrl =
    baseURL +
    `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=max&interval=daily`
  const coingeckoHourlyTokenDataUrl =
    baseURL + `/coins/${id}/market_chart?vs_currency=${baseCurrency}&days=90`

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

export const fetchCurrentPrice = async (
  address: string,
  baseCurrency = 'usd'
): Promise<number> => {
  console.log(address)
  if (address === 'ETH') {
    console.log('tets')
    const getPriceUrl =
      baseURL + `/simple/price/?ids=ethereum&vs_currencies=${baseCurrency}`
    const resp = await fetch(getPriceUrl)
    const data = await resp.json()
    if (!data['ethereum']) return 0
    return data['ethereum'][baseCurrency]
  }

  const getPriceUrl =
    baseURL +
    `/simple/token_price/ethereum/?contract_addresses=${address}&vs_currencies=${baseCurrency}`

  const resp = await fetch(getPriceUrl)
  const data = await resp.json()
  if (!data[address.toLowerCase()]) return 0
  return data[address.toLowerCase()][baseCurrency]
}
