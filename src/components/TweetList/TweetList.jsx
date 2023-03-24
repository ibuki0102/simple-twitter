// Jasmine

import styles from '../TweetList/TweetList.module.scss'
import { ReactComponent as Photo } from 'assets/icons/Photo.svg'

import TweetItemCollection from 'components/TweetItemCollection/TweetItemCollection'
import TweetModal from 'components/TweetModal/TweetModal'
import { useState } from 'react'

const TweetList = ({ users }) => {
  const [modalState, setModalState] = useState(false)
  return (
    <div className={styles.TweetListContainer}>
      <div className={styles.TweetListTopSection}>
        <h4>首頁</h4>
        <div onClick={() => setModalState(true)} className={styles.TweetArea}>
          <div className={styles.Post}>
            <Photo className={styles.Photo} />
            <h5>有什麼新鮮事？</h5>
          </div>
          <button>推文</button>
        </div>
      </div>
      {modalState && (
        <TweetModal setModalState={setModalState} modalState={modalState} />
      )}
      {/* <TweetModal avatar={avatar} /> */}
      <TweetItemCollection users={users} />
    </div>
  )
}

export default TweetList
