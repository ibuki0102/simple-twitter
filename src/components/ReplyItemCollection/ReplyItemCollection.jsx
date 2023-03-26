// Jasmine

import ReplyItem from 'components/ReplyItem/ReplyItem'

const ReplyItemCollection = ({ replyListData, replyTweetData }) => {
  const replyList = replyListData.map((replyTweet) => {
    return (
      <ReplyItem
        key={replyTweet.TweetId}
        replyTweet={replyTweet}
        replyTweetData={replyTweetData}
      />
    )
  })
  return <div>{replyList}</div>
}

export default ReplyItemCollection
