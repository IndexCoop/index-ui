import React from 'react'
import styled from 'styled-components'

const DpiZerionPromo: React.FC = () => {
  return (
    <StyledToastContainer>
      <StyledToastImage
        alt='Defi Pulse Icon'
        src='https://set-core.s3.amazonaws.com/img/social_trader_set_icons/defi_pulse_index_set.svg'
      />
      <StyledToastText>Buy DPI on Zerion, earn 5% cashback!</StyledToastText>
    </StyledToastContainer>
  )
}

const StyledToastContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`

const StyledToastText = styled.p`
  font-size: 20px;
`

const StyledToastImage = styled.img`
  margin-right: 20px;
`

export default DpiZerionPromo
