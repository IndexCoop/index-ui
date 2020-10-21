import React, { useCallback } from 'react'

import BigNumber from 'utils/bignumber'
import styled from 'styled-components'

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
import Split from 'components/Split'

import useAirdrop from 'hooks/useAirdrop'

const RewardsModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { claimableQuantity, onClaimAirdrop } = useAirdrop()

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '0'
    }
  }, [])

  const handleClaimClick = useCallback(() => {
    onClaimAirdrop()
  }, [onClaimAirdrop])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text='Claim INDEX 🎁' />
      <ModalContent>
        <Split>
          <Box alignItems='center' justifyContent='center' row>
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
            <StyledEmoji
              src='https://index-dao.s3.amazonaws.com/owl.png'
              alt='Owl'
            />
            INDEX has arrived!
          </StyledDescriptionHeader>
          <StyledDescription>
            Thank you for being an early supporter of our crypto indices!
          </StyledDescription>
        </StyledDescriptionContainer>
      </ModalContent>
      <Separator />
      <ModalActions>
        <Button onClick={onDismiss} text='Close' variant='secondary' />
        <Button onClick={handleClaimClick} text='Claim' />
      </ModalActions>
    </Modal>
  )
}

const StyledTokenValue = styled.p`
  color: ${(props) => props.theme.colors.primary.light};
  font-weight: 600;
  font-size: 54px;
  line-height: 54px;
  margin-bottom: 15px;
  margin-top: 15px;
  text-align: center;
  &:visited {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

const StyledDescriptionContainer = styled.div`
  margin-bottom: 15px;
  text-align: center;
`

const StyledDescriptionHeader = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.gray};
  font-size: 24px;
  font-weight: 600;
  &:visited {
    color: ${(props) => props.theme.colors.gray};
  }
`

const StyledEmoji = styled.img`
  height: 24px;
  text-align: center;
  min-width: 24px;
  margin-right: 12px;
`
const StyledDescription = styled.p`
  color: ${(props) => props.theme.colors.gray};
  &:visited {
    color: ${(props) => props.theme.colors.gray};
  }
`

export default RewardsModal
