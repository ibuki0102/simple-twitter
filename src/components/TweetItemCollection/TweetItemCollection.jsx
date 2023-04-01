// Jasmine

import TweetItem from 'components/TweetItem/TweetItem'
import styles from 'components/TweetItemCollection/TweetItemCollection.module.scss'

const TweetItemCollection = ({ tweets, user, setUser, setUpdateTweetList }) => {
  return (
    <div className={styles.TweetItemContainer}>
      {tweets.map((tweet) => {
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
