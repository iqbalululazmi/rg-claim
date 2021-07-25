import { Input } from '@components/Input'
import { Layout } from '../components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserApi } from 'src/shared/api/user.api'

export default function KlaimPromo() {
  const router = useRouter()
  const [packages, setPackages] = useState<any>([])
  const [user, setUser] = useState<any>([])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken === null) {
      router.push('/login')
    } else {
      getUserPackages()
    }
  }, [])

  const getUserPackages = async () => {
    const profile = JSON.parse(localStorage.getItem('user') || '')
    const userPackages = await UserApi.userPackages(profile.username)
    userPackages.packages.forEach((item: any) => {
      switch (item.packageTag) {
        case 'ruangguru':
          item.prize = 'Pencils'
          break
        case 'skillacademy':
          item.prize = 'Tas'
          break
        case 'englishacademy':
          item.prize = 'Sepatu'
          break
      }

      switch (item.orderStatus) {
        case 'SUCCEED':
          item.disabledCheckbox = false
          break
        default:
          item.disabledCheckbox = true
          break
      }

      item.checkedValue = false
    })
    setPackages(userPackages.packages)
    setUser(userPackages.user)
  }

  return (
    <Layout>
      <section>
        <div className="text-center pt-10 pb-5">
          <h1 className=" text-3xl font-bold">Klaim hadiahmu sekarang juga!</h1>
        </div>
        <div className="px-20">{formSubmission(packages, user)}</div>
      </section>
    </Layout>
  )
}

const formSubmission = (packages: any[], user: any) => {
  const [packageInfo, setPackageInfo] = useState<any>([])

  const registerUser = async (e: any) => {
    e.preventDefault()

    const payload = {
      userId: user.userId,
      city: e.target.postal_code.value,
      packages: packageInfo,
    }
    console.log(payload)
  }

  return (
    <div className="px-20">
      <form onSubmit={registerUser}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Nama Penerima</label>
                <Input value={user.userName} type="text" name="username" id="username" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">No Handphone</label>
                <Input
                  value={user.userPhoneNumber}
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                />
              </div>

              <fieldset className=" col-span-6 border border-solid border-gray-200 rounded-md p-6">
                <legend className="text-sm text-primary font-bold">Pilih Hadiah</legend>
                {packages.map((item) => (
                  <div key={item.packageTag} className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="inline-flex items-center mt-3">
                        <input
                          type="checkbox"
                          id={item.packageTag}
                          name={item.packageTag}
                          className="form-checkbox h-5 w-5 text-red-600"
                          disabled={item.disabledCheckbox}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPackageInfo([
                                ...packageInfo,
                                {
                                  packageTag: item.packageTag,
                                  packageName: item.packageName,
                                  packageSerial: item.packageSerial,
                                  orderStatus: item.orderStatus,
                                },
                              ])
                            } else {
                              // remove from list
                              setPackageInfo(
                                packageInfo.filter(
                                  (pack: any) => pack.packageTag !== item.packageTag
                                )
                              )
                            }
                          }}
                        />
                        <span className="ml-2 text-gray-700">
                          {item.prize} - {item.packageName}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </fieldset>

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
