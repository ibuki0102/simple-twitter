// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/signin`, {
      account,
      password,
    })
    const { token } = data.data
    if (token) {
      return { success: true, ...data, token }
    }
    return data
  } catch (error) {
    console.error('[Login Failed]:', error)
    return { error }
  }
}

export const regist = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    })
    console.log(data)
    const { status } = data
    if (status === 'success') {
      return { success: true, ...data }
    }
    return data
  } catch (error) {
    const errorMessage = error.response.data.message
    console.error('[Regist Failed]:', error.response.data.message)
    return { errorMessage }
  }
}
