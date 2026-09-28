import {Button} from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type Contact = {url: string; title?: string}

type ContactButtonProps = {
  contact?: Contact
  className?: string
}

export const ContactButton = ({contact, className}: ContactButtonProps) => {
  return (
    <Button
      variant={'primary'}
      className={`h-[2.75rem] w-[11.4375rem] group ${className}`}
      text={'default'}
    >
      <Link
        className='flex-center'
        href={contact?.url || ''}
      >
        <span className='absolute z-[1] uppercase text-[#000117] left-[0.8125rem] lg:group-hover:text-[#711A08] transition-all duration-500'>
          {contact?.title || 'Liên hệ tư vấn'}
        </span>
        <div className='absolute bottom-0 right-[-1rem] z-[2] w-[5.625rem] h-[4.575rem] lg:group-hover:scale-105 transition-all duration-500 lg:group-hover:bottom-[0.12rem] overflow-hidden flex-center'>
          <Image
            src={'/header/contact-button.webp'}
            alt='contact-button'
            width={58}
            height={78}
            className='absolute z-[2] bottom-[-1.125rem] w-[3.425rem] h-[4.675rem] object-cover lg:group-hover:bottom-[-1rem] lg:group-hover:scale-105 transition-all duration-500 ease-in-out lg:group-hover:drop-shadow-[0_0_6px_#FFF]'
            quality={100}
          />
        </div>
        <div className='size-[2.8125rem] absolute z-[1] bottom-0 right-[0.8125rem]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='85'
            height='52'
            viewBox='0 0 85 52'
            fill='none'
            className='size-[2.8125rem]'
          >
            <g filter='url(#filter0_f_116_409)'>
              <circle
                cx='52.5'
                cy='52.5'
                r='22.5'
                fill='#FFAF69'
              />
            </g>
            <defs>
              <filter
                id='filter0_f_116_409'
                x='0'
                y='0'
                width='105'
                height='105'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
              >
                <feFlood
                  floodOpacity='0'
                  result='BackgroundImageFix'
                />
                <feBlend
                  mode='normal'
                  in='SourceGraphic'
                  in2='BackgroundImageFix'
                  result='shape'
                />
                <feGaussianBlur
                  stdDeviation='15'
                  result='effect1_foregroundBlur_116_409'
                />
              </filter>
            </defs>
          </svg>
        </div>
      </Link>
    </Button>
  )
}
