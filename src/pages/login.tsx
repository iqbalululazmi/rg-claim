import { Layout } from '@components/Layout'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { AuthAPi } from 'src/shared/api/auth.api'
import { UserApi } from 'src/shared/api/user.api'

export default function Login() {
  const router = useRouter()
  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      router.push('/account')
    }
  })

  const doLogin = async (event: any) => {
    event.preventDefault()
    const usernameValue: any = event.target.username.value
    const passwordValue = event.target.password.value
    if (!usernameValue) {
      toast.error('Maaf, username tidak boleh kosong', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
      })
      return
    }

    setShowSpinner(true)
    const result: any = await AuthAPi.login({ username: usernameValue, password: passwordValue })
    if (result.status === 'error') {
      toast.error(result.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
      return
    }

    const profile: any = await UserApi.profile(result.data.accessToken)
    if (profile.status === 'error') {
      toast.error(result.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
      return
    }

    console.log(profile)
    localStorage.setItem('accessToken', result.data.accessToken)
    localStorage.setItem('user', JSON.stringify(profile.data))
    toast.success(result.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    setShowSpinner(false)
  }

  return (
    <Layout>
      <div className="w-full h-600 flex items-center justify-center">
        <form className="w-full md:w-1/3 bg-white rounded-lg" onSubmit={doLogin}>
          <div className="flex font-bold justify-center mt-6 mb-8">
            <img
              className="h-20 w-20"
              src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
            />
          </div>
          <h2 className="text-3xl text-center mb-8">Masuk untuk mengambil hadiahmu</h2>
          <div className="px-12 pb-10">
            <div className="w-full mb-2">
              <div className="flex items-center">
                <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="-mx-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="w-full mb-2">
              <div className="flex items-center">
                <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  id="passowrd"
                  name="password"
                  className="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <a href="#" className="text-xs text-gray-500 float-right mb-4">
              Forgot Password?
            </a>
            <button
              type="submit"
              disabled={showSpinner}
              className="w-full py-2  inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white-pure bg-primary hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showSpinner && (
                <div className="flex flex-col justify-center items-center">
                  <div className="loader ease-linear rounded-full border-2 border-t-2 border-white-pure h-4 w-4 mr-2"></div>
                </div>
              )}
              Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
