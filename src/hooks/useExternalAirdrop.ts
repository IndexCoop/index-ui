import { useContext } from 'react'

import { ExternalAirdropContext } from 'contexts/ExternalAirdrop'

const usePrices = () => {
  return { ...useContext(ExternalAirdropContext) }
}

export default usePrices
