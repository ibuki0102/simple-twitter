// Jasmine

import ReplyItem from 'components/ReplyItem/ReplyItem'

const ReplyItemCollection = ({ replyTweets }) => {
  let replyList = replyTweets.map((replyTweet) => {
    return <ReplyItem key={replyTweet.id} replyTweet={replyTweet} />
  })

  return <div>{replyList}</div>
}

export default ReplyItemCollection
