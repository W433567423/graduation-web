import { io } from 'socket.io-client';

const devSocketURL = 'ws://localhost:8014';
const proSocketURL = 'wss://socket.wtututu.top/';
export const socketURL = import.meta.env.MODE === 'development' ? devSocketURL : proSocketURL;

//  { transports: ['websocket'] }
export const socket = io(socketURL, { transports: ['polling', 'websocket'] });

socket.on('events', function (data) {
	console.log('event', data);
});

socket.on('pipData', function (data) {
	console.log('pipData', data);
});

socket.on('exception', function (data) {
	console.log('exception', data);
});

socket.on('connect', () => {
	console.log('socket已连接');
});
socket.on('disconnect', () => {
	console.log('socket已断开');
});
