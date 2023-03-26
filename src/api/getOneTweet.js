// 雪央

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

export const getOneTweet = async ({ token, tweetId }) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `${authURL}/tweets/${tweetId}`,
      headers: { Authorization: 'Bearer ' + token },
    })
    console.log(data)
    return data
  } catch (error) {
    console.error('[Tweet Failed]:', error)
    return { error }
  }
}
