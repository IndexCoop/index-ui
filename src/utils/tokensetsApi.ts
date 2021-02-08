import { camelCase } from 'lodash'

const baseURL = process.env.REACT_APP_TOKENSETS_API

export const fetchTokenBuySellData = (
  id: string,
  isBuyOrder: boolean,
  requestQuantity: number | string,
  currencyId: string,
  activeField: 'set' | 'currency'
) => {
  const buyOrSellRoute = isBuyOrder ? 'buy_price' : 'sell_price'
  const coinOrSetRoute = id.toLowerCase() === 'index' ? 'coins' : 'portfolios'
  const requestUrl = `${baseURL}/v2/${coinOrSetRoute}/${id}/${buyOrSellRoute}?quantity=${requestQuantity}&currency=${currencyId}&input_type=${activeField}`

  return fetch(requestUrl)
    .then((response) => response.json())
    .then((json) => json.buy_price || json.sell_price || {})
    .catch((error) => console.log(error))
}

export const fetchSetComponents = (set: string) => {
  const requestUrl = `${baseURL}/v2/portfolios/${set}`

  return fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => {
      if (!response?.portfolio?.components) {
        // undocumented API endpoint. Throw error if not expected response format
        throw new Error('Invalid API response from Set Protocol service')
      }
      const {
        portfolio: { components },
      } = response
      const formattedComponents = components.map((component: any) => {
        const camelCasedComponent = Object.keys(component).reduce(
          (comp: any, k: string) => ({
            ...comp,
            [camelCase(k)]: component[k],
          }),
          {}
        )
        return camelCasedComponent
      })

      return formattedComponents
    })
    .catch((error) => console.log(error))
}

export const fetchHistoricalTokenMarketData = (
  id: string,
  baseCurrency = 'usd'
) => {
  const baseURL = 'https://api.tokensets.com/v2/fund_historicals'
  const requestUrl =
    baseURL + `/${id}` + `?currency=${baseCurrency}&beta=true&interval=month`

  return fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => {
      /** @notes from API docs
       * Minutely data will be used for duration within 1 day
       * Hourly data will be used for duration between 1 day and 90 days
       * Daily data will be used for duration above 90 days.
       */
      const { prices, dates } = response
      return {
        prices: prices.map((item: any, index: number) => [dates[index], item]),
      }
    })
    .catch((error) => console.log(error))
}

export const fetchSetComponentsBeta = (set: string) => {
  // const requestUrl = `${baseURL}/v2/portfolios/${set}`

  const requestUrl = `https://api.tokensets.com/v2/funds/${set}?beta=true`

  return fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => {
      if (!response?.fund?.components) {
        // undocumented API endpoint. Throw error if not expected response format
        throw new Error('Invalid API response from Set Protocol service')
      }
      const {
        fund: { components, market_cap: marketCap },
      } = response
      const formattedComponents = components.map((component: any) => {
        const camelCasedComponent = Object.keys(component).reduce(
          (comp: any, k: string) => ({
            ...comp,
            [camelCase(k)]: component[k],
          }),
          {}
        )
        return camelCasedComponent
      })

      return { components: formattedComponents, marketCap }
    })
    .catch((error) => console.log(error))
}
