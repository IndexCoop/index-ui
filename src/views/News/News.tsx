import React from 'react'
import { Container, Spacer, Card } from 'react-neu'
import Page from 'components/Page'
import styled from 'styled-components'
import HeaderNewsCard from './components/HeaderNewsCard'
import NewsCard from './components/NewsCard'

const Vote: React.FC = () => {
  return (
    <Page>
      <Container size='lg'>
        <StyledPageHeader>News</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          The latest news from the Index Coop
        </StyledPageSubheader>
        <Spacer size='md' />
        <HeaderNewsCard
          image={
            'https://miro.medium.com/max/1400/1*jGrGl4jcZ_uUQZ3xDM-Ntw.png'
          }
          title={'Index Coop October Recap'}
          author={'Kiba & DarkForestCapital'}
          link={''}
        />
        <Spacer />
        <StyledNewsFeed>
          <NewsCard
            image={
              'https://content.consensys.net/wp-content/uploads/defi-hero.png'
            }
            title={'How to Capture Intrinsic Productivity in an Index Fund'}
            author={'Over analyser'}
            link={''}
          />
          <NewsCard
            image={
              'https://www.supercryptonews.com/wp-content/uploads/2020/08/Defi-1.jpg'
            }
            title={'The 2% Cash Grab'}
            author={'Over analyser'}
            link={''}
          />
          <NewsCard
            image={
              'https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/sites/67886/images/836LUVFDTpGAhDJR0Udh_defi-pulse.jpg'
            }
            title={'How to Capture Intrinsic Productivity in an Index Fund'}
            author={'Over analyser'}
            link={''}
          />
          <NewsCard
            image={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmCFA1z4WssKnJ-mjFclZpjSG7yb3MO6ERaA&usqp=CAU'
            }
            title={'How to Capture Intrinsic Productivity in an Index Fund'}
            author={'Over analyser'}
            link={''}
          />
          <NewsCard
            image={
              'https://www.supercryptonews.com/wp-content/uploads/2020/08/Defi-1.jpg'
            }
            title={'How to Capture Intrinsic Productivity in an Index Fund'}
            author={'Over analyser'}
            link={''}
          />
        </StyledNewsFeed>
      </Container>
    </Page>
  )
}

const StyledPageHeader = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 48px;
  font-weight: 700;
  width: 100%;
`

const StyledPageSubheader = styled.div`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 24px;
  width: 100%;
`

const StyledNewsFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`

export default Vote
