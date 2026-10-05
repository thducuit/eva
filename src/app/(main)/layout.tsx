import {Toaster} from '@/components/ui/sonner'
import fetchData from '@/fetches/fetchData'
import {Header} from '@/layout/header/Header'
import Footer from '@/layout/footer/Footer'
import endpoints from '@/utils/endpoints'
import NextTopLoader from 'nextjs-toploader'
import {SessionProvider} from 'next-auth/react'
import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'AMA DESIGN & BUILD',
  description: 'AMA DESIGN & BUILD',
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await fetchData({
    api: endpoints.options.list,
    option: {
      next: {
        revalidate: 86400,
      },
    },
  })

  return (
    <SessionProvider>
      <Header data={data.header} />
      {children}
      <Footer data={data.footer} />
      <Toaster
        richColors
        position='top-center'
      />
      <NextTopLoader
        color='linear-gradient(90deg, #A6762C 0%, #F0D977 100%)'
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing='ease'
        speed={200}
        shadow='0 0 10px #A6762C,0 0 5px #A6762C'
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
    </SessionProvider>
  )
}
