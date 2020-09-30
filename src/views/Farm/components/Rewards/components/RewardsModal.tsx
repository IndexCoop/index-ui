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

import useBalances from 'hooks/useBalances'

const RewardsModal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
}) => {

  /* TODO: Replace these with INDEX claim balances */
  const {
    yamV3Balance
  } = useBalances()

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Claim INDEX 🎁" />
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
        <StyledDescriptionContainer>
          <StyledDescriptionHeader>
            INDEX has arrived!
          </StyledDescriptionHeader>
          <StyledDescription>
            Thank you for being an early supporter of crypto indices!
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