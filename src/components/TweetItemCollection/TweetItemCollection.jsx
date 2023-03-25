// Jasmine

import TweetItem from 'components/TweetItem/TweetItem'

const TweetItemCollection = ({ tweets, page }) => {
  return (
    <div>
      {tweets.map((tweet) => {
        return <TweetItem key={tweet.id} tweet={tweet} page={page} />
      })}
    </div>
  )
}

export default TweetItemCollection
