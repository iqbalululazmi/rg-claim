import { Input } from '@components/Input'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ClaimApi } from 'src/shared/api/claim.api'
import { UserApi } from 'src/shared/api/user.api'
import { Layout } from '../components/Layout'

export default function KlaimPromo() {
  const router = useRouter()
  const [packages, setPackages] = useState<any>([])
  const [user, setUser] = useState<any>([])
  const [profile, setProfile] = useState<any>({})
  const [claimData, setClaimData] = useState<any>({})
  const [packageInfo, setPackageInfo] = useState<any>([])
  const [showSpinner, setShowSpinner] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'object') {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken === null) {
        router.push('/login')
      } else {
        const userStorage = JSON.parse(localStorage.getItem('user') || '')
        setProfile(userStorage)

        if (Object.keys(profile).length > 0) {
          async function fetchData() {
            const res: any = await ClaimApi.getByUserId(profile.username)
            const result = res.data === null ? {} : res.data
            setClaimData(result)
            if (Object.keys(claimData).length === 0) {
              await getUserPackages()
            }
          }
          fetchData()
        }
        console.log('claim', claimData)
        console.log('package', packages)
      }
    }
  }, [Object.keys(profile).length === 0, Object.keys(claimData).length === 0])

  const getUserPackages = async () => {
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

  const registerUser = async (e: any) => {
    e.preventDefault()

    const payload = {
      userId: user.userId,
      userPhoneNumber: e.target.phone.value,
      address: e.target.street_address.value,
      city: e.target.city.value,
      province: e.target.state.value,
      postalCode: e.target.postal_code.value,
      packages: packageInfo,
    }

    setShowSpinner(true)
    const result: any = await ClaimApi.createClaim(payload)
    if (result.status === 'error') {
      toast.error(result.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }

    console.log(showSpinner)
    setShowSpinner(false)
  }

  const goToSubscription = () => {
    window.location.href = 'https://bayar.ruangguru.com/npf/products'
  }

  if (Object.keys(profile).length === 0) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    )
  }

  if (packages.length === 0 && Object.keys(claimData).length === 0) {
    return (
      <Layout>
        <div className="flex flex-col justify-center text-center pt-10 pb-5">
          <h1 className="text-xl font-bold">
            Maaf kamu belum memiliki hadiah sekarang, klik langganan untuk berlangganan
          </h1>
          <div className="text-center flex flex-row justify-center mt-6">
            <button
              onClick={(e) => goToSubscription()}
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white-pure bg-orange-400 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Langganan Sekarang
              <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  if (
    (Object.keys(claimData).length > 0 && packages.length > 0) ||
    (Object.keys(claimData).length > 0 && packages.length === 0)
  ) {
    return (
      <Layout>
        <div className="flex flex-col justify-center text-center pt-10 pb-5">
          <h1 className="text-xl font-bold">
            Mohon menunggu, hadiah anda sedang kami proses ya 😇
          </h1>
        </div>
      </Layout>
    )
  }

  if (packages.length > 0 && Object.keys(claimData).length === 0) {
    return (
      <Layout>
        <section>
          <div className="text-center pt-10 pb-5">
            <h1 className=" text-3xl font-bold">Klaim hadiahmu sekarang juga!</h1>
          </div>
          <div className="px-20">
            <div className="px-20">
              <form onSubmit={(e) => registerUser(e)}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Nama Penerima
                        </label>
                        <Input value={user.userName} type="text" name="username" id="username" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          No Handphone
                        </label>
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
                        {packages.map((item: any) => (
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
                                          prize: item.prize,
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
                        <legend className="text-sm text-primary font-bold">
                          Alamat Pengiriman
                        </legend>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6">
                            <label className="block text-sm font-medium text-gray-700">
                              Alamat
                            </label>
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
                            <label className="block text-sm font-medium text-gray-700">
                              Provinsi
                            </label>
                            <Input type="text" name="state" id="state" />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Kodepos
                            </label>
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
                      {showSpinner && (
                        <div className="flex flex-col justify-center items-center">
                          <div className="loader ease-linear rounded-full border-2 border-t-2 border-white-pure h-4 w-4 mr-2"></div>
                        </div>
                      )}
                      Klaim
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  return <></>
}
