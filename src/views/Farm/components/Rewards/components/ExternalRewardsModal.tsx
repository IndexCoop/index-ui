import React, { useCallback } from 'react'

import BigNumber from 'bignumber.js'
import styled from 'styled-components'

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

import Split from 'components/Split'

import useExternalAirdrop from 'hooks/useExternalAirdrop'

const RewardsModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {

  const { externalAddress, claimableQuantity, onClaimAirdrop, onUpdateAddress } = useExternalAirdrop()

  console.log('external address is', externalAddress);
  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  const handleClaimClick = useCallback(() => {
    onClaimAirdrop();
  }, [onClaimAirdrop])

  const handleAddressChange = useCallback((e: any) => {
    if (e?.target?.value) onUpdateAddress(e.target.value)
  }, [onUpdateAddress])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Claim INDEX" />
      <ModalContent>
        <Split>
          <Box alignItems="center" justifyContent="center" row>
            <StyledTokenValue>
              {getDisplayBalance(claimableQuantity)} INDEX
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
          onChange={handleAddressChange}
        />
        <Spacer size="sm" />
        <Button
          onClick={onDismiss}
          text="Check Airdrop Quantity"
          variant="secondary"
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
          onClick={handleClaimClick}
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
  color: ${props => props.theme.colors.gray};
  margin-bottom: 35px;
  &:visited {
    color: ${props => props.theme.colors.gray};
  }
`

export default RewardsModal
