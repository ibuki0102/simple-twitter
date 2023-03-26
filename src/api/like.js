// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// Jasmine 新增: 按下喜歡推文的 API
export const likeTweet = async ({ token, id }) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${authURL}/tweets/${id}/like`,
      headers: { Authorization: 'Bearer ' + token },
      data: {
        id,
      },
    })
    return data
  } catch (error) {
    console.error('[FollowUser Failed]:', error)
    return { error }
  }
}

// Jasmine 新增: 取消喜歡推文的 API
export const unLikeTweet = async ({ token, id }) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${authURL}/tweets/${id}/unlike`,
      headers: { Authorization: 'Bearer ' + token },
      data: {
        id,
      },
    })
    return data
  } catch (error) {
    console.error('[FollowUser Failed]:', error)
    return { error }
  }
}
