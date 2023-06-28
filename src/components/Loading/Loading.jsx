import React from 'react'
import styles from './Loading.module.scss'
const Loading = ({text}) => {

  return (
    <div className={styles.loading}>
        <div className={styles.loadingTitle}>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default Loading