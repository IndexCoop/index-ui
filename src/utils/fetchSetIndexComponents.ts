import { camelCase } from 'lodash'

const proxyPrefixURL = 'https://cors-anywhere.herokuapp.com/'
const baseURL = 'https://api.tokensets.com/public/v2/portfolios/'
const apiURL = proxyPrefixURL + baseURL

export default (index: string) => {
  return fetch(apiURL + index)
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
