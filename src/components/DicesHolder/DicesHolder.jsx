import React, { useMemo, useEffect, useCallback } from 'react'
import styles from './DicesHolder.module.scss'
import { useSelector } from 'react-redux'
import { dicesSelector } from '../../features/slices/dicesSlice'
import Dice from '../Dice/Dice'
import { COLORS, EMITTERES } from '../../features/enums'
import { socket } from '../../features/socket'

const DicesHolder = ({ bgc }) => {
  const dices = useSelector(dicesSelector)
  const oppositeColor = useMemo(() => {
    return bgc === COLORS.PLAYER_1 ? COLORS.PLAYER_2 : COLORS.PLAYER_1
  }, [bgc])
  
  const onRoll = useCallback(() => {
    
    if(Object.values(dices).every(dice => !dice.value)){
      console.log(dices);
      socket.emit(EMITTERES.ROLL_DICES)
    }
  }, [dices])

  useEffect(() =>{
    const onkeyDown = (e) =>{
      if(e.key === 'Enter'){
        e.preventDefault();
        onRoll();
      }
    }
    window.addEventListener("keydown", onkeyDown)
    return () => {
      window.removeEventListener("keydown", onkeyDown)
    }
  }, [onRoll])


  return (
    <div style={{ backgroundColor: bgc, borderColor: oppositeColor }} className={styles.diceHolder}>
      <div className={styles.dices}>
        {
          Object.keys(dices).map(k => <div key={k} className={styles.dice}><Dice color={ !dices[k].isRelevant && dices[k].value? '#777': bgc === COLORS.PLAYER_1 ? COLORS.PLAYER_2 : COLORS.PLAYER_1} value={dices[k].value} /></div>)
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