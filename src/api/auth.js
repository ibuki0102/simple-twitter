// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/signin`, {
      account,
      password,
    })

    console.log(data);

    const { token } = data
    if (token) {
      return { success: true, ...data }
    }
    return data
  } catch (error) {
    console.error('[Login Failed]:', error)
  }
}
