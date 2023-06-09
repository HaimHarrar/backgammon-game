import React from 'react'
import styles from './Checker.module.scss'
import { COLORS } from '../../features/enums'

const Checker = ({color, text}) => {
  return (
    <div className={styles.checker} style={{backgroundColor: color, border: `1px solid ${color===COLORS.PLAYER_1? COLORS.PLAYER_2: COLORS.PLAYER_1}`}}>
        {text}
    </div>
  )
}

export default Checker