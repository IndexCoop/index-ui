import { camelCase } from 'lodash'

const tokensetsUrl = process.env.REACT_APP_TOKENSETS_URL

export const fetchSetComponents = (set: string) => {
  const requestUrl = `${tokensetsUrl}/public/v2/portfolios/${set}`

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

      return formatComponents(components)
    })
    .catch((error) => console.log(error))
}

export const fetchHistoricalTokenMarketData = (
  id: string,
  baseCurrency = 'usd'
) => {
  const requestUrl = `${tokensetsUrl}/v2/fund_historicals/${id}?currency=${baseCurrency}&beta=true&interval=month`

  return fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => {
      const { prices, dates } = response
      return {
        prices: prices.map((item: any, index: number) => [dates[index], item]),
      }
    })
    .catch((error) => console.log(error))
}

export const fetchSetComponentsBeta = (set: string) => {
  const requestUrl = `${tokensetsUrl}/v2/funds/${set}?beta=true`

  return fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => {
      if (!response?.fund?.components) {
        // undocumented API endpoint. Throw error if not expected response format
        throw new Error('Invalid API response from Set Protocol service')
      }
      const {
        fund: {
          components,
          market_cap: marketCap,
          id,
          name,
          symbol,
          address,
          image,
        },
      } = response
      return {
        components: formatComponents(components),
        marketCap,
        id,
        name,
        symbol,
        address,
        image,
      }
    })
    .catch((error) => console.log(error))
}

function formatComponents(components: any) {
  return components.map((component: any) => {
    const camelCasedComponent = Object.keys(component).reduce(
      (comp: any, k: string) => ({
        ...comp,
        [camelCase(k)]: component[k],
      }),
      {}
    )
    return camelCasedComponent
  })
}
