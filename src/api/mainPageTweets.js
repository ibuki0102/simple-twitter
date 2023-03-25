// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

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
