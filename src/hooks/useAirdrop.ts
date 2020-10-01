import { useContext } from 'react'

import { AirdropContext } from 'contexts/Airdrop'

const usePrices = () => {
  return { ...useContext(AirdropContext) }
}

export default usePrices
