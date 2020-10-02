import React from 'react'
import { Box, Button, Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Explanation from 'components/Explanation'

import DeFiPulseIndex from './components/DeFiPulseIndex'
import FarmingTimer from './components/FarmingTimer'
import Treasury from './components/Treasury'

const Home: React.FC = () => {

  return (
    <Page>
      <PageHeader
        icon='🦉'
        title='Index DAO'
        subtitle='A global community launching and maintaining the world’s best crypto index vehicles'
      />
        <Button text='View Farms' to='/farm' />
        <Spacer />
        <Treasury />
        <Spacer />
        <Container>
          <Box row justifyContent="center">
            <FarmingTimer />
            <Spacer />
            <Explanation />
          </Box>
        </Container>
        <Spacer />
        <DeFiPulseIndex />
        <Spacer />
    </Page>
  )
}

export default Home
