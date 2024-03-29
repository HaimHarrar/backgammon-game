import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Login.module.scss'
import { socket } from '../../features/socket'
import { EMITTERES, MESSAGES } from '../../features/enums'
import { useDispatch } from 'react-redux'
import { setMessage } from '../../features/slices/gameSlice'

const Login = () => {
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()
    const inputRef = useRef()
    const sendUsername = useCallback(() => {
        socket.emit(EMITTERES.LOGIN, username, (room) => {
            console.log("joined to rooom " + room);
        })
        dispatch(setMessage(MESSAGES.WAITING_FOR_PLAYER))
        setUsername("")
    }, [dispatch, username])

    useEffect(() =>{
        const onkeyDown = (e) =>{
            if(e.key === 'Enter'){
                e.preventDefault();
                sendUsername();
            }
        }
        window.addEventListener("keydown", onkeyDown)
        return () => {
            window.removeEventListener("keydown", onkeyDown)
        }
    }, [sendUsername])

    const onkeyPress = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div className={styles.login}>
            <div className={styles.loginHeader}>
                <p>Enter you name:</p>
            </div>
            <div className={styles.usernameInput}>
                <input ref={inputRef} tabIndex={0} type="text" value={username} onChange={onkeyPress} />
            </div>
            <div className={styles.sendButton} onClick={() => sendUsername()}>
                <p>
                    Send
                </p>
            </div>
        </div>
    )
}

export default Login