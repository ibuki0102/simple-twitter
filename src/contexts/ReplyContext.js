import { createContext, useState, useContext } from 'react'

const replyModalStateContext = createContext(false)

export const useReplyContext = () => useContext(replyModalStateContext)
export const ReplyContextProvider = ({ children }) => {
  const [replyModalState, setReplyModalState] = useState(false)
  const replyModalStateData = { replyModalState, setReplyModalState }
  return (
    <replyModalStateContext.Provider value={replyModalStateData}>
      {children}
    </replyModalStateContext.Provider>
  )
}
