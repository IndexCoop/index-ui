import React from 'react'
import { Card, CardContent, Container } from 'react-neu'
import styled from 'styled-components'

const Explanation: React.FC = () => (
  <Container>
    <Card>
      <CardContent>
        <StyledHeader>What is Index DAO?</StyledHeader>
        <ul>
          <li>
            <b>A Universe of Indices</b>
            <span> - </span>
            <span>
              Get exposure to the most representative indices of Ethereum assets.
            </span>
          </li>
          <li>
            <b>The World’s Index Experts</b>
            <span> - </span>
            <span>
              Index experts can get compensated by contributing analysis, brand, insights, and methodologies.
            </span>
          </li>
          <li>
            <b>Decentralized Governance</b>
            <span> - </span>
            <span>
              INDEX token holders govern the system by ratifying rebalances and proposing new indices.
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  </Container>
)

const StyledHeader = styled.h2`
  color: ${props => props.theme.colors.primary.light};
  margin-bottom: 0px;
  margin-top: 10px;
  text-align: center;
`

export default Explanation
