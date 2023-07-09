import React from 'react'
import styles from './Message.module.scss'
const Message = ({text}) => {

  return (
    <div className={styles.message}>
        <div className={styles.messageTitle}>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default Message