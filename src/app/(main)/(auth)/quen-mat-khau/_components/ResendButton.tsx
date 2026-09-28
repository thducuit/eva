'use client'

import {requestOTP} from '@/actions/requestOTP'
import {useState, useRef, useCallback, useEffect} from 'react'
import {toast} from 'sonner'

interface ResendButtonProps {
  email: string
}

export default function ResendButton({email}: ResendButtonProps) {
  const [isResending, setIsResending] = useState(false)
  const [displayCountdown, setDisplayCountdown] = useState(60)

  // Use refs to avoid re-renders
  const countdownRef = useRef(60)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Optimized countdown function that doesn't cause re-renders
  const updateCountdown = useCallback(() => {
    if (countdownRef.current > 0) {
      countdownRef.current -= 1
      setDisplayCountdown(countdownRef.current)

      if (countdownRef.current > 0) {
        timerRef.current = setTimeout(updateCountdown, 1000)
      }
    }
  }, [])

  // Start countdown when component mounts
  useEffect(() => {
    countdownRef.current = 60
    setDisplayCountdown(60)
    timerRef.current = setTimeout(updateCountdown, 1000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [updateCountdown])

  const handleResendCode = useCallback(async () => {
    if (countdownRef.current > 0 || isResending) return

    setIsResending(true)
    try {
      const res = await requestOTP(email)
      if (!res?.data?.expires_in) {
        toast.error('Email không tồn tại trong hệ thống.')
      }
      // Reset countdown
      countdownRef.current = 60
      setDisplayCountdown(60)
      timerRef.current = setTimeout(updateCountdown, 1000)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Không thể gửi lại mã xác thực')
    } finally {
      setIsResending(false)
    }
  }, [isResending, updateCountdown, email])

  return (
    <button
      type='button'
      onClick={handleResendCode}
      disabled={displayCountdown > 0 || isResending}
      className={`transition-colors duration-200 sub-2 xsm:mt-4 xsm:h-[2.5rem] ${
        displayCountdown > 0 || isResending
          ? 'text-white !cursor-not-allowed'
          : 'text-[rgba(107,245,255,0.60)] hover:text-[rgba(107,245,255,0.80)] cursor-pointer'
      }`}
    >
      {isResending
        ? 'Đang gửi...'
        : displayCountdown > 0
        ? `Gửi lại mã (${displayCountdown}s)`
        : 'Gửi lại mã'}
    </button>
  )
}
