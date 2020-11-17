import React, { useState } from 'react'
import styled, { css } from 'styled-components'

interface NewsCardProps {
  title: string
  author: string
  image: string
  link: string
  readTime: string
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  author,
  image,
  link,
  readTime,
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <StyledNewsCard
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
      }}
    >
      <StyledCardImage src={image} />
      <StyledCardContent>
        <StyledCardTitle>{title}</StyledCardTitle>
        <StyledCardAuthor isHovering={isHovering}>
          By {author} · {readTime}
        </StyledCardAuthor>
      </StyledCardContent>
    </StyledNewsCard>
  )
}

interface IsHoveringProp {
  isHovering: boolean
}

const StyledNewsCard = styled.div`
  width: 32%;
  margin-bottom: 20px;
  transition: 0.2s;
  cursor: pointer;
  height: 500px;
  &:hover {
    color: ${(props) => props.theme.colors.primary.light};
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`

const StyledCardContent = styled.div``

const StyledCardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius}px;
`
const StyledCardTitle = styled.h1``
const StyledCardAuthor = styled.span<IsHoveringProp>`
  color: ${(props) => props.theme.colors.grey[400]};

  ${(props) =>
    props.isHovering &&
    css`
      color: ${(props) => props.theme.colors.grey[500]};
    `}
`

export default NewsCard
