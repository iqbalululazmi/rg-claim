const PATH_HEROKU = process.env.NEXT_PUBLIC_HOST || ''
const PATH_RG_SERVER = process.env.NEXT_PUBLIC_RG_SERVER || ''

const profile = async (token: string) => {
  const res = await fetch(PATH_HEROKU + '/api/v1/profile', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    method: 'GET',
  })
  return await res.json()
}

const userPackages = async (userId: string) => {
  const res = await fetch(PATH_RG_SERVER + '/rg-package-dummy?' + new URLSearchParams({ userId }), {
    method: 'GET',
  })
  return await res.json()
}

export const UserApi = { profile, userPackages }
