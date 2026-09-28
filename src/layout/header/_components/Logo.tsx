import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  logo: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  className?: string
  imgClassName?: string
}

export const Logo = ({logo, className, imgClassName}: LogoProps) => {
  return (
    <Link
      href={'/'}
      className={
        className ?? 'w-[12.5rem] h-[3.41665rem] xsm:w-[10rem] xsm:h-[2.75rem]'
      }
    >
      <Image
        src={logo?.url}
        alt={logo?.alt || ''}
        width={logo?.width || 200}
        height={logo?.height || 55}
        className={imgClassName ?? 'w-full h-full object-cover'}
        quality={100}
      />
    </Link>
  )
}
