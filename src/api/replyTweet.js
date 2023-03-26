// 雪央

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// 雪央新增: 回覆API
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

// 雪央新增: 拿到回覆頁面下面的回覆列表
export const getReplyList = async ({ token, tweetId }) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `${authURL}/tweets/${tweetId}/replies`,
      headers: { Authorization: 'Bearer ' + token },
    })
    return data
  } catch (error) {
    console.error('[GetReplyList Failed]:', error)
    return { error }
  }
}
