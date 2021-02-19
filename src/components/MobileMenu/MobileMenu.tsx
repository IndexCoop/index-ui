import React from 'react'
import styled, { keyframes } from 'styled-components'

import { NavLink } from 'react-router-dom'

interface MobileMenuProps {
  onDismiss: () => void
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onDismiss, visible }) => {
  if (visible) {
    return (
      <StyledMobileMenuWrapper>
        <StyledBackdrop onClick={onDismiss} />
        <StyledMobileMenu>
          <StyledLink exact activeClassName='active' to='/' onClick={onDismiss}>
            Home
          </StyledLink>
          <StyledLink
            exact
            activeClassName='active'
            to='/farm'
            onClick={onDismiss}
          >
            Farm
          </StyledLink>
          <StyledLink exact activeClassName='active' to='/dpi'>
            DeFi Pulse Index
          </StyledLink>
          <StyledLink exact activeClassName='active' to='/cgi'>
            CoinShares Crypto Gold Index
          </StyledLink>
          <StyledLink exact activeClassName='active' to='/index'>
            Index Coop Token
          </StyledLink>
          <StyledLink exact activeClassName='active' to='/about'>
            About
          </StyledLink>
          <StyledLink exact activeClassName='active' to='/vote'>
            Vote
          </StyledLink>
          <StyledLink exact activeClassName='active' to='/how-to-buy'>
            How to Buy
          </StyledLink>
          <StyledLink exact activeClassName='active' to='/rewards'>
            Rewards
          </StyledLink>
          <StyledOutboundLink
            href='https://docs.indexcoop.com/'
            target='_blank'
          >
            Docs
          </StyledOutboundLink>
        </StyledMobileMenu>
      </StyledMobileMenuWrapper>
    )
  }
  return null
}

const StyledBackdrop = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  opacity: 0.75;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const StyledMobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`

const slideIn = keyframes`
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-100%);
  }
`

const StyledMobileMenu = styled.div`
  animation: ${slideIn} 0.3s forwards ease-out;
  background: ${(props) => props.theme.baseBg};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 100%;
  bottom: 0;
  width: calc(100% - 48px);
`

const StyledLink = styled(NavLink)`
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 24px;
  font-weight: 700;
  padding: ${(props) => props.theme.spacing[3]}px
    ${(props) => props.theme.spacing[4]}px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.main};
  }
`

const StyledOutboundLink = styled.a`
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 24px;
  font-weight: 700;
  padding: ${(props) => props.theme.spacing[3]}px
    ${(props) => props.theme.spacing[4]}px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.main};
  }
`

export default MobileMenu
