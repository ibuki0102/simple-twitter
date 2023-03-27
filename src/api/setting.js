// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// Jasmine 新增: 編輯設定頁面'帳戶設定'的 API
export const patchInfo = async (payload) => {
  const { token, userId, account, name, email, password, checkPassword } =
    payload.payloadData
  let payLoadData = { token, userId, name }
  if (account) {
    payLoadData = { ...payLoadData, account }
  }
  if (email) {
    payLoadData = { ...payLoadData, email }
  }
  if (password) {
    payLoadData = { ...payLoadData, password, checkPassword }
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
    console.error('[PatchInfo Failed]:', error)
    return { error }
  }
}
