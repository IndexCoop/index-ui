import React from 'react'
import { Box, Card, CardContent, Container, Spacer } from 'react-neu'
import styled from 'styled-components'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'

const ComingSoon: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon='🦉'
        title='Index DAO'
        subtitle='A global community launching and maintaining the world’s best crypto index vehicles'
      />
      <Container>
        <Card>
          <Box
            alignItems="center"
            column
          >
            <StyledIcon>🌚</StyledIcon>
            <StyledTitle>Coming Soon</StyledTitle>
          </Box>
        </Card>
      </Container>
      <Spacer />
    </Page>
  )
}

const StyledIcon = styled.h2`
  color: ${(props) => props.theme.colors.primary.light};
  font-size: 64px;
  margin-bottom: 0px;
  margin-top: 32px;
`

const StyledTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary.light};
  font-size: 48px;
  margin-top: 0px;
`

export default ComingSoon
