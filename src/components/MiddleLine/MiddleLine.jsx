import React from 'react'
import styles from './MiddleLine.module.scss'
import { useSelector } from 'react-redux'
import { currentPlayerSelector, playersSelector } from '../../features/slices/playersSlice'
import CheckersHolder from '../CheckersHolder/CheckersHolder'
import { middleCheckersSelector } from '../../features/slices/boardSlice'
import { COLORS, POSITION } from '../../features/enums'
const MiddleLine = ({ bgc }) => {
    const players = useSelector(playersSelector)
    const currPlayer = useSelector(currentPlayerSelector)
    const middleCheckers = useSelector(middleCheckersSelector)
    return (
        <div className={styles.middleLine} style={{ backgroundColor: bgc }}>
            <div className={styles.currTurn}>
                <p>Turn: {currPlayer?.name}</p>
            </div>
            <div className={styles.middleCheckersHolder}>
                {
                    Object.keys(players).map(k => {
                        return (
                            <div key={k}><CheckersHolder position={players[k].color === COLORS.PLAYER_2? POSITION.BOTTOM: POSITION.TOP} checkers={middleCheckers[players[k].color]} checkersColor={players[k].color} /></div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MiddleLine