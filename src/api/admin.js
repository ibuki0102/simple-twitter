// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// Jasmine 新增: 拿到後台推文清單的 API
export const getAdminTweetList = async ({ token }) => {
  try {
    const { data } = await axios.get(`${authURL}/admin/tweets`, {
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

// Jasmine 新增: 拿到後台使用者清單的 API
export const getAdminUserList = async ({ token }) => {
  try {
    const { data } = await axios.get(`${authURL}/admin/users`, {
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

// Jasmine 新增: 刪除後台推文清單某一特定推文的 API
export const deleteTweet = async ({ token, id }) => {
  try {
    const { data } = await axios({
      method: 'delete',
      url: `${authURL}/admin/tweets/${id}`,
      headers: { Authorization: 'Bearer ' + token },
    })
    return data
  } catch (error) {
    console.error('[UnFollowUser Failed]:', error)
    return { error }
  }
}
