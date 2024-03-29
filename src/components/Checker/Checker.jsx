import React from 'react'
import styles from './Checker.module.scss'
import { COLORS } from '../../features/enums'
import classNames from 'classnames'

const Checker = ({color, text, selected}) => {
  return (
    <div className={classNames(styles.checker, selected && styles.selected)} style={{backgroundColor: color, border: `1px solid ${!selected?color===COLORS.PLAYER_1? COLORS.PLAYER_2: COLORS.PLAYER_1: COLORS.SELECTED}`}}>
        {text}
    </div>
  )
}

export default Checker