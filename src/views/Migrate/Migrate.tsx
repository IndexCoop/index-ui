import React from 'react'
import styled from 'styled-components'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'

const Migrate: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon="🦋"
        subtitle="This is the last time you'll need to migrate!"
        title="Migrate to V3"
      />
    </Page>
  )
}

export default Migrate