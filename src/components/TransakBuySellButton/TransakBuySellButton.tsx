import React, { useCallback } from 'react'

import { RoundedButton } from 'components/RoundedButton'
import useBuySell from 'hooks/useBuySell'
import useMediaQuery from 'hooks/useMediaQuery'

const transakSDK = require('@transak/transak-sdk').default

const getTransakLauncher = (isMobile: boolean, buySellToken: string) => {
  let transak = new transakSDK({
    apiKey: process.env.REACT_APP_TRANSAK_API_KEY,
    environment: process.env.REACT_APP_ENVIRONMENT?.toUpperCase(), // STAGING or PRODUCTION
    defaultCryptoCurrency: buySellToken,
    themeColor: '0063ed',
    redirectURL: 'http://localhost:3000',
    hostURL: window.location.origin,
    widgetHeight: '550px',
    widgetWidth: isMobile ? '350px' : '450px',
  })

  transak.init()

  transak.on(transak.ALL_EVENTS, (data: any) => {
    console.log(data)
  })
}

/**
 * TransakBuySellButton - Displays a button used in the buy sell flow.
 * The button can be used to:
 * 1. Prompt user login to complete a transaction
 * 2. Prompt the user to approve input currency to Uniswap Router
 * 3. Execute the trade transaction
 */
const TransakBuySellButton: React.FC = () => {
  const { buySellToken } = useBuySell()

  const { isMobile } = useMediaQuery()

  const onOpenTransakLauncher = useCallback(() => {
    return getTransakLauncher(isMobile as boolean, buySellToken)
  }, [isMobile, buySellToken])

  return (
    <RoundedButton
      isDisabled={false}
      isPending={false}
      text='Buy with Cash'
      onClick={onOpenTransakLauncher}
    />
  )
}

export default TransakBuySellButton
