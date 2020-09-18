import React from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import ClaimCard from './components/ClaimCard'
import MigrateCard from './components/MigrateCard'
import VestingNotice from './components/VestingNotice'

const Migrate: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon="🦋"
        subtitle="This is the last time you'll need to migrate!"
        title="Migrate to V3"
      />
      <Container>
        <VestingNotice />
        <Spacer />
        <Split>
          <MigrateCard />
          <ClaimCard />
        </Split>
      </Container>
    </Page>
  )
}

export default Migrate