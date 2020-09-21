import React from 'react'

import {
  Emoji,
  Switch,
  SwitchButton,
  useTheme,
} from 'react-neu'

const DarkModeSwitch: React.FC = () => {
  const {
    darkMode,
    onToggleDarkMode,
  } = useTheme()

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