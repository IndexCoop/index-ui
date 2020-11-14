import React from 'react'
import styled from 'styled-components'

interface ExternalLinkProps {
  href?: string
  target?: string
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  href,
  target,
}) => (
  <StyledLink href={href} target={target}>
    {children}
  </StyledLink>
)

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.primary.light};
  text-decoration: none;
  &:visited {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

export default ExternalLink
