import React from 'react'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  return (
    <Context.Provider value={{}}>
      {children}
    </Context.Provider>
  )
}

export default Provider