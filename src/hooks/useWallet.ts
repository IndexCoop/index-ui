import { useContext } from 'react'

import { WalletContext } from 'contexts/Wallet'

const useWallet = () => {
  return { ...useContext(WalletContext) }
}

export default useWallet
