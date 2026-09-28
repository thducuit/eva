import Image from 'next/image'

interface DecorativeElementsProps {
  background: {
    url: string
    alt: string
  }
  image_decor: {
    behind_image: {
      url: string
      alt: string
    }
    front_image: {
      url: string
      alt: string
    }
  }
}

const DecorativeElements = ({
  background,
  image_decor,
}: DecorativeElementsProps) => {
  return (
    <>
      {/* Background Image */}
      <Image
        src={background.url}
        alt={background.alt}
        width={1600}
        height={1133}
        className='w-full h-full absolute top-0 left-0 object-cover'
      />

      {/* Gradient Overlays */}
      <div
        className='w-full h-[34.25rem] absolute top-0 left-0 xsm:hidden'
        style={{
          background:
            'linear-gradient(0deg, rgba(0, 1, 23, 0.00) 0%, #000117 100%)',
        }}
      />
      <div
        className='w-full h-[34.25rem] absolute inset-0 opacity-90 xsm:h-[35.625rem]'
        style={{
          background: 'linear-gradient(180deg, #010217 0%, #281D01 100%)',
        }}
      />

      {/* Decorative Blur Elements */}
      <div
        className='size-[8.625rem] opacity-90 blur-[100px] absolute top-[9.75rem] left-[1.875rem] xsm:hidden'
        style={{
          background: 'linear-gradient(180deg, #A6762C 0%, #F0D977 100%)',
        }}
      />

      {/* <div
        className='size-[28.0625rem] xsm:size-[10.9375rem] rounded-[28.0625rem] blur-[100px] absolute right-[-3.25rem] bottom-[-15.75rem] opacity-80 z-[3] xsm:bottom-auto xsm:right-[-2.75rem] xsm:top-[8rem]'
        style={{
          background: 'linear-gradient(180deg, #A6762C 0%, #F0D977 100%)',
        }}
      />

      <div
        className='size-[16.9375rem] xsm:size-[7.62488rem] rounded-[16.9375rem] opacity-60 blur-[100px] absolute right-[23.9375rem] bottom-[-9.375rem] z-[3] xsm:blur-[50px] xsm:bottom-auto xsm:right-[5.75rem] xsm:top-[12rem]'
        style={{
          background: 'linear-gradient(180deg, #A6762C 0%, #F0D977 100%)',
        }}
      /> */}

      <div className='size-[8.30094rem] xsm:size-[3.73688rem] xsm:blur-[22px] opacity-30 bg-[#F6E280] blur-[42px] absolute top-[4.675rem] right-[10.775rem] z-[1] xsm:top-[3.25rem] xsm:right-[1.5rem]' />

      {/* Decorative Images */}
      <Image
        src={image_decor.behind_image.url}
        alt={image_decor.behind_image.alt}
        width={536}
        height={440}
        className='w-[33.5rem] h-[27.4375rem] object-cover absolute right-[4.25rem] top-[0.4375rem] xsm:w-[13rem] xsm:h-[10.6875rem] xsm:top-[2.875rem] xsm:right-0'
      />
      {/* <Image
        src={image_decor.front_image.url}
        alt={image_decor.front_image.alt}
        width={454}
        height={534}
        className='w-[28.375rem] h-[33.375rem] object-cover absolute right-[8.1875rem] bottom-[-3.5625rem] z-[2] xsm:w-[12.74906rem] xsm:h-[14.20444rem] xsm:top-[2.875rem] xsm:right-[0.75rem]'
      /> */}
    </>
  )
}

export default DecorativeElements
