import React from 'react'

import PulseLoader from 'react-spinners/PulseLoader'

import styled from 'styled-components'

interface SimpleButtonProps {
  text: string
  isDisabled?: boolean
  isPending?: boolean
  onClick?: (...args: any[]) => any
  buttonClassName?: string
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  text,
  isDisabled,
  isPending,
  onClick,
  buttonClassName,
}: SimpleButtonProps) => {
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

  return (
    <StyledSubmitButton onClick={onClick} className={buttonClassName}>
      {text}
    </StyledSubmitButton>
  )
}

const StyledDisabledButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.grey[500]};
`

const StyledPendingButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary.main};
`

const StyledSubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary.main};
  cursor: pointer;
`

export default SimpleButton
