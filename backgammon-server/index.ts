import { createServer } from 'http'
import { Server } from 'socket.io'
import { PLAYERS, EMITTERES, LOADING } from './enums'
import { Player } from './Player';
import { Game } from './Game';
const port = 4000
const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})
let players: Player[] = []
let game: Game;
io.on(EMITTERES.CONNECTION, (socket) => {
    let playerIndex: number;
    socket.emit(EMITTERES.CONNECTION, "hello")

    socket.on(EMITTERES.LOGIN, (username: string) => {
        console.info(EMITTERES.LOGIN);
        const player = new Player();
        player.setName(username)
        player.setColor(players.length % 2? PLAYERS.PLAYER_2: PLAYERS.PLAYER_1)
        players.push(player)
        playerIndex = players.length - 1;
        if(!(players.length %2)){
            game = new Game(players[players.length - 1], players[players.length - 2]);
            socket.emit(EMITTERES.LOADING, {massage: LOADING.WAITING_FOR_PLAYER, player: players[playerIndex]})
            io.emit(EMITTERES.LOGIN, game)
        }else {
            socket.emit(EMITTERES.LOADING, {massage: LOADING.WAITING_FOR_PLAYER, player: players[playerIndex]}) 
        }
    })

    socket.on(EMITTERES.FIRST_ROLL, () => {
        console.info(EMITTERES.FIRST_ROLL);
        game.firstRolling(playerIndex)
        game.whoIsStarting()
        io.emit(EMITTERES.FIRST_ROLL, game)
    }) 

    socket.on(EMITTERES.ROLL_DICES, () => {
        console.info(EMITTERES.ROLL_DICES)
        if(game.board.middleCheckers[players[playerIndex].color] && !game.isBackToBoardOptional(players[playerIndex].color)){
            game.nextPlayer();
            io.emit(EMITTERES.NEXT_PLAYER, game.currentPlayer)
        }else{
            game.rollDices();
            io.emit(EMITTERES.ROLL_DICES, game.dices)
        }
    })

    socket.on(EMITTERES.SELECT, (index: number) => {
        console.info(EMITTERES.SELECT) 
        if( game.board.points[index].checkers && game.currentPlayer === players[playerIndex].color && game.board.points[index].color === game.currentPlayer){
            game.move.setFrom(index);
            game.move.setColor(game.currentPlayer)
            io.emit(EMITTERES.SELECT, game.move)
        }
    })

    socket.on(EMITTERES.UNSELECT, () => {
        console.info(EMITTERES.UNSELECT)
        game.move.setFrom(0)
        io.emit(EMITTERES.UNSELECT, game.move)
    })

    socket.on(EMITTERES.MOVE, (to: number) => {
        console.info(EMITTERES.MOVE)
        const distance = to - game.move.from
         
        if(game.isDistanceInDices(distance, players[playerIndex].color)){
            if((game.board.points[to].color && game.board.points[to].color !== game.move.color) && (game.board.points[to].checkers === 1)){
                game.board.points[to].checkers = 0;
                game.board.middleCheckers[game.currentPlayer === PLAYERS.PLAYER_1? PLAYERS.PLAYER_2: PLAYERS.PLAYER_1]++
            }
            game.move.to = to;
            game.board.pointSubOne(game.move.from)
            game.board.pointAddOne(game.move.to)
            game.board.pointChangeColor(game.move.to, players[playerIndex].color);
            game.move.initMove();
            game.deleteDiceByValue(Math.abs(distance))
            if(game.isAllDicesUsed()){
                game.nextPlayer()
            }
            io.emit(EMITTERES.MOVE, game)
        }  
    })

    socket.on(EMITTERES.BACK_TO_BOARD, (to: number) => {
        console.info(EMITTERES.BACK_TO_BOARD);
        
        if(game.isBackToBoardLigalPoint(to, players[playerIndex].color)){
            if(game.isStomp(to)){ 
                game.board.points[to].checkers = 0;
                game.board.middleCheckers[game.currentPlayer === PLAYERS.PLAYER_1? PLAYERS.PLAYER_2: PLAYERS.PLAYER_1]++
            }
            game.board.middleCheckers[game.currentPlayer]--
            game.move.to = to;
            game.board.points[to].checkers++;
            game.board.points[to].color = game.currentPlayer;
            game.deleteDiceByValue(game.currentPlayer === PLAYERS.PLAYER_2? 25 - to: Number(to))
            io.emit(EMITTERES.BACK_TO_BOARD, game) 
        } 
    })

    socket.on(EMITTERES.MOVE_OUT, () => {
        console.info(EMITTERES.MOVE_OUT);
        const distance = (players[playerIndex].color === PLAYERS.PLAYER_1? 25: 0) - game.move.from

        const final = () => {
            game.board.outsideCheckersAddOne(players[playerIndex].color)
            game.board.pointSubOne(game.move.from)
            game.move.initMove()
            if(game.isAllDicesUsed()){
                game.nextPlayer()
            }
            io.emit(EMITTERES.MOVE_OUT, game)
        }

        if(game.isDistanceInDices(distance, players[playerIndex].color)){
            game.deleteDiceByValue(distance)
            final()
        }else if(game.isMoveOutLigal(game.move.from, players[playerIndex].color)){
            const key = Object.keys(game.dices).find((k) => game.dices[Number(k)].value > distance)
            if(key !== undefined){
                game.dices[Number(key)].initDice()
            }
            final()
        }

    })
} )

io.listen(port)