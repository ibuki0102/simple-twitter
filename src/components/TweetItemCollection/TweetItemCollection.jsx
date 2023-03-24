// Jasmine

import TweetItem from 'components/TweetItem/TweetItem'

const TweetItemCollection = ({ users }) => {
  return (
    <div>
      {users.map((user) => {
        return <TweetItem key={user.id} user={user} />
      })}
    </div>
  )
}

export default TweetItemCollection
