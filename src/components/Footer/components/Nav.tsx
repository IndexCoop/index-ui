import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href="https://twitter.com/indexcoop">Twitter</StyledLink>
      <StyledLink href="https://gov.indexcoop.com">Forum</StyledLink>
      <StyledLink href="https://discord.gg/RKZ4S3b">Discord</StyledLink>
      <StyledLink href="https://index-dao.s3.amazonaws.com/index-logo-pack.zip" download>Logos</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${props => props.theme.colors.grey[500]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.grey[600]};
  }
`

export default Nav
