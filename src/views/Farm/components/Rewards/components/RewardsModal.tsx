import React, { useCallback } from 'react'

import BigNumber from 'bignumber.js'
import styled from 'styled-components'

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

import Split from 'components/Split'

import useAirdrop from 'hooks/useAirdrop'

const RewardsModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {

  const { claimableQuantity, onClaimAirdrop } = useAirdrop();

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

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Claim INDEX 🎁" />
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
        <StyledDescriptionContainer>
          <StyledDescriptionHeader>
            🦉 INDEX has arrived!
          </StyledDescriptionHeader>
          <StyledDescription>
            Thank you for being an early supporter of our crypto indices!
          </StyledDescription>
        </StyledDescriptionContainer>
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
  line-height: 54px;
  margin-bottom: 15px;
  margin-top: 15px;
  text-align: center;
  &:visited {
    color: ${props => props.theme.colors.primary.light};
  }
`

const StyledDescriptionContainer = styled.div`
  margin-bottom: 15px;
  text-align: center;
`

const StyledDescriptionHeader = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 24px;
  font-weight: 600;
  &:visited {
    color: ${props => props.theme.colors.gray};
  }
`

const StyledDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  &:visited {
    color: ${props => props.theme.colors.gray};
  }
`

export default RewardsModal
