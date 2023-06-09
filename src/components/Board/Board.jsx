import React from 'react'
import styles from './Board.module.scss'
import { useSelector } from 'react-redux'
import { pointsSelector } from '../../features/boardSlice'
import Point from '../Point/Point'
import MiddleLine from '../MiddleLine/MiddleLine'
import OutsideLine from '../OutsideLine/OutsideLine'
import { COLORS, POSITION, SIZES } from '../../features/enums'
import DicesHolder from '../DicesHolder/DicesHolder'
import { currentPlayerSelector } from '../../features/playersSlice'
const Board = () => {
    const points = useSelector(pointsSelector)
    const currentPlayer = useSelector(currentPlayerSelector)
    
    return (
        <div className={styles.board}>
                {
                    Object.keys(points).map(k => {
                        return (
                            <div className={styles[`item${k}`]} key={k}>
                                <Point
                                    bgc={k % 2? COLORS.ODD_POINT: COLORS.EVEN_POINT}
                                    checkers={points[k].checkers}
                                    checkersColor={points[k].color}
                                    position={k <= 12? POSITION.TOP: POSITION.BOTTOM}
                                    maxCheckers={5}
                                />
                            </div>
                        )
                    })
                }
            <div className={styles.middleLine}>
                <MiddleLine bgc="black"/>
            </div>
            <div className={styles.outsideLine}>
                <OutsideLine bgc="black"/>
            </div>
            <div style={{width: `${SIZES.POINT_WIDTH * 6}px`}} className={styles.dicesHolder}>
                <DicesHolder bgc={currentPlayer.color}/>
            </div>
        </div>
    )
}

export default Board