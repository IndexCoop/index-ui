import { useContext } from 'react'

import { MigrationContext } from 'contexts/Migration'

const useMigration = () => {
  return { ...useContext(MigrationContext) }
}

export default useMigration