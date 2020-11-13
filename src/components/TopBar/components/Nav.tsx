import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import ProductsDropdown from './ProductsDropdown'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName='active' to='/'>
        Home
      </StyledLink>
      <ProductsDropdown />
      <StyledLink exact activeClassName='active' to='/vote'>
        Vote
      </StyledLink>
      <StyledLink exact activeClassName='active' to='/about'>
        About
      </StyledLink>
      <StyledLink exact activeClassName='active' to='/farm'>
        Farm
      </StyledLink>
      <StyledOutboundLink href='https://docs.indexcoop.com/' target='_blank'>
        Docs
      </StyledOutboundLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const CustomDropdownOption = styled.div`
  width: 200px;
  margin: 10px;
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
  &.active {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

export default Nav
