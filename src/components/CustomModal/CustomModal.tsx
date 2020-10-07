import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Surface } from 'react-neu'

export interface ModalProps {
  isOpen?: boolean,
  onDismiss?: () => void
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onDismiss,
}) => {
  if (isOpen) {
    return (
      <StyledModalWrapper>
        <StyledModalBackdrop onClick={onDismiss} />
        <StyledResponsiveWrapper>
          <Surface detached elevation={2}>
            {children}
          </Surface>
        </StyledResponsiveWrapper>
      </StyledModalWrapper>
    )
  }
  return null
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledModalWrapper = styled.div`
  align-items: center;
  backdrop-filter: blur(5px);
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`

const StyledModalBackdrop = styled.div`
  background: ${props => props.theme.baseColor};
  opacity: 0.65;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
`

const StyledResponsiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-height: calc(100vh - 72px);
  max-width: 600px;
  position: relative;
  width: 100%;
  box-shadow: 0 0 24px 0 ${props => props.theme.shadowColor};
  border-radius: ${props => props.theme.borderRadius}px;
  background-color: ${props => props.theme.baseColor};
  opacity: 0.975;
  @media (max-width: 600px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${props => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} .3s forwards ease-out;
  }
`

export default Modal;
