// Jasmine

import LikeItem from 'components/LikeItem/LikeItem'
import styles from 'components/LikeItemCollection/LikeItemCollection.module.scss'

const LikeItemCollection = ({ likeTweets }) => {
  return (
    <div className={styles.LikeItemContainer}>
      {likeTweets.map((likeTweet) => {
        return <LikeItem key={likeTweet.id} likeTweet={likeTweet} />
      })}
    </div>
  )
}

export default LikeItemCollection
