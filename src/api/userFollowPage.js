// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// Jasmine 新增: 拿到使用者的追隨者資料的API
export const getUserFollowers = async ({ token, userId }) => {
  try {
    const { data } = await axios.get(`${authURL}/users/${userId}/followers`, {
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

// Jasmine 新增: 拿到使用者正在追隨資料的API
export const getUserFollowings = async ({ token, userId }) => {
  try {
    const { data } = await axios.get(`${authURL}/users/${userId}/followings`, {
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