import React from 'react'
import {
  Box,
  Button,
  Container,
  Spacer,
} from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'

import MigrationNotice from './components/MigrationNotice'
import Rebase from './components/Rebase'
import Stats from './components/Stats'
import VestingNotice from './components/VestingNotice'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon="🌞"
        subtitle="It's a great day to farm YAMs!"
        title="Welcome to YAM Finance."
      />
      <Container>
        <MigrationNotice />
        <Spacer size="sm" />
        <VestingNotice />
        <Spacer />
        <Box row>
          <Box flex={1}>
            <Rebase />
          </Box>
          <Spacer />
          <Box flex={1}>
            <Stats />
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default Home