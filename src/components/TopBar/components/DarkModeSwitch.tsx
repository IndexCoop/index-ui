import React, { useEffect } from 'react'

import {
  Switch,
  SwitchButton,
  useTheme,
} from 'react-neu'
import styled from 'styled-components'

import useLocalStorage from 'hooks/useLocalStorage'

const DarkModeSwitch: React.FC = () => {
  const { darkMode, onToggleDarkMode } = useTheme()
  const [_, setDarkModeSetting] = useLocalStorage('darkMode', darkMode)

  useEffect(() => {
    setDarkModeSetting(darkMode)
  }, [
    darkMode,
    setDarkModeSetting
  ])

  return (
    <Switch>
      <SwitchButton
        active={darkMode}
        onClick={onToggleDarkMode}
        round
      >
        <StyledEmoji src="https://index-dao.s3.amazonaws.com/dark_moon.png" alt="Dark moon" />
      </SwitchButton>
      <SwitchButton
        active={!darkMode}
        onClick={onToggleDarkMode}
        round
      >
        <StyledEmoji src="https://index-dao.s3.amazonaws.com/sun.png" alt="Sun" />
      </SwitchButton>
    </Switch>
  )
}

const StyledEmoji = styled.img`
  height: 24px;
  text-align: center;
  min-width: 24px;
`

export default DarkModeSwitch