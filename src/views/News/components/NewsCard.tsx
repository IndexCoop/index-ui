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
      href={link}
      target='_blank'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
      }}
    >
      <StyledCardImage src={image} />
      <StyledCardContent>
        <StyledCardTitle isHovering={isHovering}>{title}</StyledCardTitle>
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

const StyledNewsCard = styled.a`
  width: 32%;
  margin-bottom: 20px;
  transition: 0.2s;
  cursor: pointer;
  text-decoration: none;
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
  height: 200px;
  object-fit: contain;
  border-radius: ${(props) => props.theme.borderRadius}px;

  @media (max-width: 600px) {
    height: 200px;
  }
`
const StyledCardTitle = styled.h1<IsHoveringProp>`
  color: ${(props) => props.theme.textColor};
  ${(props) =>
    props.isHovering &&
    css`
      color: ${(props) => props.theme.colors.primary.light};
    `}
`
const StyledCardAuthor = styled.span<IsHoveringProp>`
  color: ${(props) => props.theme.colors.grey[400]};

  ${(props) =>
    props.isHovering &&
    css`
      color: ${(props) => props.theme.colors.grey[500]};
    `}
`

export default NewsCard
