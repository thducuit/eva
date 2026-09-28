import ImageFallback from '@/components/image/ImageFallback'

interface HeroProps {
  title: string
  imageUrl: string
}

const Hero = ({title, imageUrl}: HeroProps) => {
  return (
    <section className='w-full h-[79.5625rem] xsm:h-auto bg-[#000117]'>
      <div className='max-w-[87.5rem] mx-auto pt-[9.1275rem] xsm:pt-[6.4375rem] xsm:pl-[1.25rem]'>
        <h1 className='text-[#efefef] text-[2rem] font-medium leading-[2.375rem] tracking-[0.005rem] xsm:text-[1.25rem] xsm:leading-[1.625rem] xsm:font-semibold '>
          {title}
        </h1>

        <ImageFallback
          src={imageUrl}
          alt='apartment'
          width={1400}
          height={1000}
          className='w-[87.5rem] h-[64.9375rem] rounded-[0.5rem] object-cover mt-[3.75rem] xsm:w-[20.9375rem] xsm:h-full xsm:rounded-[0.375rem] xsm:mt-[1.5rem]'
          quality={100}
        />
      </div>
    </section>
  )
}

export default Hero
