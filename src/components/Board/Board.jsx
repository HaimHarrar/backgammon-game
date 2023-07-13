import React from 'react'
import styles from './Board.module.scss'
import { useSelector } from 'react-redux'
import { middleCheckersSelector, pointsSelector } from '../../features/slices/boardSlice'
import Point from '../Point/Point'
import MiddleLine from '../MiddleLine/MiddleLine'
import OutsideLine from '../OutsideLine/OutsideLine'
import { COLORS, EMITTERES, POSITION, SIZES } from '../../features/enums'
import DicesHolder from '../DicesHolder/DicesHolder'
import { currentPlayerSelector, playersSelector } from '../../features/slices/playersSlice'
import classNames from 'classnames'
import { socket } from '../../features/socket'
import { moveSelector } from '../../features/slices/moveSlice'
import { screenColorSelector } from '../../features/slices/gameSlice'

const Board = () => {
    const points = useSelector(pointsSelector)
    const middleCheckers = useSelector(middleCheckersSelector)
    const currentPlayer = useSelector(currentPlayerSelector)
    const players = useSelector(playersSelector)
    const move = useSelector(moveSelector)
    const screenColor = useSelector(screenColorSelector)
    const handlePlay = (index) => {
        if(middleCheckers[currentPlayer.color]){
            socket.emit(EMITTERES.BACK_TO_BOARD, index)
        }else if(!move.from){
            socket.emit(EMITTERES.SELECT, index);
        }else if(move.from === index) {
            socket.emit(EMITTERES.UNSELECT)
        }else {
            socket.emit(EMITTERES.MOVE, index)
        }
    }
    
    return (
        <div className={styles.board}>
            {
                Object.keys(points).map(k => {
                    return (
                        <div className={styles[`item${k}`]} key={k}>
                            <Point
                                bgc={k % 2 ? COLORS.ODD_POINT : COLORS.EVEN_POINT}
                                checkers={points[k].checkers}
                                checkersColor={points[k].color}
                                position={k <= 12 ? POSITION.TOP : POSITION.BOTTOM}
                                maxCheckers={5}
                                onClick={() => handlePlay(k)}
                                selected={move.from === k}
                            />
                        </div>
                    )
                })
            }
            <div className={styles.middleLine}>
                <MiddleLine bgc="black" />
            </div>
            <div className={styles.outsideLine} onClick={() => socket.emit(EMITTERES.MOVE_OUT)}>
                <OutsideLine bgc={screenColor === COLORS.PLAYER_1? COLORS.PLAYER_2: COLORS.PLAYER_1} />
            </div>

            {
                Object.keys(players).map(k => {
                    return (
                        <div key={k} style={{ width: `${SIZES.POINT_WIDTH * 6}px` }}
                            className={classNames(
                                styles.dicesHolder, k === COLORS.PLAYER_1 ? styles.left : styles.right,
                                currentPlayer?.color !== players[k].color && styles.hidden)}
                        >
                            {players[k].color === currentPlayer.color && <DicesHolder bgc={players[k].color} />}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Board