import { Input } from '@components/Input'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Layout } from '../components/Layout'

export default function KlaimPromo() {
  const router = useRouter()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken === null) {
      router.push('/login')
    }
  })

  return (
    <Layout>
      <section>
        <div className="text-center pt-10 pb-5">
          <h1 className=" text-3xl font-bold">Klaim hadiahmu sekarang juga!</h1>
        </div>
        <div className="px-20">{formSubmission()}</div>
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
                <label className="block text-sm font-medium text-gray-700">Nama Penerima</label>
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
                    <label className="block text-sm font-medium text-gray-700">Alamat</label>
                    <Input
                      type="text"
                      name="street_address"
                      id="street_address"
                      autoComplete="street-address"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Kota</label>
                    <Input type="text" name="city" id="city" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Provinsi</label>
                    <Input type="text" name="state" id="state" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Kodepos</label>
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
