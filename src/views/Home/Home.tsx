import React from 'react'
import { Button, Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Explanation from 'components/Explanation'
import Split from 'components/Split'

import DeFiPulseIndex from './components/DeFiPulseIndex'
import FarmingTimer from './components/FarmingTimer'
import Treasury from './components/Treasury'

const Home: React.FC = () => {

  return (
    <Page>
      <PageHeader
        icon='🦉'
        title='Index DAO'
        subtitle='A global community creating and maintaining the best crypto index products'
      />
        <Button text='View Farms' to='/farm' />
        <Spacer size="lg" />
        <Treasury />
        <Spacer />
        <Container>
          <Split>
            <FarmingTimer />
            <Explanation />
          </Split>
        </Container>
        <Spacer />
        <DeFiPulseIndex />
        <Spacer />
    </Page>
  )
}

export default Home
