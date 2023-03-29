import { PageContext, initialPage } from 'contexts/PageContext'
import { ReplyContextProvider } from 'contexts/ReplyContext'
import { ReplyTweetContext } from 'contexts/ReplyTweetContext'
import { UserContext, userId } from './UserContext'
import { TweetModalContext } from './TweetModalContext'
import { useState } from 'react'

export const ContextProvider = ({ children }) => {
  const [page, setPage] = useState(initialPage)
  const [replyTweetId, setReplyTweetId] = useState('')
  const [user, setUser] = useState(userId)
  const [modalState, setModalState] = useState(false)
  return (
    <TweetModalContext.Provider value={[modalState, setModalState]}>
      <UserContext.Provider value={[user, setUser]}>
        <PageContext.Provider value={[page, setPage]}>
          <ReplyTweetContext.Provider value={[replyTweetId, setReplyTweetId]}>
            <ReplyContextProvider>{children}</ReplyContextProvider>
          </ReplyTweetContext.Provider>
        </PageContext.Provider>
      </UserContext.Provider>
    </TweetModalContext.Provider>
  )
}
