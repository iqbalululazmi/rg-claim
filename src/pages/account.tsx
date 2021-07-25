import { Layout } from '@components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Account() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>({})

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken === null) {
      router.push('/login')
    } else {
      const user = localStorage.getItem('user')
      setProfile(JSON.parse(user || ''))
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <Layout>
      <div className="py-12 h-screen">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
          <div className="md:flex">
            <div className="w-full p-2 py-10">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
                    className="rounded-full"
                    width="80"
                  />
                  <span className="absolute border-white border-4 h-5 w-5 top-12 left-16 bg-green-700 rounded-full"></span>
                </div>
              </div>
              <div className="flex flex-col text-center mt-3 mb-4">
                <span className="text-2xl font-medium">{profile.fullname}</span>
                <span className="text-md text-gray-400">{profile.username}</span>
              </div>
              <div className="px-14 mt-5">
                <button
                  onClick={logout}
                  className="h-12 bg-red-400 text-white-pure w-full text-white text-md rounded hover:shadow hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
