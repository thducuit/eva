import Link from 'next/link'

interface AboutSectionProps {
  about_us: Array<{
    page: {
      url: string
      title: string
    }
  }>
}

const AboutSection = ({ about_us }: AboutSectionProps) => {
  return (
    <article className='xsm:row-start-2'>
      <h3 className='text-white text-[1.5rem] font-semibold leading-[1.875rem] mb-[2rem] xsm:text-base xsm:leading-[1.375rem] xsm:tracking-[0.0125rem] xsm:mb-[1.25rem]'>
        Về chúng tôi
      </h3>
      <div className='flex flex-col space-y-[1.5rem] xsm:space-y-[0.75rem]'>
        {about_us.map((item, index) => (
          <Link
            href={item.page.url}
            key={index}
            className='text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] bg-clip-text bg-[linear-gradient(93deg,#A6762C_3.28%,#F0D977_52.67%)] text-white hover:text-white/0 transition-colors duration-500 ease-in-out uppercase xsm:text-[0.75rem] xsm:leading-[1.125rem] xsm:tracking-normal'
          >
            {item.page.title}
          </Link>
        ))}
      </div>
    </article>
  )
}

export default AboutSection
