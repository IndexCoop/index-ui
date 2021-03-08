import React, { useState } from 'react'
import styled from 'styled-components'
import DotIcon from 'assets/dotvertical.svg'

const ExchangeSelector: React.FC<any> = ({ setIsIssuance }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <StyledCard>
      <StyledIndicatorsContainer onClick={() => setIsOpen(!isOpen)}>
        <img alt='dot' src={DotIcon} />
      </StyledIndicatorsContainer>
      {isOpen && (
        <StyledMenu>
          <CustomDropdownOption>
            <StyledOption
              onClick={() => {
                setIsIssuance(false)
                setIsOpen(false)
              }}
            >
              Trade on Uniswap(default)
            </StyledOption>
            <StyledOption
              onClick={() => {
                setIsIssuance(true)
                setIsOpen(false)
              }}
            >
              Exchange issue
            </StyledOption>
          </CustomDropdownOption>
        </StyledMenu>
      )}
    </StyledCard>
  )
}

const StyledCard = styled.div`
  position: absolute;
  top: 0;
  left: 310px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`
const CustomDropdownOption = styled.div`
  width: 200px;
  margin: 10px;
  overflow: hidden;
`

const StyledOption = styled.div`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  margin-bottom: 5px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

const StyledMenu = styled.div`
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
  width: 200px;
`
const StyledIndicatorsContainer = styled.div`
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: 7px;
  width: 20px;
  padding: 9px 0px;
  margin-bottom: 10px;
  & div {
    padding: 10px 0px;
  }
`

const StyledMenuList = styled.div`
  overflow: hidden;
  width: 200px;
`

export default ExchangeSelector
