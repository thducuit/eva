import {LocationIcon, MailIcon, PhoneIcon} from '@/components/icon'
import Link from 'next/link'

interface ContactSectionProps {
  contact_info: {
    address: string
    hotline: string
    email: string
  }
}

const ContactSection = ({contact_info}: ContactSectionProps) => {
  return (
    <article className='xsm:col-span-2'>
      <h3 className='text-white text-[1.5rem] font-semibold leading-[1.875rem] mb-[2rem] xsm:text-[1.25rem] xsm:leading-[1.625rem] xsm:mb-[1.25rem]'>
        Thông tin liên hệ
      </h3>
      <div className='xsm:grid xsm:grid-cols-[5.5625rem_auto] xsm:grid-rows-[auto_auto] xsm:gap-x-[1.25rem]'>
        <div className='flex space-x-[0.5rem] items-start mb-[1.5rem] xsm:col-span-2 xsm:mb-[0.75rem]'>
          <LocationIcon className='w-[0.75rem] h-[1rem]' />
          <div
            className='text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] bg-clip-text bg-[linear-gradient(93deg,#A6762C_3.28%,#F0D977_52.67%)] text-white hover:text-white/0 transition-colors duration-500 ease-in-out xsm:text-[0.75rem] xsm:leading-[1.125rem] xsm:tracking-normal'
            dangerouslySetInnerHTML={{__html: contact_info.address}}
          />
        </div>
        <div className='flex space-x-[0.5rem] items-center mb-[1.5rem] xsm:row-start-2 xsm:mb-0'>
          <PhoneIcon className='size-[1rem]' />
          <Link
            href={`tel:${contact_info.hotline}`}
            className='text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] bg-clip-text bg-[linear-gradient(93deg,#A6762C_3.28%,#F0D977_52.67%)] text-white hover:text-white/0 transition-colors duration-500 ease-in-out xsm:text-[0.75rem] xsm:leading-[1.125rem] xsm:tracking-normal'
          >
            {contact_info.hotline}
          </Link>
        </div>
        <div className='flex space-x-[0.5rem] items-center mb-[1.5rem] xsm:row-start-2 xsm:mb-0'>
          <MailIcon className='size-[1rem]' />
          <Link
            href={`mailto:${contact_info.email}`}
            className='text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] bg-clip-text bg-[linear-gradient(93deg,#A6762C_3.28%,#F0D977_52.67%)] text-white hover:text-white/0 transition-colors duration-500 ease-in-out xsm:text-[0.75rem] xsm:leading-[1.125rem] xsm:tracking-normal'
          >
            {contact_info.email}
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ContactSection
