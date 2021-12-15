import React from 'react'

import styled from 'styled-components'

import { dpiTokenImage } from 'constants/productTokens'

interface ToastProps {
  closeToast?: () => void
}

const DpiZerionPromo: React.FC<ToastProps> = ({ closeToast }) => {
  return (
    <StyledToastContainer>
      <StyledToastImage
        alt='Defi Pulse Icon'
        src={dpiTokenImage}
      />
      <StyledToastText
        href='https://app.zerion.io/invest/asset/DPI-0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b'
        target='_blank'
      >
        Buy DPI on Zerion, earn 5% cashback!
      </StyledToastText>
      <StyledCloseButton onClick={closeToast}>✕</StyledCloseButton>
    </StyledToastContainer>
  )
}

const StyledToastContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`

const StyledToastText = styled.a`
  font-size: 20px;
  margin-right: 40px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey[600]};
  &:hover {
    color: ${(props) => props.theme.colors.grey[900]};
  }
`

const StyledToastImage = styled.img`
  height: 60px;
  margin-right: 20px;
`

const StyledCloseButton = styled.span`
  position: absolute;
  height: 20px;
  right: 10px;
  color: ${(props) => props.theme.colors.grey[400]};
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`

export default DpiZerionPromo
