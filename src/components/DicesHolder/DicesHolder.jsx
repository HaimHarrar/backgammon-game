import React from 'react'
import styles from './DicesHolder.module.scss'
import { useSelector } from 'react-redux'
import { dicesSelector } from '../../features/dicesSlice'
import Dice from '../Dice/Dice'
import { COLORS } from '../../features/enums'

const DicesHolder = ({bgc}) => {
    const dices = useSelector(dicesSelector)
  return (
    <div style={{backgroundColor: bgc}} className={styles.diceHolder}>
      <div className={styles.dices}>
        {
            Object.keys(dices).map(k => <div key={k} className={styles.dice}><Dice color={bgc === COLORS.PLAYER_1? COLORS.PLAYER_2: COLORS.PLAYER_1} number={dices[k]}/></div>)
        }
      </div>
      <div className={styles.rollButton}>
        <p>Roll Dices</p>
      </div>

    </div>
  )
}

export default DicesHolder