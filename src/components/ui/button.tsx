import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        tertiary:
          'rounded-[0.5rem] bg-[#101A49] lg:hover:bg-[#09123E] transition-all duration-300',
        quaternary:
          'rounded-[0.5rem] bg-transparent border-[0.5px] border-[#F6E280] lg:hover:bg-[#F6E280] transition-all duration-300',
        primary:
          'relative rounded-[0.5rem] transition-all duration-300 overflow-hidden' +
          'before:content-[""] before:absolute before:inset-0 before:bg-[linear-gradient(107deg,#F6E280_-0.32%,#FFF8D8_98.72%)] ' +
          'before:rounded-[0.5rem] ' +
          'after:content-[""] after:absolute after:inset-0 after:bg-[linear-gradient(107deg,#FFC096_-0.32%,#FFFBE6_98.72%)] after:opacity-0 lg:hover:after:opacity-100 after:transition-opacity after:duration-300 after:rounded-[0.5rem]',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
      text: {
        default:
          'text-[0.875rem] font-semibold tracking-[0.00875rem] text-center xsm:text-[0.75rem] xsm:tracking-[0.0075rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  text,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({variant, size, text, className}))}
      {...props}
    />
  )
}

export {Button, buttonVariants}
