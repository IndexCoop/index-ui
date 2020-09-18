import React, { useCallback, useMemo } from 'react'

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
  Separator
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'

const WalletModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {

  const { account, reset } = useWallet()
  const {
    yamV2Balance,
    yamV3Balance
  } = useBalances()

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
          <Box row justifyContent="center">
            <FancyValue
              icon="🍠"
              label="YAM balance"
              value={getDisplayBalance(yamV2Balance)}
            />
          </Box>
          <Box row justifyContent="center">
            <FancyValue
              icon={<span role="img" style={{ opacity: 0.5 }} >🍠</span>}
              label="YAMV2 balance"
              value={getDisplayBalance(yamV3Balance)}
            />
          </Box>
        </Split>
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

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

export default WalletModal