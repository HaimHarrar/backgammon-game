import { io } from "socket.io-client";

export const socket = io("http://172.29.128.1:4000", {
// export const socket = io("http://localhost:4000", {
    autoConnect: false
})