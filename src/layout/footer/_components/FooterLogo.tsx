import Image from 'next/image'

interface FooterLogoProps {
  logo: {
    url: string
    alt: string
  }
}

const FooterLogo = ({ logo }: FooterLogoProps) => {
  return (
    <Image
      src={logo.url}
      alt={logo.alt}
      width={145}
      height={130}
      className='w-[9.0625rem] h-[7.9375rem] absolute object-cover top-[3.8125rem] left-[6.25rem] xsm:w-[7.25rem] xsm:h-[6.3125rem] xsm:top-[5.375rem] xsm:left-[1.25rem]'
    />
  )
}

export default FooterLogo
