import React, { useCallback } from 'react'
import styled from 'styled-components'
import {
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

import Modal from 'components/CustomModal'
import useBuySell from 'hooks/useBuySell'
import useMediaQuery from 'hooks/useMediaQuery'
import transakImage from 'assets/transak_logo.png'

const transakSDK = require('@transak/transak-sdk').default

const getTransakLauncher = (isMobile: boolean, buySellToken: string) => {
  let transak = new transakSDK({
    apiKey: process.env.REACT_APP_TRANSAK_API_KEY,
    environment: process.env.REACT_APP_ENVIRONMENT?.toUpperCase(), // STAGING or PRODUCTION
    defaultCryptoCurrency: buySellToken,
    themeColor: '0063ed',
    hostURL: window.location.origin,
    widgetHeight: '550px',
    widgetWidth: isMobile ? '350px' : '450px',
  })

  transak.init()
}

const TransakModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { buySellToken } = useBuySell()
  const { isMobile } = useMediaQuery()

  const onOpenTransakLauncher = useCallback(() => {
    getTransakLauncher(isMobile as boolean, buySellToken)
    onDismiss && onDismiss()
  }, [isMobile, buySellToken])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text={(<StyledHeaderImage src={transakImage} />) as any} />
      <ModalContent>
        <StyledTransakDescription>
          Transak allows you to easily buy the DeFi Pulse Index with GBP, EUR or
          INR. To pay with Transak you will need to complete a short KYC form
          and have an ethereum wallet address ready to receive DPI tokens.
        </StyledTransakDescription>
        <StyledTransakDescription>
          To ensure the best experience, please turn off any ad-blocking
          extensions.
        </StyledTransakDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text='Cancel' variant='secondary' />
        <Button onClick={onOpenTransakLauncher} text='Buy DPI' />
      </ModalActions>
    </Modal>
  )
}

const StyledHeaderImage = styled.img`
  max-width: 200px;
`

const StyledTransakDescription = styled.p`
  line-height: 1.5;
  font-size: 18px;
`

export default TransakModal
