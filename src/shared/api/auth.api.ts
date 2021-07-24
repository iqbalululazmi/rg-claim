const path = process.env.NEXT_PUBLIC_HOST || ''

const login = async (data: any) => {
  const res = await fetch(path + '/api/v1/auth/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
    method: 'POST',
  })
  return await res.json()
}

export const AuthAPi = { login }
