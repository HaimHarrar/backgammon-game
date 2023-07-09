import React, { useMemo, useEffect } from 'react'
import styles from './DicesHolder.module.scss'
import { useSelector } from 'react-redux'
import { dicesSelector } from '../../features/slices/dicesSlice'
import Dice from '../Dice/Dice'
import { COLORS, EMITTERES } from '../../features/enums'
import { socket } from '../../features/socket'
// import { stateSelector } from '../../features/slices/gameSlice'

const DicesHolder = ({ bgc }) => {
  const dices = useSelector(dicesSelector)
  // const state = useSelector(stateSelector)
  const oppositeColor = useMemo(() => {
    return bgc === COLORS.PLAYER_1 ? COLORS.PLAYER_2 : COLORS.PLAYER_1
  }, [bgc])

  useEffect(() =>{
    const onkeyDown = (e) =>{
        if(e.key === 'Enter'){
            onRoll()
        }
    }
    window.addEventListener("keydown", onkeyDown)
    return () => {
        window.removeEventListener("keydown", onkeyDown)
    }
}, [])

  const onRoll = () => {
    if(Object.values(dices).every(dice => !dice.value)){
      socket.emit(EMITTERES.ROLL_DICES)
    }
    // if(state === STATES.START){
    //   socket.emit(EMITTERES.FIRST_ROLL)
    // }else{
    //   socket.emit(EMITTERES.ROLL_DICES)
    // }
  }

  return (
    <div style={{ backgroundColor: bgc, borderColor: oppositeColor }} className={styles.diceHolder}>
      <div className={styles.dices}>
        {
          Object.keys(dices).map(k => <div key={k} className={styles.dice}><Dice color={bgc === COLORS.PLAYER_1 ? COLORS.PLAYER_2 : COLORS.PLAYER_1} value={dices[k].value} /></div>)
        }
      </div>
      <div
        style={{ borderColor: oppositeColor, color: oppositeColor }}
        className={styles.rollButton}
        onClick={() => onRoll()}
      >
        <p>Roll Dices</p>
      </div>

    </div>
  )
}

export default DicesHolder