import { Layout } from '@components/Layout'
import { useEffect, useState } from 'react'
import { ClaimApi } from 'src/shared/api/claim.api'
import moment from 'moment'
import { toast } from 'react-toastify'

export default function ClaimPage() {
  //   const router = useRouter()
  const [claims, setClaims] = useState<any>([])
  const [showModal, setShowModal] = useState(false)
  const [editedData, setEditedData] = useState({})

  useEffect(() => {
    getAllClaim()
  }, [])

  const getAllClaim = async () => {
    const allClaim = await ClaimApi.getAllClaim()
    console.log(allClaim)
    setClaims(allClaim.data)
  }

  const editData = (item: any) => {
    setEditedData(item)
    setShowModal(true)
  }

  const modalCallback = (e: boolean) => {
    setShowModal(e)
    getAllClaim()
  }

  return (
    <Layout>
      <div className="py-12 h-screen">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Package Tag
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Package Serial
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white-pure divide-y divide-gray-200">
                    {claims.map((item: any) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
                              <div className="text-sm text-gray-500">{item.userId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.userPhoneNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.packageTag}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.packageSerial}
                        </td>
                        <td className="px-6 py-4 w-60">
                          <div className="text-sm text-gray-900">
                            {item.city} - {item.province}, {item.postalCode}
                          </div>
                          <div className="text-sm text-gray-500">{item.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.status === 'created' && 'bg-cyan-100 text-cyan-800'}
                          ${item.status === 'delivery' && 'bg-green-100 text-green-800'}
                          ${item.status === 'rejected' && 'bg-red-100 text-red-800'}
                          `}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {item.status === 'created' && (
                            <button
                              onClick={(e) => editData(item)}
                              type="button"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <Modal
            data={editedData}
            showModal={showModal}
            parentCallback={(e: any) => modalCallback(e)}
          />
        )}
      </div>
    </Layout>
  )
}

const Modal = ({ showModal, parentCallback, data }: any) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('delivery')

  function handleSelectChange(event: any) {
    setSelectedStatus(event.target.value)
  }

  const updateStatus = async () => {
    try {
      const result: any = await ClaimApi.updateClaimStatus(data.userId, selectedStatus)
      toast.success(result.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
      console.log(result)
      parentCallback(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white-pure outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    {data.userId} - {data.packageSerial}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => parentCallback(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="relative inline-block w-full text-gray-700">
                    <select
                      value={selectedStatus}
                      onChange={handleSelectChange}
                      className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                      placeholder="Regular input"
                    >
                      <option value="delivery">Delivery</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>{' '}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => parentCallback(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white-pure active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => updateStatus()}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
