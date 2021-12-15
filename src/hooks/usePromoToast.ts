import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import useLocalStorage from './useLocalStorage'

const usePromoToast = (component: React.ReactElement, toastId: string) => {
  const [hasBeenDismissed, setHasBeenDismissed] = useLocalStorage(
    toastId,
    false
  )

  useEffect(() => {
    !hasBeenDismissed &&
      toast.success(component, {
        position: 'bottom-right',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: true,
        toastId,
        onClose: () => setHasBeenDismissed(true),
      })
  }, [])

  return null
}

export default usePromoToast
