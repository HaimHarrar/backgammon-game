import React from 'react'
import styles from './OutsideLine.module.scss'
import { useSelector } from 'react-redux'
import { playersSelector } from '../../features/slices/playersSlice'
import CheckersHolder from '../CheckersHolder/CheckersHolder'
import { outsideCheckersSelector } from '../../features/slices/boardSlice'
import { COLORS, POSITION } from '../../features/enums'
const OutsideLine = ({ bgc }) => {
    const players = useSelector(playersSelector)
    const outsideCheckers = useSelector(outsideCheckersSelector)
    return (
        <div className={styles.outsideLine} style={{ backgroundColor: bgc }}>

            {
                Object.keys(players).map(k => {
                    return (
                        <div key={k}><CheckersHolder position={players[k].color === COLORS.PLAYER_2? POSITION.BOTTOM: POSITION.TOP}  checkers={outsideCheckers[players[k].color]} checkersColor={players[k].color} /></div>
                    )
                })
            }
        </div>
    )
}

export default OutsideLine