import React, { useEffect, useRef } from 'react'

import { Box, Emoji, Spacer, useTheme } from 'react-neu'
import styled from 'styled-components'

interface QuestionProps {
  active?: boolean,
  question: string,
  slug: string,
}

const Question: React.FC<QuestionProps> = ({
  active,
  children,
  question,
  slug,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const l = React.Children.toArray(children).length

  useEffect(() => {
    if (active) {
      if (ref.current !== null) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [active])

  return (
    <div ref={ref}>
      <Box paddingVertical={4} marginVertical={3}>
        <Box alignItems="center" row>
          {active && (
            <>
              <Emoji emoji="👉" />
              <Spacer size="sm" />
            </>
          )}
          <StyledQuestionLink href={`https://yam.finance/faq/${slug}`}>{question}</StyledQuestionLink>
        </Box>
        <Spacer />
        {React.Children.map(children, (child, i) => (
          <>
            {child}
            {i < l - 1 && <Spacer />}
          </>
        ))}
      </Box>
    </div>
  )
}

interface StyledQuestionLinkProps {
  active?: boolean
}
const StyledQuestionLink = styled.a<StyledQuestionLinkProps>`
  color: ${props => props.active ? props.theme.colors.primary.main : props.theme.textColor};
  display: block;
  font-size: 24px;
  font-weight: 700;
`

export default Question