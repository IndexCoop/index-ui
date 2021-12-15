import React from 'react'

import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

import LeverageProductsDropdown from './LeverageProductsDropdown'
import ProductsDropdown from './ProductsDropdown'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <ProductsDropdown />
      <LeverageProductsDropdown />
      <StyledLink exact activeClassName='active' to='/index'>
        $INDEX
      </StyledLink>
      <StyledLink exact activeClassName='active' to='/liquidity-mining'>
        Liquidity Mining
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.light};
  }
`
const StyledOutboundLink = styled.a`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`

export default Nav
