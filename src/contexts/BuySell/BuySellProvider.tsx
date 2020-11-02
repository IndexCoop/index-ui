import React, { useState, useEffect } from 'react'

import BuySellContext from './BuySellContext'

const BuySellProvider: React.FC = ({ children }) => {
  return (
    <BuySellContext.Provider value={{ onExecuteBuySell: () => {} }}>
      {children}
    </BuySellContext.Provider>
  )
}

export default BuySellProvider
