import React from 'react'

import styled from 'styled-components'

import {
  discordLink,
  forumLink,
  pressKitLink,
  twitterLink,
} from 'constants/externalLinks'

const Nav: React.FC = () => {
  return (
    <StyledNav data-cy='footer-links'>
      <StyledLink href={twitterLink} target='_blank' rel='noopener'>
        Twitter
      </StyledLink>
      <StyledLink href={forumLink} target='_blank' rel='noopener'>
        Forum
      </StyledLink>
      <StyledLink href={discordLink} target='_blank' rel='noopener'>
        Discord
      </StyledLink>
      <StyledLink href={pressKitLink} target='_blank' rel='noopener'>
        Press Kit
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.grey[500]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`

export default Nav
