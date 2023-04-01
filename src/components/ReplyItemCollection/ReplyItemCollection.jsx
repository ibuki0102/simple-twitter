// Jasmine

import ReplyItem from 'components/ReplyItem/ReplyItem'
import stlyes from 'components/ReplyItemCollection/ReplyItemCollection.module.scss'

const ReplyItemCollection = ({ replyTweets }) => {
  let replyList = replyTweets.map((replyTweet) => {
    return <ReplyItem key={replyTweet.id} replyTweet={replyTweet} />
  })

  return <div className={stlyes.ReplyItemContainer}>{replyList}</div>
}

export default ReplyItemCollection
