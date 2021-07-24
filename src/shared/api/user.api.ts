const path = process.env.NEXT_PUBLIC_HOST || ''

const profile = async (token: string) => {
  const res = await fetch(path + '/api/v1/profile', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    method: 'GET',
  })
  return await res.json()
}

export const UserApi = { profile }
