import { createContext } from 'react'

interface AirdropContextValues {
  claimableQuantity?: string
}

const AirdropContext = createContext<AirdropContextValues>({})

export default AirdropContext