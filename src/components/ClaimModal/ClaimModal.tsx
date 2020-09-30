import React, { useCallback } from 'react'

import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import numeral from 'numeral'
import {
  Box,
  Button,
  Input,
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

const ClaimModal: React.FC<ModalProps> = ({
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
      <ModalTitle text="Claim INDEX" />
      <ModalContent>
        <Split>
          <Box alignItems="center" justifyContent="center" row>
            <StyledTokenValue>
              {getDisplayBalance(yamV3Balance)} INDEX
            </StyledTokenValue>
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <StyledDescription>
          Enter an address you'd like to claim INDEX for. All claimed INDEX goes to the address inputted below.
        </StyledDescription>
        <Input
          placeholder="Enter Wallet Address"
        />
      </ModalContent>
      <Separator />
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Close"
          variant="secondary"
        />
        <Button
          onClick={onDismiss}
          text="Claim"
        />
      </ModalActions>
    </Modal>
  )
}

const StyledTokenValue = styled.p`
  color: ${props => props.theme.colors.primary.light};
  font-weight: 600;
  font-size: 54px;
  line-height: 32px;
  margin-bottom: 15px;
  margin-top: 15px;
  &:visited {
    color: ${props => props.theme.colors.primary.light};
  }
`

const StyledDescription = styled.p`
  color: ${props => props.theme.colors.white};
  margin-bottom: 35px;
  &:visited {
    color: ${props => props.theme.colors.white};
  }
`

export default ClaimModal