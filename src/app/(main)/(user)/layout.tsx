import {auth} from '@/auth'
import Aside from '@/layout/dashboard/Aside'
import pathPage from '@/utils/pathPage'
import Image from 'next/image'
import {redirect} from 'next/navigation'

export default async function layout({children}: {children: React.ReactNode}) {
  const session = await auth()
  if (!session?.accessToken) {
    redirect(pathPage.signIn)
  }
  return (
    <main className='w-full h-fit min-h-screen xsm:min-h-[80vh] relative mb-[-1px]'>
      <Image
        src='/auth/bg-auth.jpg'
        alt=''
        width={1600}
        height={800}
        priority
        className='sticky top-0 left-0 h-screen w-full object-cover select-none pointer-events-none'
      />
      <div className='w-full relative z-10 -mt-[calc(100vh-10.94rem)] xsm:-mt-[calc(100vh-5.87rem)]'>
        <section className='w-[87.5rem] xsm:w-full mx-auto relative z-10 sm:flex sm:justify-between'>
          <Aside />
          <div
            id='main_dashboard'
            className='w-[66.6875rem] relative shrink-0 xsm:w-full xsm:px-4'
          >
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}
