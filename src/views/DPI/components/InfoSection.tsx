import React from 'react'
import styled from 'styled-components'

interface InfoSectionProps {
  title: string
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  )
}

const SectionContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[6]}px 0;

  :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[400]};
  }
`

const SectionTitle = styled.h3`
  font-size: 28px;
  margin-top: 0;
  color: ${({ theme }) => theme.textColor};
`
export default InfoSection
