import { camelCase } from 'lodash'

const baseURL = 'https://api.tokensets.com/public/v2/portfolios/'

export default (index: string) => {
  return fetch(baseURL + index)
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
        return Object.keys(component).reduce(
          (camelCased: any, k: string) => ({
            ...camelCased,
            [camelCase(k)]: component[k],
          }),
          {}
        )
      })

      return formattedComponents
    })
    .catch((error) => console.log(error))
}
