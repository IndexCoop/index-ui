import { useEffect } from 'react'
import { toast } from 'react-toastify'

const usePromoToast = (component: React.ReactElement) => {
  useEffect(() => {
    toast.success(component, {
      position: 'bottom-right',
      autoClose: false,
      closeOnClick: false,
      closeButton: true,
    })
  }, [])

  return null
}

export default usePromoToast
