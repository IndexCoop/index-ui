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
        <StyledCardText isHovering={isHovering}>
          By {author} · {readTime}
        </StyledCardText>
      </StyledCardContent>
    </StyledCard>
  )
}

interface IsHoveringProp {
  isHovering: boolean
}

const StyledCard = styled.a`
  width: 100%;
  transition: 0.2s;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

const StyledCardImage = styled.img`
  height: 450px;
  width: 100%;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius}px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.colors.primary.light};
  }

  @media (max-width: 600px) {
    height: 200px;
  }
`

const StyledCardContent = styled.div`
  height: 100px;
  width: 100%;
`

const StyledCardTitle = styled.p<IsHoveringProp>`
  display: block;
  font-size: 32px;
  margin-top: 5px;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};

  ${(props) =>
    props.isHovering &&
    css`
      color: ${(props) => props.theme.colors.primary.light};
    `}
`

const StyledCardText = styled.p<IsHoveringProp>`
  font-size: 20px;
  text-decoration: none;

  @media (max-width: 600px) {
    font-size: 16px;
  }

  color: ${(props) => props.theme.colors.grey[400]};

  ${(props) =>
    props.isHovering &&
    css`
      color: ${(props) => props.theme.colors.grey[500]};
    `}
`

export default HeaderNewsCard
