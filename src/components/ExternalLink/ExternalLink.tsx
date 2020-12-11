import React from 'react'
import styled, { css } from 'styled-components'

interface ExternalLinkProps {
  href?: string
  target?: string
  textAlign?: 'left' | 'right' | 'center'
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  href,
  target,
  textAlign,
}) => (
  <StyledLink href={href} target={target} textAlign={textAlign}>
    {children}
  </StyledLink>
)

const StyledLink = styled.a<ExternalLinkProps>`
  color: ${(props) => props.theme.colors.primary.light};
  text-decoration: none;
  &:visited {
    color: ${(props) => props.theme.colors.primary.light};
  }

  ${(props) =>
    props.textAlign &&
    css`
      text-align: ${props.textAlign};
    `}
`

export default ExternalLink
