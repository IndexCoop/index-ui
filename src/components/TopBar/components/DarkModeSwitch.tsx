import React, { useEffect } from 'react'

import {
  Emoji,
  Switch,
  SwitchButton,
  useTheme,
} from 'react-neu'

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
        active={!darkMode}
        onClick={onToggleDarkMode}
        round
      >
        <Emoji emoji="🌞" />
      </SwitchButton>
      <SwitchButton
        active={darkMode}
        onClick={onToggleDarkMode}
        round
      >
        <Emoji emoji="🌚" />
      </SwitchButton>
    </Switch>
  )
}

export default DarkModeSwitch