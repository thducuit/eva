import IndexAccount from '@/app/(main)/(user)/tai-khoan/_components/IndexAccount'

// Force dynamic rendering since this page uses authentication
export const dynamic = 'force-dynamic'

export default function page() {
  return <IndexAccount />
}
