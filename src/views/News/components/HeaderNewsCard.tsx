import React, { useState } from 'react'
import styled, { css } from 'styled-components'

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
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <StyledCard
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
      }}
    >
      <StyledCardImage src={image} />
      <StyledCardContent>
        <StyledCardTitle isHovering={isHovering}>{title}</StyledCardTitle>
        <StyledCardText isHovering={isHovering} href={link}>
          By {author} · {readTime}
        </StyledCardText>
      </StyledCardContent>
    </StyledCard>
  )
}

interface IsHoveringProp {
  isHovering: boolean
}

const StyledCard = styled.div`
  width: 100%;
  transition: 0.2s;
  &:hover {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

const StyledCardImage = styled.img`
  height: 400px;
  width: 100%;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius}px;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

const StyledCardContent = styled.div`
  height: 100px;
  width: 100%;
`

const StyledCardTitle = styled.a<IsHoveringProp>`
  display: block;
  font-size: 32px;
  margin-top: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};

  ${(props) =>
    props.isHovering &&
    css`
      color: ${(props) => props.theme.colors.primary.light};
    `}
`

const StyledCardText = styled.a<IsHoveringProp>`
  font-size: 20px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.grey[400]};

  ${(props) =>
    props.isHovering &&
    css`
      color: ${(props) => props.theme.colors.grey[500]};
    `}
`

export default HeaderNewsCard
