'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {cn} from '@/lib/utils'

export function DialogProvider({
  children,
  open,
  setOpen,
  className,
}: {
  children: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  className?: string
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className={cn(className)}>
        <DialogHeader className='!hidden'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
