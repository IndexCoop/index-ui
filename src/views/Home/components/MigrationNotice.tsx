import React from 'react'
import {
  Box,
  Button,
  Notice,
} from 'react-neu'

const MigrationNotice: React.FC = () => {
  return (
    <Notice>
      <Box flex={1} />
      <Button text="Migrate" to="migrate" />
    </Notice>
  )
}

export default MigrationNotice