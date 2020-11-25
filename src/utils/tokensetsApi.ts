import { camelCase } from 'lodash'

// const baseURL = 'https://api.tokensets.com/public'
const baseURL = `https://fc9e2e276de78afd4806f40ae53dc656.tokensets.com/public`

export const fetchTokenBuySellData = (
  id: string,
  isBuyOrder: boolean,
  requestQuantity: number | string,
  currencyId: string,
  activeField: 'set' | 'currency'
) => {
  const buyOrSellRoute = isBuyOrder ? 'buy_price' : 'sell_price'
  const coinOrSetRoute = id.toLowerCase() === 'index' ? 'coins' : 'portfolio'
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
