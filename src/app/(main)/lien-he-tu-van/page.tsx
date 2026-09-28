import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import getSchemaMarkup from '@/fetches/getSchemaMarkup'
import metadataValues from '@/utils/metadataValues'
import Image from 'next/image'
import ContactForm from './_components/form'

export async function generateMetadata() {
  const res = await getMetaDataRankMath('/lien-he-tu-van')
  return metadataValues(res)
}

export default async function ContactPage() {
  const [schemaData] = await Promise.all([getSchemaMarkup('/lien-he-tu-van')])
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData, null, 2),
        }}
      ></script>
      <main className='w-full h-fit min-h-screen relative mb-[-1px]'>
        <Image
          src='/auth/bg-auth.jpg'
          alt=''
          width={1600}
          height={800}
          priority
          className='sticky top-0 left-0 h-screen w-full object-cover'
        />
        <div className='w-full relative z-10 -mt-[calc(100vh-10.94rem)] xsm:-mt-[calc(100vh-5.87rem)] xsm:px-4'>
          <div className='sm:w-[55.6875rem] mx-auto xsm:bg-[rgba(18,16,48,0.85)] rounded-[0.75rem] xsm:backdrop-blur-[3px] p-8 overflow-hidden relative xsm:p-[1.5rem_1rem]'>
            <div className='sm:w-[30.6rem] relative z-10'>
              <h1 className='text-[1.5rem] text-white font-semibold tracking-[0.015rem] mb-[1.875rem]'>
                Liên hệ tư vấn
              </h1>
              <ContactForm />
            </div>
            <Image
              className='absolute top-0 left-0 size-full xsm:hidden'
              src='/auth/bg-form.png'
              alt=''
              quality={95}
              width={890}
              height={530}
            />
          </div>
        </div>
      </main>
    </>
  )
}
