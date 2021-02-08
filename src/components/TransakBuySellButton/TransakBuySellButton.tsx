import React, { useCallback } from 'react'
import styled from 'styled-components'

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
    // fiatCurrency: 'GBP',
    // redirectURL: 'http://localhost:3000',
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
 * TransakBuySellButton - Displays a button used to initiate a Transak buy sell flow
 */
const TransakBuySellButton: React.FC = () => {
  const { buySellToken } = useBuySell()

  const { isMobile } = useMediaQuery()

  const onOpenTransakLauncher = useCallback(() => {
    return getTransakLauncher(isMobile as boolean, buySellToken)
  }, [isMobile, buySellToken])

  return (
    <StyledButtonWrapper>
      <p>- or -</p>
      <RoundedButton
        isDisabled={false}
        isPending={false}
        text='Buy with Cash'
        onClick={onOpenTransakLauncher}
      />
    </StyledButtonWrapper>
  )
}

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default TransakBuySellButton
