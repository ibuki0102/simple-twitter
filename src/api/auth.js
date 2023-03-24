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
    console.error('[Login Failed]:', error)
    return { error }
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

// Jasmine 新增: 拿到使用者首頁推文的API
export const getMainPageUserTweets = async ({ token, userId }) => {
  try {
    const { data } = await axios.get(`${authURL}/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  } catch (error) {
    console.error('[GetUserData Failed]:', error)
    return { error }
  }
}
// 雪央 新增: 拿到使用者的所有推文(未完成)
export const getUserTweets = async ({ token, userId }) => {
  try {
    const { data } = await axios.get(`${authURL}/users/${userId}/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
        if (data) {
      return { success: true, ...data }
    }
    return data
  } catch (error) {
    console.error('[GetUserTweets Failed]:', error)
    return { error }
  }
}


