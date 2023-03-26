// Jasmine

import LikeItem from 'components/LikeItem/LikeItem'

const LikeItemCollection = ({ likeTweets }) => {
  return (
    <div>
      {likeTweets.map((likeTweet) => {
        return <LikeItem key={likeTweet.id} likeTweet={likeTweet} />
      })}
    </div>
  )
}

export default LikeItemCollection
