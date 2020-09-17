import React from 'react'
import styled from 'styled-components'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'

const Home: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon="🌞"
        subtitle="It's a great day to farm YAMs!"
        title="Welcome to YAM Finance."
      />
    </Page>
  )
}

export default Home