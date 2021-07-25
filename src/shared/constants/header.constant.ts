import { BookOpenIcon } from '@heroicons/react/outline'

const navigations = [
  {
    name: 'Promo',
    href: '/promo',
    auth: 'no-auth',
  },
  {
    name: 'Klaim Promo',
    href: '/klaim-promo',
    auth: 'student',
  },
  {
    name: 'Claim Manager',
    href: '/admin/claim',
    auth: 'admin',
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
