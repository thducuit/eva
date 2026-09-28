import {auth} from '@/auth'
import pathPage from '@/utils/pathPage'
import Image from 'next/image'
import {redirect} from 'next/navigation'

export default async function layout({children}: {children: React.ReactNode}) {
  const session = await auth()
  if (session?.accessToken) {
    redirect(pathPage.dashboard)
  }
  return (
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
          <div className='sm:w-[30.6rem] relative z-10'>{children}</div>
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
  )
}
