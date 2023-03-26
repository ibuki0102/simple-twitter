// 雪央

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// 雪央新增: 拿到特定推文資料的API
export const getOneTweet = async ({ token, tweetId }) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `${authURL}/tweets/${tweetId}`,
      headers: { Authorization: 'Bearer ' + token },
    })
    return data
  } catch (error) {
    console.error('[Tweet Failed]:', error)
    return { error }
  }
}
