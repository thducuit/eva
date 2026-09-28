'use client'
import {useEffect, useState} from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 639)
    }

    const debounce = (func: () => void, delay: number) => {
      let timeout: ReturnType<typeof setTimeout>
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(func, delay)
      }
    }

    const debouncedCheckMobile = debounce(checkMobile, 100)

    checkMobile()
    window.addEventListener('resize', debouncedCheckMobile)

    return () => {
      window.removeEventListener('resize', debouncedCheckMobile)
    }
  }, [])

  // Return false during SSR to prevent hydration mismatch
  return isClient ? isMobile : false
}

export default useIsMobile
