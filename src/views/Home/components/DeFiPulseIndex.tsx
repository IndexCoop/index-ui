import React from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Container,
  Spacer,
} from 'react-neu'
import styled from 'styled-components'

import ExternalLink from 'components/ExternalLink'
import Label from 'components/Label'

const Home: React.FC = () => {
  return (
    <Container>
      <Box row justifyContent='center'>
        <Card>
          <CardIcon>
            <img
              alt='DeFi Pulse Icon'
              src='https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg'
            />
          </CardIcon>
          <CardContent>
            <Box alignItems='center' column>
              <StyledHeader>DeFi Pulse Index</StyledHeader>
              <Label text="Index's First Product" />
            </Box>
            <Spacer />
            <span>
              <ExternalLink href='https://www.tokensets.com/portfolio/dpi'>
                The DeFi Pulse Index
              </ExternalLink>{' '}
              is a digital asset index designed to track tokens’ performance
              within the Decentralized Finance industry. The index is weighted
              based on the value of each token’s circulating supply. The DeFi
              Pulse Index aims to track projects in Decentralized Finance that
              have significant usage and show a commitment to ongoing
              maintenance and development.
            </span>
            <Spacer />
            <StyledIndexImage src='https://index-dao.s3.amazonaws.com/index_allocations_1.png' />
          </CardContent>
          <CardActions>
            <Box row justifyContent='center'>
              <Button
                href='https://www.tokensets.com/portfolio/dpi'
                size='md'
                text='View The Index'
              />
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Container>
  )
}

const StyledHeader = styled.h2`
  color: ${(props) => props.theme.colors.primary.light};
  margin-bottom: 0px;
  margin-top: 0px;
  text-align: center;
`

const StyledIndexImage = styled.img`
  width: 100%;
`

export default Home
