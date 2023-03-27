// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// 登入用API
export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/signin`, {
      account,
      password,
    })
    const userId = data.data.user.id
    const { token } = data.data
    if (token) {
      return { success: true, userId, token }
    }
    return data
  } catch (error) {
    const errorMessage = error.response.data.message
    console.error('[Login Failed]:', error.response.data.message)
    return { errorMessage }
  }
}

// 註冊用API
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

// 雪央新增: 拿到使用者資料的API
export const getUserData = async ({ token, userId }) => {
  try {
    const { data } = await axios.get(`${authURL}/users/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (data) {
      return { success: true, ...data }
    }
    return data
  } catch (error) {
    console.error('[GetUserData Failed]:', error)
    return { error }
  }
}

// 雪央新增 拿到top10受歡迎的使用者資料的API
export const getPopularUserList = async ({ token }) => {
  try {
    const { data } = await axios.get(`${authURL}/users/top`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data.data.result
  } catch (error) {
    console.error('[GetPopularUserList Failed]:', error)
    return { error }
  }
}

// Jasmine 新增: 後台登入用API
export const adminLogin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/admin/signin`, {
      account,
      password,
    })
    const userId = data.data.user.id
    const { token } = data.data
    if (token) {
      return { success: true, userId, token }
    }
    return data
  } catch (error) {
    const errorMessage = error.response.data.message
    console.error('[Login Failed]:', error.response.data.message)
    return { errorMessage }
  }
}
