import { Input } from '@components/Input'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Layout } from '../components/Layout'

export default function KlaimPromo() {
  const path = 'https://us-central1-silicon-airlock-153323.cloudfunctions.net/rg-package-dummy?'
  const [userPackage, setUserPackage] = useState<any>({})
  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  const getUserPackage = async (event: any) => {
    event.preventDefault()
    const usernameValue = event.target.username.value
    if (!usernameValue) {
      toast.error('Maaf, username tidak boleh kosong', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
      })
      return
    }

    setShowSpinner(true)
    const res = await fetch(path + new URLSearchParams({ userId: usernameValue }), {
      method: 'GET',
    })

    const result = await res.json()

    if (result.status === 'error') {
      toast.error(result.message, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
      })
    } else {
      setUserPackage(result)
    }
    setShowSpinner(false)
  }

  return (
    <Layout>
      <section>
        <div className="text-center pt-10 pb-5">
          <h1 className=" text-3xl font-bold">Klaim hadiahmu sekarang juga!</h1>
        </div>
        <div className="px-20">
          {Object.keys(userPackage).length === 0 ? (
            <form onSubmit={getUserPackage}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">Username</label>
                      <Input type="text" name="username" id="username" />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={showSpinner}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white-pure bg-primary hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {showSpinner && (
                      <div className="flex flex-col justify-center items-center">
                        <div className="loader ease-linear rounded-full border-2 border-t-2 border-white-pure h-4 w-4 mr-2"></div>
                      </div>
                    )}
                    Check Your Account
                  </button>
                </div>
              </div>
            </form>
          ) : (
            formSubmission()
          )}
        </div>
      </section>
    </Layout>
  )
}

const formSubmission = () => {
  const registerUser = async (event: any) => {
    event.preventDefault()

    const res = await fetch('/api/register', {
      body: JSON.stringify({
        name: event.target.name.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = await res.json()
    console.log(result)
  }

  return (
    <div className="px-20">
      <form onSubmit={registerUser}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">First name</label>
                <Input type="text" name="first_name" id="first_name" autoComplete="given-name" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Last name</label>
                <Input type="text" name="last_name" id="last_name" autoComplete="family-name" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <Input type="text" name="username" id="username" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">No Handphone</label>
                <Input type="tel" name="phone" id="phone" autoComplete="phone" />
              </div>

              <fieldset className=" col-span-6 border border-solid border-gray-200 rounded-md p-6">
                <legend className="text-sm text-primary font-bold">Alamat Pengiriman</legend>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Street address
                    </label>
                    <Input
                      type="text"
                      name="street_address"
                      id="street_address"
                      autoComplete="street-address"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <Input type="text" name="city" id="city" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <Input type="text" name="state" id="state" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                    <Input
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      autoComplete="postal-code"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white-pure bg-primary hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Klaim
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
