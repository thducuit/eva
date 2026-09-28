import {IFooter} from '@/types/options.interface'
import ContactSection from '@/layout/footer/_components/ContactSection'
import AboutSection from '@/layout/footer/_components/AboutSection'
import SupportSection from '@/layout/footer/_components/SupportSection'
import DecorativeElements from '@/layout/footer/_components/DecorativeElements'
import FooterLogo from '@/layout/footer/_components/FooterLogo'

const Footer = ({data}: {data: IFooter}) => {
  return (
    <footer className='w-full h-[34.25rem] bg-[#000117] relative overflow-hidden xsm:h-[35.625rem] xsm:mt-[-1px]'>
      <DecorativeElements
        background={data.background}
        image_decor={data.image_decor}
      />

      <FooterLogo logo={data.logo} />

      <div className='grid grid-cols-[auto_8.6875rem_10.75rem] absolute top-[14.5rem] left-[6.25rem] gap-x-[8.25rem] xsm:top-auto xsm:bottom-[1.5rem] xsm:left-[1.25rem] xsm:grid-cols-2 xsm:grid-rows-2 xsm:gap-x-[1.25rem]'>
        <ContactSection contact_info={data.contact_info} />
        <AboutSection about_us={data.about_us} />
        <SupportSection support={data.support} />
      </div>
    </footer>
  )
}

export default Footer
