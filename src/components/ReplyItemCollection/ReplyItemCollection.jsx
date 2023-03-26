// Jasmine

import ReplyItem from 'components/ReplyItem/ReplyItem'

const ReplyItemCollection = ({ replyTweets }) => {
  return (
    <div>
      {replyTweets.map((replyTweet) => {
        return <ReplyItem key={replyTweet.id} replyTweet={replyTweet} />
      })}
    </div>
  )
}

export default ReplyItemCollection
