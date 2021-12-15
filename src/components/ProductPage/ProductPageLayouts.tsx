import React from 'react'

import styled from 'styled-components'

import { formatCypressId } from '../../utils/cypressUtils'

export const ProductPageHeader = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: [chart] 70% [buybox] 300px;
  }
`

export const ProductPageContent = styled.div`
  @media (min-width: 768px) {
    width: 70%;
  }
`

interface ProductPageSectionProps {
  title: string
}

export const ProductPageSection: React.FC<ProductPageSectionProps> = ({
  title,
  children,
}) => {
  return (
    <SectionContainer>
      <SectionTitle data-cy={formatCypressId(title)}>{title}</SectionTitle>
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
`
