import React, { useEffect, useState } from 'react'
import { Container, Spacer } from 'react-neu'
import Page from 'components/Page'
import styled from 'styled-components'
import HeaderNewsCard from './components/HeaderNewsCard'
import NewsCard from './components/NewsCard'
import fetchNews from 'utils/newsApi'
import NewsCardPlaceholder from './components/NewsCardPlaceholder'

const Vote = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [])

  const [listArticles, setListArticles] = useState<any[]>([])
  const [headerArticle, setHeaderArticle] = useState({
    image: '',
    title: '',
    author: '',
    link: '',
    readTime: '',
  })

  useEffect(() => {
    fetchNews().then((newsContent) => {
      setHeaderArticle(newsContent[0])
      setListArticles(newsContent.slice(1))
    })
  }, [])

  let header =
    headerArticle.title === '' ? null : (
      <HeaderNewsCard
        image={headerArticle.image}
        title={headerArticle.title}
        author={headerArticle.author}
        link={headerArticle.link}
        readTime={headerArticle.readTime}
      />
    )

  return (
    <Page>
      <Container size='lg'>
        <StyledPageHeader>News</StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader>
          The latest news from the Index Coop
        </StyledPageSubheader>
        <Spacer size='md' />
        {header}
        <Spacer />
        <StyledNewsFeed>
          {listArticles.map((article: any) => {
            return (
              <NewsCard
                key={article.link}
                image={article.image}
                title={article.title}
                author={article.author}
                link={article.link}
                readTime={article.readTime}
              />
            )
          })}
          {(listArticles.length + 1) % 3 === 0 && <NewsCardPlaceholder />}
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
