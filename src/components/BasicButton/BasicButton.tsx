import React from 'react'
import styled from 'styled-components'

interface BasicButtonProps {
  text: string
  isDisabled?: boolean
  isPending?: boolean
}

const BuyTokenPlaceholder: React.FC<BasicButtonProps> = ({
  text,
  isDisabled,
  isPending,
}: BasicButtonProps) => {
  if (isDisabled) {
    return <StyledDisabledButton>{text}</StyledDisabledButton>
  }

  if (isPending) {
    return <StyledPendingButton>Please wait</StyledPendingButton>
  }

  return <StyledSubmitButton>{text}</StyledSubmitButton>
}

const StyledDisabledButton = styled.button`
  font-size: 20px;
  border-radius: 20px;
  width: 90%;
  padding: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.grey[600]};
  color: ${(props) => props.theme.colors.white};
  border: none;
  cursor: pointer;
`

const StyledPendingButton = styled.button`
  font-size: 20px;
  border-radius: 20px;
  width: 90%;
  padding: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.white};
  border: none;
  cursor: pointer;
`

const StyledSubmitButton = styled.button`
  font-size: 20px;
  border-radius: 20px;
  width: 90%;
  padding: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.white};
  border: none;
  cursor: pointer;
`

export default BuyTokenPlaceholder
