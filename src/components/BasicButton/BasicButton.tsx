import React from 'react'
import styled from 'styled-components'
import PulseLoader from 'react-spinners/PulseLoader'

interface BasicButtonProps {
  text: string
  isDisabled?: boolean
  isPending?: boolean
  onClick?: (...args: any[]) => any
}

const BuyTokenPlaceholder: React.FC<BasicButtonProps> = ({
  text,
  isDisabled,
  isPending,
  onClick,
}: BasicButtonProps) => {
  if (isDisabled) {
    return <StyledDisabledButton disabled>{text}</StyledDisabledButton>
  }

  if (isPending) {
    return (
      <StyledPendingButton disabled>
        <PulseLoader color='white' size={8} />
      </StyledPendingButton>
    )
  }

  return <StyledSubmitButton onClick={onClick}>{text}</StyledSubmitButton>
}

const StyledDisabledButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 20px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.grey[500]};
`

const StyledPendingButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 20px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary.main};
`

const StyledSubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 20px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary.main};
  cursor: pointer;
`

export default BuyTokenPlaceholder
