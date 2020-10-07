import React from 'react'

import { Container, Spacer } from 'react-neu'
import styled from 'styled-components'

interface PageHeaderProps {
  icon: {
    src: string;
    alt: string;
  },
  subtitle?: string,
  title?: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <Container>
    <StyledPageHeader>
      <StyledIcon src={icon.src} alt={icon.alt} />
      <Spacer size="sm" />
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[4]}px;
  margin: 0 auto;
`

const StyledIcon = styled.img`
  height: 124px;
  text-align: center;
  min-width: 124px;
`

const StyledTitle = styled.h1`
  color: ${props => props.theme.textColor};
  font-size: 120px;
  line-height: 108px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledSubtitle = styled.h3`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  margin-top: 24px;
  opacity: 0.66;
  padding: 0;
  text-align: center;
`

export default PageHeader