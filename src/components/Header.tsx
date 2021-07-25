/* This example requires Tailwind CSS v2.0+ */
import { Button } from '@components/Button'
import { HeaderConstant } from '@constants/header.constant'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

export const Header = () => {
  let navigations = HeaderConstant.navigations
  const mobileNavigations = HeaderConstant.mobileNavigations
  const router = useRouter()
  const [profile, setProfile] = useState<any>({})
  const [menu, setMenu] = useState<any>([])

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user === null) {
      navigations = navigations.filter((menu) => menu.auth === 'no-auth')
    } else {
      setProfile(JSON.parse(user))
      if (profile.role === 'student') {
        navigations = navigations.filter(
          (menu) => menu.auth === profile.role || menu.auth === 'no-auth'
        )
      } else {
        navigations = navigations.filter((menu) => menu.auth === profile.role)
      }
    }

    setMenu(navigations)
    console.log(menu)
  }, [Object.keys(profile).length === 0])

  return (
    <div>
      <Popover className="relative bg-white">
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto px-4 sm:px-10 sm:pt-4 mb-3">
              <div className="flex items-center py-3 md:justify-start md:space-x-10">
                <div className="flex space-x-4 justify-start items-center lg:w-0 lg:flex-1">
                  <div className="flex justify-start">
                    <a href="#" className="text-primary bold font-semibold text-xl">
                      <Image
                        src="/images/logo-rg.svg"
                        width="40"
                        height="40"
                        alt="Picture of the author"
                      />
                    </a>
                  </div>
                  <div className="hidden md:flex items-center justify-start md:flex-1 lg:w-0"></div>
                  {menu.map((item: any) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={`${
                          router.pathname === item.href ? 'text-primary' : ''
                        } mr-4 whitespace-nowrap text-lg font-medium text-gray-500 hover:text-primary`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-end">
                  {Object.keys(profile).length === 0 ? (
                    <Button className="rounded-xl h-12 border p-4 bg-orange-400 text-white-pure flex flex-col justify-center text-center ">
                      Langganan Sekarang
                    </Button>
                  ) : (
                    <Link href="/account">
                      <a
                        className={`${
                          router.pathname === '/account' ? 'text-primary' : ''
                        } mr-4 whitespace-nowrap text-lg font-medium text-gray-500 hover:text-primary`}
                      >
                        <div>{profile.username}</div>
                      </a>
                    </Link>
                  )}
                </div>
                <div className="-mr-2 -my-2 md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>

            {/* if device mobile */}
            <Transition
              show={open}
              as={Fragment}
              enter="duration-200 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      <div>Ruanggurus</div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-8">
                        {mobileNavigations.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                          >
                            <item.icon
                              className="flex-shrink-0 h-6 w-6 text-indigo-600"
                              aria-hidden="true"
                            />
                            <span className="ml-3 text-base font-medium text-gray-900">
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
