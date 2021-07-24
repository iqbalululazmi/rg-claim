import { Layout } from '@components/Layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Account() {
  const router = useRouter()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken === null) {
      router.push('/login')
    }
  }, [])

  return <Layout>Account</Layout>
}
