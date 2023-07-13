import { useEffect, useMemo } from 'react';
import './App.css';
import Message from './components/Message/Message';
import Login from './components/Login/Login';
import Board from './components/Board/Board';
import { socket } from './features/socket';
import { EMITTERES, MESSAGES } from './features/enums';
import { useDispatch, useSelector } from 'react-redux';
import { setMiddleCheckers, setOutsideCheckers, setPoints } from './features/slices/boardSlice';
import { setCurrentPlayer, setPlayers } from './features/slices/playersSlice';
import { setDices } from './features/slices/dicesSlice';
import { setMove } from './features/slices/moveSlice';
import { messageSelector, screenColorSelector, setScreenColor, setState, setMessage } from './features/slices/gameSlice';

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(messageSelector)
  const screenColor = useSelector(screenColorSelector)
  useEffect(() => {
    socket.connect()
    const onConnection = (data) => {
      console.log(data);
    } 

    const setGame = (game) => {
      console.log(game);      
      dispatch(setPoints(game.board.points))
      dispatch(setMiddleCheckers(game.board.middleCheckers))
      dispatch(setOutsideCheckers(game.board.outsideCheckders))
    
      dispatch(setPlayers(game.players))
      dispatch(setCurrentPlayer(game.currentPlayer))

      dispatch(setState(game.state))
      dispatch(setDices(game.dices))
      dispatch(setMove(game.move))
    }

    
    const onLogin = (game) => {
      console.log(game);
      setGame(game)
      dispatch(setMessage(MESSAGES.SUCCESS))
    }

    const onWaiting = (res) => {
      dispatch(setMessage(res.message))
      dispatch(setScreenColor(res.player?.color))
    }

    const onRoll = (dices) => {
      dispatch(setDices(dices))
    }

    const onFirstRoll = (game) => {
      setGame(game)
    }

    const onSelect = (move) => {
      dispatch(setMove(move))
    }

    const onUnSelect = (move) => {
      dispatch(setMove(move))
    }

    const onMove = (game) => {
        setGame(game)
    }

    const onBackToBoard = (game) => {
      setGame(game)
    }

    const onNexPlayer = (game) => {
      setGame(game)
    }

    const onMoveOut = (game) => {
      setGame(game)
    }

    const onWinner = (message) => {
      dispatch(setMessage(message))
    }

    const onPlayerLeft = (message) => {
      dispatch(setMessage(message))
    }

    socket.on(EMITTERES.CONNECTION, onConnection)  ;
    socket.on(EMITTERES.LOGIN, onLogin);
    socket.on(EMITTERES.WAITING_FOR_PLAYER, onWaiting);
    socket.on(EMITTERES.WINNER, onWinner);
    socket.on(EMITTERES.PLAYER_LEFT, onPlayerLeft);
    socket.on(EMITTERES.ROLL_DICES, onRoll);
    socket.on(EMITTERES.FIRST_ROLL, onFirstRoll);
    socket.on(EMITTERES.SELECT, onSelect);
    socket.on(EMITTERES.UNSELECT, onUnSelect);
    socket.on(EMITTERES.MOVE, onMove);
    socket.on(EMITTERES.BACK_TO_BOARD, onBackToBoard)
    socket.on(EMITTERES.NEXT_PLAYER, onNexPlayer)
    socket.on(EMITTERES.MOVE_OUT, onMoveOut)

    return () => {
      socket.off(EMITTERES.CONNECTION, onConnection);
      socket.off(EMITTERES.LOGIN, onLogin);
      socket.off(EMITTERES.WAITING_FOR_PLAYER, onWaiting);
      socket.off(EMITTERES.WINNER, onWinner);
      socket.off(EMITTERES.PLAYER_LEFT, onPlayerLeft);
      socket.off(EMITTERES.ROLL_DICES, onRoll);
      socket.off(EMITTERES.FIRST_ROLL, onFirstRoll);
      socket.off(EMITTERES.SELECT, onSelect);
      socket.off(EMITTERES.UNSELECT, onUnSelect);
      socket.off(EMITTERES.MOVE, onMove);
      socket.off(EMITTERES.BACK_TO_BOARD, onBackToBoard)
      socket.off(EMITTERES.NEXT_PLAYER, onNexPlayer)
      socket.off(EMITTERES.MOVE_OUT, onMoveOut)
    }
  },[dispatch])

  // useEffect(() => {
  //   socket.emit(EMITTERES.LOGIN, "haim")
  //   socket.emit(EMITTERES.LOGIN, "avi")
  // }, [])

  const componentToRender = useMemo(() => {
    // return <TwoLogin />
    return message === MESSAGES.SUCCESS? <Board />: message?.length? <Message text={message}/>: <Login />
  }, [message])

  return (
    <div style={{backgroundColor: screenColor}} className="app">
      {
        componentToRender
      }
      <div class='next-player-btn' onClick={() => socket.emit(EMITTERES.NEXT_PLAYER)}>next player</div>
    </div>
  );
}

export default App;