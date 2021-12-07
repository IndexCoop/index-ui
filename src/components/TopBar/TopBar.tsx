import React from 'react'

import { Container, Spacer } from 'react-neu'
import styled from 'styled-components'

import Logo from 'components/Logo'
import MenuIcon from 'components/icons/Menu'

import DarkModeSwitch from './components/DarkModeSwitch'
import Nav from './components/Nav'
import WalletButton from './components/WalletButton'
import ChainSelector from './components/ChainSelector'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
  return (
    <StyledTopBar>
      <Container size='lg'>
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <StyledNavWrapper>
            <Nav />
          </StyledNavWrapper>
          <StyledAccountButtonWrapper>
            <DarkModeSwitch />
            <Spacer />
            <ChainSelector />
            <Spacer />
            <WalletButton />
            <StyledMenuButton onClick={onPresentMobileMenu}>
              <MenuIcon />
            </StyledMenuButton>
          </StyledAccountButtonWrapper>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div``

const StyledLogoWrapper = styled.div`
  @media (max-width: 768px) {
    width: auto;
  }
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: 72px;
  justify-content: flex-start;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`
const StyledNavWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
  padding: 0 20px;
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  flex: 1;
  width: 200px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 768px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
    margin-left: 10px;
  }
`

export default TopBar
