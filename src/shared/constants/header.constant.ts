import { BookOpenIcon } from '@heroicons/react/outline'

const navigations = [
  {
    name: 'Promo',
    href: '/promo',
  },
  {
    name: 'Klaim Promo',
    href: '/klaim-promo',
  },
]

const mobileNavigations = [
  {
    name: 'Promo',
    href: 'promo',
    icon: BookOpenIcon,
  },
]

export const HeaderConstant = {
  navigations,
  mobileNavigations,
}
