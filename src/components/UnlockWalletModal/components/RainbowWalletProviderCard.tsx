import React from 'react'
import { Card, CardActions, CardContent, CardIcon, useTheme } from 'react-neu'
import styled, { keyframes } from 'styled-components'

import rainbowWalletLogo from 'assets/rainbow-logo.png'

interface RainbowWalletProviderCardProps {
  isDisabled?: boolean
  buttonText?: string
  onSelect: () => void
}

interface StyledButtonProps {
  readonly isDarkMode: boolean
}

const RainbowWalletProviderCard: React.FC<RainbowWalletProviderCardProps> = ({
  onSelect,
}) => {
  const { darkMode } = useTheme()
  const isDarkMode = darkMode === true

  return (
    <ProviderContainer onClick={onSelect}>
      <ButtonInner>
        <Card>
          <CardIcon>
            <img
              alt='rainbowWalletLogo'
              src={rainbowWalletLogo}
              style={{ borderRadius: 9, height: 32 }}
            />
          </CardIcon>
          <CardContent>
            <StyledName>{'Rainbow'}</StyledName>
          </CardContent>
          <CardActions>
            <StyledButton isDarkMode={isDarkMode}>
              Connect with Rainbow
            </StyledButton>
          </CardActions>
        </Card>
      </ButtonInner>
    </ProviderContainer>
  )
}

export const animatedgradient = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`

// Copied from https://github.com/rainbow-me/rainbow-button/pull/2
// Might be able to use that library when finished.
export const ButtonInner = styled.div`
  -webkit-user-select: none;
  align-items: center;
  position: relative;
  transition: 0.125s ease;

  &:before {
    background: rgba(0, 0, 0, 1);
    border-radius: 16px;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: 0.125s ease;
    width: 100%;
    will-change: transform;
    z-index: -1;

    -webkit-backdrop-filter: saturate(5);
    backdrop-filter: saturate(5);
    background: rgba(0, 0, 0, 0.85);
  }

  &:after {
    animation: ${animatedgradient} 80s ease-in-out alternate infinite;
    background: linear-gradient(
      270deg,
      #174299 0%,
      #1edbae 9.09%,
      #00b2ff 18.18%,
      #9f4ced 27.27%,
      #d04c74 36.36%,
      #00b5d5 45.45%,
      #174299 54.54%,
      #00b6cf 63.63%,
      #00d56f 72.72%,
      #174299 81.81%,
      #01bcd5 90.9%,
      #174299 100%
    );
    background-size: 1200% 1200%;
    border-radius: 18px;
    content: '';
    height: calc(100% + 4px);
    left: -2px;
    position: absolute;
    top: -2px;
    transition: 0.125s ease;
    width: calc(100% + 4px);
    z-index: -2;
  }
`

const StyledButton = styled.div<StyledButtonProps>`
  align-items: center;
  background-color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  border-color: white;
  border-radius: 15px;
  color: ${(props) => (props.isDarkMode ? 'black' : 'white')};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 700;
  height: 48px;
  justify-content: center;
`

const StyledName = styled.div`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`

const ProviderContainer = styled.div`
  cursor: pointer;
`

export default RainbowWalletProviderCard
