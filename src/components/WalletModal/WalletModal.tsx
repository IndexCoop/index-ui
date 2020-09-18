import React, { useCallback, useMemo } from 'react'
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
  Spacer
} from 'react-neu'

import FancyValue from 'components/FancyValue'
import useBalances from 'hooks/useBalances'

const WalletModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {

  const { account, reset } = useWallet()
  const { yamV3Balance } = useBalances()

  const yamV3DisplayBalance = useMemo(() => {
    if (yamV3Balance) {
      return numeral(yamV3Balance).format('0.00a')
    } else {
      return '--'
    }
  }, [yamV3Balance])

  const handleSignOut = useCallback(() => {
    reset()
  }, [reset])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="My Wallet" />
      <ModalContent>
        <Box alignItems="center" column>
          <FancyValue
            icon="🍠"
            label="YAM balance"
            value={yamV3DisplayBalance}
          />
        </Box>
        <Spacer />
        <Button
          href={`https://etherscan.io/address/${account}`}
          text="View on Etherscan"
          variant="secondary"
        />
      </ModalContent>
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