import React, { useEffect, useRef } from 'react'

import { Button, Container, Spacer } from 'react-neu'
import styled from 'styled-components'
import { Connectors, useWallet } from 'use-wallet'

import Logo from 'components/Logo'
import MenuIcon from 'components/icons/Menu'
import useLocalStorage from 'hooks/useLocalStorage'

import DarkModeSwitch from './components/DarkModeSwitch'
import Nav from './components/Nav'
import WalletButton from './components/WalletButton'

interface TopBarProps {
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {

  // const [walletProvider, setWalletProvider] = useLocalStorage<keyof Connectors | ''>('provider', '')
  const { account, connect, connector, status } = useWallet()
  const prevStatusRef = useRef('')
  
  /*
  useEffect(() => {
    if (walletProvider) {
      connect(walletProvider)
    }
  }, [walletProvider])

  useEffect(() => {
    switch (status) {
      case 'connected':
        setWalletProvider(connector)
        break
      case 'error':
        console.log('here')
        setWalletProvider('')
        break
      case 'disconnected':
        if (prevStatusRef.current === 'connected') {
          console.log('here')
          setWalletProvider('')
        }
        break
    }
  }, [
    connector,
    setWalletProvider,
    status
  ])

  useEffect(() => {
    prevStatusRef.current = status
  })
  */

  return (
    <StyledTopBar>
      <Container size="lg">
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
            <WalletButton />
          </StyledAccountButtonWrapper>
          <StyledMenuButton onClick={onPresentMobileMenu}>
            <MenuIcon />
          </StyledMenuButton>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  width: 156px;
  @media (max-width: 400px) {
    width: auto;
  }
`

const StyledTopBar = styled.div``

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: 72px;
  justify-content: space-between;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
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
  @media (max-width: 400px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`

export default TopBar