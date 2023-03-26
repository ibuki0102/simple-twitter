import { PageContext, initialPage } from 'contexts/PageContext'
import { ReplyContextProvider } from 'contexts/ReplyContext'
import { ReplyTweetContext } from 'contexts/ReplyTweetContext'
import { useState } from 'react'

export const ContextProvider = ({ children }) => {
  const [page, setPage] = useState(initialPage)
  const [replyTweetId, setReplyTweetId] = useState('')
  return (
    <PageContext.Provider value={[page, setPage]}>
      <ReplyTweetContext.Provider value={[replyTweetId, setReplyTweetId]}>
        <ReplyContextProvider>{children}</ReplyContextProvider>
      </ReplyTweetContext.Provider>
    </PageContext.Provider>
  )
}
