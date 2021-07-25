import { ClipboardCheckIcon, DocumentIcon, ServerIcon, TicketIcon } from '@heroicons/react/outline'

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
  {
    name: 'Documentation',
    href: '/doc',
    auth: 'no-auth',
  },
]

const mobileNavigations = [
  {
    name: 'Promo',
    href: '/promo',
    auth: 'no-auth',
    icon: TicketIcon,
  },
  {
    name: 'Klaim Promo',
    href: '/klaim-promo',
    auth: 'student',
    icon: ClipboardCheckIcon,
  },
  {
    name: 'Claim Manager',
    href: '/admin/claim',
    auth: 'admin',
    icon: ServerIcon,
  },
  {
    name: 'Documentation',
    href: '/doc',
    auth: 'no-auth',
    icon: DocumentIcon,
  },
]

export const HeaderConstant = {
  navigations,
  mobileNavigations,
}
