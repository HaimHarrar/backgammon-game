import React from 'react'
import styles from './Dice.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dice = ({value, color}) => {
    const DICE_FACE = {
        0: 'd6',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six'
    }
  return (
    <div className={styles.dice}>
        <FontAwesomeIcon className={styles.dice} icon={`fa-solid fa-dice-${DICE_FACE[value]}`} style={{color: color}} />
    </div>
  )
}

export default Dice