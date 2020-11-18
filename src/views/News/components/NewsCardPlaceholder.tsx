import React from 'react'
import styled from 'styled-components'

const NewsCardPlaceholder: React.FC = () => {
  return <StyledNewsCard />
}

const StyledNewsCard = styled.div`
  width: 32%;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    display: none;
  }
`

export default NewsCardPlaceholder
