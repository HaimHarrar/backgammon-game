import React from 'react'
import styles from './Point.module.scss'
import classNames from 'classnames'
import CheckersHolder from '../CheckersHolder/CheckersHolder'

const Point = ({checkers, position, maxCheckers, bgc, checkersColor, onClick, selected}) => {
  
  return (
    <div className={classNames(styles.point, styles[position])} onClick={() => onClick()}>
      <div className={styles.checkersHolder} style={{backgroundColor: bgc}}>
        <CheckersHolder selected={selected} maxCheckers={maxCheckers} checkers={checkers} position={position} checkersColor={checkersColor}/>
      </div>
    </div>
  )
}

export default Point