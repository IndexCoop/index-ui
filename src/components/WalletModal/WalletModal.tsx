import React, { useCallback } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { toast } from 'react-toastify'

import numeral from 'numeral'
import {
  Box,
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Separator,
  Spacer,
} from 'react-neu'

import Modal from 'components/CustomModal'
import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'
import useLocalStorage from 'hooks/useLocalStorage'

const WalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { reset } = useWallet()
  const {
    indexBalance,
    dpiBalance,
    uniswapEthDpiLpBalance,
    stakedUniswapEthDpiLpBalance,
  } = useBalances();

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('walletconnect');
    reset()
    toast.success('You\'ve successfully signed out.')
    onDismiss && onDismiss()
  }, [reset, onDismiss])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text='My Wallet' />
      <ModalContent>
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'Owl',
                src: 'https://index-dao.s3.amazonaws.com/owl.png'
              }}
              label='INDEX balance'
              value={getDisplayBalance(indexBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'Defi Pulse Icon',
                src: 'https://set-core.s3.amazonaws.com/img/social_trader_set_icons/defi_pulse_index_set.svg'
              }}
              label='DPI balance'
              value={getDisplayBalance(dpiBalance)}
            />
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt:'Uniswap LP Icon',
                src:'https://set-core.s3.amazonaws.com/img/coin-icons/uni_lp.svg'
              }}
              label='Uniswap ETH/DPI LP balance'
              value={getDisplayBalance(uniswapEthDpiLpBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'Staked Uniswap LP Icon',
                src: 'https://set-core.s3.amazonaws.com/img/coin-icons/uni_lp.svg'
              }}
              iconStyles={{ opacity: 0.5 }}
              label='Staked Uniswap ETH/DPI LP'
              value={getDisplayBalance(stakedUniswapEthDpiLpBalance)}
            />
          </Box>
        </Split>
      </ModalContent>
      <Separator />
      <ModalActions>
        <Button onClick={onDismiss} text='Cancel' variant='secondary' />
        <Button onClick={handleSignOut} text='Sign Out' />
      </ModalActions>
    </Modal>
  )
}

export default WalletModal
