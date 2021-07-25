const path = process.env.NEXT_PUBLIC_HOST || ''

const createClaim = async (payload: any) => {
  const res = await fetch(path + '/api/v1/subscription', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    method: 'POST',
  })
  return await res.json()
}

const getAllClaim = async () => {
  const res = await fetch(path + '/api/v1/subscription', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
  return await res.json()
}

const updateClaimStatus = async (userId: string, status: string) => {
  const res = await fetch(path + '/api/v1/claimStatus/' + userId, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
    method: 'PUT',
  })
  return await res.json()
}

export const ClaimApi = { createClaim, getAllClaim, updateClaimStatus }
