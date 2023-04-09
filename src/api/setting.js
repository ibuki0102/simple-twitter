// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// Jasmine 新增: 編輯設定頁面'帳戶設定'的 API
// 雪央新增 : 完成帳戶設定API
export const patchInfo = async (payload) => {
  const { token, userId, account, name, email, password, checkPassword } =
    payload.payloadData
  let payLoadData = { token, userId, name, account, email }
  if (password) {
    payLoadData = { ...payLoadData, password }
  }
  if (checkPassword) {
    payLoadData = { ...payLoadData, checkPassword }
  }
  try {
    const { data } = await axios({
      method: 'put',
      url: `${authURL}/users/${userId}/profile`,
      headers: { Authorization: 'Bearer ' + token },
      data: payLoadData,
    })
    return data
  } catch (error) {
    const errorMessage = error.response.data.message
    console.error('[PatchInfo Failed]:', error)
    return { errorMessage }
  }
}

// 雪央新增: 修改個人資料API
export const editUserProfile = async ({ payload }) => {
  const { token, userId, introduction, name, avatar, cover } = payload
  let formData = new FormData()
  formData.append('name', name)
  formData.append('introduction', introduction)
  formData.append('avatar', avatar)
  formData.append('cover', cover)
  try {
    const { data } = await axios({
      method: 'put',
      url: `${authURL}/users/${userId}`,
      headers: {
        Authorization: 'Bearer ' + token,
        'content-type': 'multipart/form-data',
      },
      data: formData,
    })
    return data
  } catch (error) {
    const errorMessage = error.response.data.message
    console.error('[PatchInfo Failed]:', error)
    return { errorMessage }
  }
}
