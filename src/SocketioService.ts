import { io, Socket } from 'socket.io-client';

// const socket: Socket = io('ws://localhost:8085/calendar');
const socket: Socket = io('https://screenapi.mintyfi.com/socket/calendar');


export default socket;
