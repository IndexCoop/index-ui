import React, { useCallback } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { toast } from 'react-toastify'

import numeral from 'numeral'
import {
  Box,
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Separator,
  Spacer,
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'

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
              icon='🦉'
              label='INDEX balance'
              value={getDisplayBalance(indexBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={
                <img
                  alt='defi pulse icon'
                  src='https://set-core.s3.amazonaws.com/img/social_trader_set_icons/defi_pulse_index_set.svg'
                />
              }
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
              icon={
                <img
                  alt='uniswap lp icon'
                  src='https://set-core.s3.amazonaws.com/img/coin-icons/uni_lp.svg'
                  style={{ width: '40px', height: '40px' }}
                />
              }
              label='Uniswap ETH DPI LP balance'
              value={getDisplayBalance(uniswapEthDpiLpBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={
                <img
                  alt='staked uniswap lp icon'
                  src='https://set-core.s3.amazonaws.com/img/coin-icons/uni_lp.svg'
                  style={{ width: '40px', height: '40px', opacity: 0.5 }}
                />
              }
              label='Staked Uniswap ETH DPI LP balance'
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
