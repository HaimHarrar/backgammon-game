import React from 'react'
import styles from './Point.module.scss'
import classNames from 'classnames'
import CheckersHolder from '../CheckersHolder/CheckersHolder'
const Point = ({checkers, position, maxCheckers, bgc, checkersColor}) => {

  return (
    <div className={classNames(styles.point, styles[position])} >
      <div className={styles.checkersHolder} style={{backgroundColor: bgc}}>
        <CheckersHolder maxCheckers={maxCheckers} checkers={checkers} position={position} checkersColor={checkersColor}/>
      </div>
    </div>
  )
}

export default Point