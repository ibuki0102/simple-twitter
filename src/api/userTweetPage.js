// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// 雪央 新增: 拿到使用者的所有推文
export const getUserPostTweets = async ({ token, userId }) => {
  try {
    const { data } = await axios.get(`${authURL}/users/${userId}/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  } catch (error) {
    console.error('[GetUserTweets Failed]:', error)
    return { error }
  }
}

// Jasmine 新增: 拿到使用者的所有回覆推文
export const getUserReplyTweets = async ({ token, userId }) => {
  try {
    const { data } = await axios.get(
      `${authURL}/users/${userId}/replied_tweets`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  } catch (error) {
    console.error('[GetUserTweets Failed]:', error)
    return { error }
  }
}
