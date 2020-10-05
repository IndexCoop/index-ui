import React, { useContext } from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useTheme } from 'react-neu'
import styled from 'styled-components'

interface DialProps {
  children?: React.ReactNode,
  color?: 'primary' | 'secondary',
  disabled?: boolean,
  size?: number,
  value: number
}

const Dial: React.FC<DialProps> = ({ children, color, disabled, size = 256, value }) => {
  const { colors } = useTheme()
  let pathColor = colors.primary.light
  if (color === 'primary') {
    pathColor = colors.primary.main
  }

  return (
    <StyledDial size={size}>
      <StyledOuter>
        <CircularProgressbar
          value={value}
          styles={buildStyles({
            strokeLinecap: 'round',
            pathColor: !disabled ? pathColor : colors.grey[400],
            pathTransitionDuration: 1,
          })}
        />
      </StyledOuter>
      <StyledInner size={size}>
        {children}
      </StyledInner>
    </StyledDial>
  )
}

interface StyledInnerProps {
  size: number
}

const StyledDial = styled.div<StyledInnerProps>`
  padding: calc(${props => props.size}px * 24 / 256);
  position: relative;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  margin: auto;
`

const StyledInner = styled.div<StyledInnerProps>`
  align-items: center;
  background: transparent;
  border-radius: ${props => props.size}px;
  display: flex;
  justify-content: center;
  position: relative;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`

const StyledOuter = styled.div`
  background-color: ${props => props.theme.shadowColor};
  border-radius: 10000px;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
`

export default Dial