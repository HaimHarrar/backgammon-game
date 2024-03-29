import React from 'react'
import styles from './CheckersHolder.module.scss'
import Checker from '../Checker/Checker'
import classNames from 'classnames'
import { POSITION } from '../../features/enums'
const CheckersHolder = ({ maxCheckers = 2, bgc, position, checkers, checkersColor, selected }) => {
    const checkerSize = 36;
    return (
        <div style={{ backgroundColor: bgc }} className={classNames(styles.checkersHolder, styles[position])}>
            {
                Array(checkers).fill(0).map((_, index) => {
                    return <div key={index} className={classNames(styles.checker)} style={{ [`margin${position === POSITION.BOTTOM ? POSITION.TOP : POSITION.BOTTOM}`]: checkers > maxCheckers ? (((maxCheckers - checkers) * checkerSize) / checkers) : 0 }}>
                        <Checker color={checkersColor} selected={selected && ((position === POSITION.TOP && index === checkers - 1) || (position === POSITION.BOTTOM && index === 0))} />
                    </div>
                })
            }
        </div>
    )
}

export default CheckersHolder