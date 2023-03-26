// 雪央

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

export const replyTweet = async ({ token, userId, tweetId, comment }) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${authURL}/tweets/${tweetId}/replies`,
      headers: { Authorization: 'Bearer ' + token },
      data: { userId, tweetId, comment },
    })
    console.log(data)
    return data
  } catch (error) {
    console.error('[ReplyTweet Failed]:', error)
    return { error }
  }
}
