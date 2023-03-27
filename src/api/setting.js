// Jasmine

import axios from 'axios'

const authURL = 'https://enigmatic-refuge-29514.herokuapp.com/api'

// Jasmine 新增: 編輯設定頁面'帳戶設定'的 API
export const patchInfo = async (payload) => {
  const { token, id, account, name, email, password, checkPassword } = payload
  try {
    const { data } = await axios({
      method: 'put',
      url: `${authURL}/users/${id}`,
      headers: { Authorization: 'Bearer ' + token },
      data: {
        account,
        name,
        email,
        password,
        checkPassword,
      },
    })
    return data
  } catch (error) {
    console.error('[UnFollowUser Failed]:', error)
    return { error }
  }
}
