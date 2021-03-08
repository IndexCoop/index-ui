import { useContext } from 'react'

import { ExchangeIssuanceContext } from 'contexts/ExchangeIssuance'

const useExchangeIssuance = () => {
  return { ...useContext(ExchangeIssuanceContext) }
}

export default useExchangeIssuance
