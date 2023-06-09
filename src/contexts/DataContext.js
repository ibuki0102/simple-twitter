import { PageContext, initialPage } from 'contexts/PageContext'
import { ReplyContextProvider } from 'contexts/ReplyContext'
import { ReplyTweetContext } from 'contexts/ReplyTweetContext'
import { UserContext, userId } from './UserContext'
import { TweetModalContext } from './TweetModalContext'
import { useState } from 'react'
import { NotiContext } from './NotiContext'
import { NotiTypeContext, initialType } from './NoitTypeContext'
import { ErrorMessageContext, initialErrorMessage } from './ErrorMessageContext'
import { UpdateTweetContext, initialState } from './UpdateTweetContext'

export const ContextProvider = ({ children }) => {
  const [page, setPage] = useState(initialPage)
  const [replyTweetId, setReplyTweetId] = useState('')
  const [user, setUser] = useState(userId)
  const [modalState, setModalState] = useState(false)
  const [notiState, setNotiState] = useState(false)
  const [notiType, setNotiType] = useState(initialType)
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage)
  const [updateTweetList, setUpdateTweetList] = useState(initialState)
  return (
    <UpdateTweetContext.Provider value={[updateTweetList, setUpdateTweetList]}>
      <ErrorMessageContext.Provider value={[errorMessage, setErrorMessage]}>
        <NotiTypeContext.Provider value={[notiType, setNotiType]}>
          <NotiContext.Provider value={[notiState, setNotiState]}>
            <TweetModalContext.Provider value={[modalState, setModalState]}>
              <UserContext.Provider value={[user, setUser]}>
                <PageContext.Provider value={[page, setPage]}>
                  <ReplyTweetContext.Provider
                    value={[replyTweetId, setReplyTweetId]}
                  >
                    <ReplyContextProvider>{children}</ReplyContextProvider>
                  </ReplyTweetContext.Provider>
                </PageContext.Provider>
              </UserContext.Provider>
            </TweetModalContext.Provider>
          </NotiContext.Provider>
        </NotiTypeContext.Provider>
      </ErrorMessageContext.Provider>
    </UpdateTweetContext.Provider>
  )
}
