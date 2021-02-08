import React, { useCallback } from 'react'
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
import transakImage from '../../assets/transak_logo.png'

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
      <ModalTitle text={(<img src={transakImage} />) as any} />
      <ModalContent>
        <p>Transak allows you to buy DPI with GBP, EUR or IDR.</p>
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text='Cancel' variant='secondary' />
        <Button onClick={onOpenTransakLauncher} text='Transak' />
      </ModalActions>
    </Modal>
  )
}

export default TransakModal
