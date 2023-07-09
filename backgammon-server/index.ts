import { createServer } from 'http'
import { Server } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import { PLAYERS, EMITTERES, MESSAGES } from './enums';
import { Player } from './Player';
import { Game } from './Game';
const port = 4000
const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io", "http://localhost:3000"],
        credentials: true,
    },
    connectionStateRecovery: {
        maxDisconnectionDuration: Infinity
    }
})
instrument(io, { 
    auth: false,
    mode: 'development'
});

let players: {[k: number]: Player} = {}
let game: Game;
let player1:Player;
let roomsCount: number = 1;
io.on(EMITTERES.CONNECTION, (socket) => {
    console.info(EMITTERES.CONNECTION);
    
    socket.emit(EMITTERES.CONNECTION, "hello")

    socket.on(EMITTERES.LOGIN, (name: string, func: any) => {
        // Login
        console.info(EMITTERES.LOGIN);
        players[socket.id] = new Player(name);
        let roomIndex = `room ${roomsCount}`
        
        const playerLength: number = Object.keys(players).length;
        if(playerLength && playerLength % 2 === 0){
            socket.join(roomIndex);
            func(roomIndex)
            roomsCount++;
            players[socket.id].setColor(PLAYERS.PLAYER_2)
            game = new Game(player1, players[socket.id]);
            socket.emit(EMITTERES.WAITING_FOR_PLAYER, {message: MESSAGES.WAITING_FOR_PLAYER, player: players[socket.id]})
            io.sockets.in(roomIndex).emit(EMITTERES.LOGIN, game)
        }else {
            socket.join(roomIndex)
            func(roomIndex)
            player1 = players[socket.id]
            player1.setColor(PLAYERS.PLAYER_1)
            socket.emit(EMITTERES.WAITING_FOR_PLAYER, {message: MESSAGES.WAITING_FOR_PLAYER, player: players[socket.id]}) 
        }

        socket.on(EMITTERES.DISCONNECT, () => {
            console.info(EMITTERES.DISCONNECT);
            delete players[socket.id]
            io.sockets.in(roomIndex).emit(EMITTERES.PLAYER_LEFT, MESSAGES.PLAYER_LEFT(players[socket.id].name)) 
        })

        socket.on(EMITTERES.TWO_LOGIN, () => {

        })

        socket.on(EMITTERES.FIRST_ROLL, () => {
            console.info(EMITTERES.FIRST_ROLL);
            game.firstRolling(socket.id)
            game.whoIsStarting()
            io.sockets.in(roomIndex).emit(EMITTERES.FIRST_ROLL, game)
        })
    
        socket.on(EMITTERES.ROLL_DICES, () => { 
            console.info(EMITTERES.ROLL_DICES);
            const nextPlayer = () => {
                setTimeout(() => {
                    game.resetDices(); 
                    game.nextPlayer();
                    io.sockets.in(roomIndex).emit(EMITTERES.NEXT_PLAYER, game)
                }, 1000)
            }
 
            if(players[socket.id].color === game.currentPlayer){
                game.rollDices();
                if(game.board.middleCheckers[players[socket.id].color]){
                    const backToBoardOptions = game.backToBoardOptions(players[socket.id].color)
                    if(backToBoardOptions.length){
                        io.sockets.in(roomIndex).emit(EMITTERES.ROLL_DICES, game.dices)
                        if(Object.values(game.dices).every(dice => !backToBoardOptions.some(val => val === dice.value))){
                            nextPlayer()
                        }else if(game.board.middleCheckers[players[socket.id].color] >= Object.keys(game.dices).length){
                            Object.keys(game.dices).forEach(k => {
                            console.log(Object.keys(game.dices).length);
                            if(backToBoardOptions.some(option => game.dices[Number(k)].value === option)){
                                    setTimeout(() => {
                                        game.backToBoard(players[socket.id].color === PLAYERS.PLAYER_1?game.dices[Number(k)].value: 25 - game.dices[Number(k)].value, players[socket.id].color);
                                    }, 1000)
                                }
                            })
                            nextPlayer();
                        }
                    }else{
                        nextPlayer();
                    }
                }else{
                    io.sockets.in(roomIndex).emit(EMITTERES.ROLL_DICES, game.dices)
                }
            }
        })
    
        socket.on(EMITTERES.SELECT, (index: number) => {
            console.info(EMITTERES.SELECT) 
            if(game.board.points[index].checkers && game.currentPlayer === players[socket.id].color && game.board.points[index].color === game.currentPlayer){
                game.move.setFrom(index);
                game.move.setColor(game.currentPlayer)
                io.sockets.in(roomIndex).emit(EMITTERES.SELECT, game.move)
            }
        }) 
    
        socket.on(EMITTERES.UNSELECT, () => {
            console.info(EMITTERES.UNSELECT)
            game.move.setFrom(0)
            io.sockets.in(roomIndex).emit(EMITTERES.UNSELECT, game.move)
        })
    
        socket.on(EMITTERES.MOVE, (to: number) => {
            console.info(EMITTERES.MOVE)
            const distance = to - game.move.from
             
            if(game.isMoveLigal(to, players[socket.id].color) && game.isDistanceInDices(distance, players[socket.id].color)){
                if((game.board.points[to].color && game.board.points[to].color !== game.move.color) && (game.board.points[to].checkers === 1)){
                    game.board.points[to].checkers = 0;
                    game.board.middleCheckers[game.currentPlayer === PLAYERS.PLAYER_1? PLAYERS.PLAYER_2: PLAYERS.PLAYER_1]++
                }
                game.move.to = to;
                game.board.pointSubOne(game.move.from)
                game.board.pointAddOne(game.move.to)
                game.board.pointChangeColor(game.move.to, players[socket.id].color);
                game.move.initMove();
                game.deleteDiceByValue(Math.abs(distance))
                if(game.isAllDicesUsed()){
                    game.nextPlayer()
                }
                io.sockets.in(roomIndex).emit(EMITTERES.MOVE, game)
            }  
        })
    
        socket.on(EMITTERES.BACK_TO_BOARD, (to: number) => {
            console.info(EMITTERES.BACK_TO_BOARD);
            
            if(game.isBackToBoardLigalPoint(to, players[socket.id].color)){
                game.backToBoard(to, players[socket.id].color);
                io.sockets.in(roomIndex).emit(EMITTERES.BACK_TO_BOARD, game) 
            } 
        }) 
    
        socket.on(EMITTERES.MOVE_OUT, () => {
            console.info(EMITTERES.MOVE_OUT); 
            const distance = (players[socket.id].color === PLAYERS.PLAYER_1? 25: 0) - game.move.from;
            const final = () => {
                game.board.outsideCheckersAddOne(players[socket.id].color)
                game.board.pointSubOne(game.move.from)
                game.move.initMove()
                if(game.isAllDicesUsed()){
                    game.nextPlayer()
                }
                io.sockets.in(roomIndex).emit(EMITTERES.MOVE_OUT, game)

                if(game.isThereWinner()){
                    io.sockets.in(roomIndex).emit(EMITTERES.WINNER, MESSAGES.WINNER(players[socket.id].name));
                }
            }

            if(game.isMoveOutLigal(game.move.from, players[socket.id].color)){
                if(game.isDistanceInDices(distance, players[socket.id].color)){
                    game.deleteDiceByValue(distance)
                    final()
                }else if(game.isDicesGreaterThanDistance(distance) && game.isGreaterPointsEmpty(game.move.from, players[socket.id].color)){
                    const key = Object.keys(game.dices).find((k) => game.dices[Number(k)].value > distance) 
                    if(key !== undefined){ 
                        game.dices[Number(key)].initDice()
                    } 
                    final()
                }
            }
        })

        socket.on(EMITTERES.NEXT_PLAYER, () => {
            console.info(EMITTERES.NEXT_PLAYER);
            game.resetDices();
            game.nextPlayer(); 
            io.sockets.in(roomIndex).emit(EMITTERES.NEXT_PLAYER, game)
        })
                
    })

    // socket.on(EMITTERES.DISCONNECT, () => {
    //     console.info(EMITTERES.DISCONNECT);
    // })
} )

io.listen(port);

const ifAllDiceUsed = () => {

}