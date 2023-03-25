// Jasmine

import TweetItem from 'components/TweetItem/TweetItem'

const TweetItemCollection = ({ tweets }) => {
  return (
    <div>
      {tweets.map((tweet) => {
        return <TweetItem key={tweet.id} tweet={tweet} />
      })}
    </div>
  )
}

export default TweetItemCollection
