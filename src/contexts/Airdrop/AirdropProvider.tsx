import React, { useState } from 'react'

import AirdropContext from './AirdropContext'

const AirdropProvider: React.FC = ({ children }) => {
  const [claimableQuantity] = useState<string>()
  
  return (
    <AirdropContext.Provider value={{
      claimableQuantity
    }}>
      {children}
    </AirdropContext.Provider>
  )
}

export default AirdropProvider