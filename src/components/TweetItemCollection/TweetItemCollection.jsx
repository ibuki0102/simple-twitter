// Jasmine

import TweetItem from 'components/TweetItem/TweetItem'

const TweetItemCollection = ({ tweets, user, setUser }) => {
  return (
    <div>
      {tweets.map((tweet) => {
        return (
          <TweetItem
            key={tweet.id}
            tweet={tweet}
            user={user}
            setUser={setUser}
          />
        )
      })}
    </div>
  )
}

export default TweetItemCollection
