import React from 'react'
import styled from 'styled-components'

interface ExternalLinkProps {
  href?: string
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ children, href }) => (
  <StyledLink href={href}>
    {children}
  </StyledLink>
)

const StyledLink = styled.a`
  color: ${props => props.theme.colors.primary.light};
  &:visited {
    color: ${props => props.theme.colors.primary.light};
  }
`

export default ExternalLink