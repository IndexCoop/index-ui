import React from 'react'
import styled from 'styled-components'
import { Surface } from 'react-neu'

interface HeaderNewsCardProps {
  title: string
  author: string
  image: string
  link: string
  readTime: string
}

const HeaderNewsCard: React.FC<HeaderNewsCardProps> = ({
  title,
  author,
  image,
  link,
  readTime,
}) => {
  return (
    <Surface fill>
      <StyledCard>
        <StyledCardImage src={image} />
        <StyledCardContent>
          <StyledCardTitle>{title}</StyledCardTitle>
          <StyledCardAuthor>By {author}</StyledCardAuthor>
          <StyledReadMore>{readTime}</StyledReadMore>
        </StyledCardContent>
      </StyledCard>
    </Surface>
  )
}

const StyledCard = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
  transition: 0.2s;
  &:hover {
    transform: scale(1.005);
    cursor: pointer;
  }
`

const StyledCardContent = styled.div`
  padding: 20px 40px;
`

const StyledCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: ${(props) => props.theme.borderRadius}px;
`
const StyledCardTitle = styled.h1`
  font-size: 56px;
`
const StyledCardAuthor = styled.h3`
  font-size: 32px;
`
const StyledReadMore = styled.span`
  font-size: 24px;
  font-weight: 600;
`

export default HeaderNewsCard