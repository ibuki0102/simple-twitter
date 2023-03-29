// Jasmine

import TweetItem from 'components/TweetItem/TweetItem'

const TweetItemCollection = ({ tweets, user, setUser, setUpdateTweetList }) => {
  return (
    <div>
      {tweets.map((tweet) => {
        console.log('hi...')
        return (
          <TweetItem
            key={tweet.id}
            tweet={tweet}
            user={user}
            setUser={setUser}
            setUpdateTweetList={setUpdateTweetList}
          />
        )
      })}
    </div>
  )
}

export default TweetItemCollection
