import React, { useCallback } from 'react'

import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

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
  Spacer
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'
import useVesting from 'hooks/useVesting'

const WalletModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {

  const { reset } = useWallet()
  const {
    yamV2Balance,
    yamV3Balance
  } = useBalances()

  const {
    vestedDelegatorRewardBalance,
    vestedMigratedBalance,
  } = useVesting()

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  const handleSignOut = useCallback(() => {
    reset()
  }, [reset])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="My Wallet" />
      <ModalContent>
        <Split>
          <Box row>
            <FancyValue
              icon="🍠"
              label="YAM balance"
              value={getDisplayBalance(yamV3Balance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >🍠</span>}
              label="YAMV2 balance"
              value={getDisplayBalance(yamV2Balance)}
            />
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              icon="🎁"
              label="Vested YAM (Delegator)"
              value={getDisplayBalance(vestedDelegatorRewardBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon="🦋"
              label="Vested YAM (Migrated)"
              value={getDisplayBalance(vestedMigratedBalance)}
            />
          </Box>
        </Split>
        <Spacer />
      </ModalContent>
      <Separator />
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button
          onClick={handleSignOut}
          text="SignOut"
        />
      </ModalActions>
    </Modal>
  )
}

export default WalletModal