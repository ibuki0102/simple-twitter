import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// 雪央新增 按下追隨的api
export const followUser = async ({ token, id }) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${authURL}/followships`,
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
// 雪央新增 取消追隨的api
export const unFollowUser = async ({ token, id }) => {
  try {
    const { data } = await axios({
      method: 'delete',
      url: `${authURL}/followships/${id}`,
      headers: { Authorization: 'Bearer ' + token },
    })
    return data
  } catch (error) {
    console.error('[UnFollowUser Failed]:', error)
    return { error }
  }
}
