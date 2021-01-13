//CLIENT
import io from "socket.io-client";

const API_URL = 'http://localhost:5000';
const socket = io.connect(API_URL);
const mice = {};

socket.on("connect", () => {
    console.log("im connected to the server!");
});

socket.on('mousemove', (event) => {

        let mouse = mice[event.id];
        if(!mouse){
            const span = document.createElement('span');
            span.style.position = 'absolute';
            span.textContent = '🐊';
            mice[event.id] = span;
            mouse = span; 
            document.body.appendChild(span);
        }
        mouse.style.top = event.y + 'px';
        mouse.style.left = event.x + 'px';

})

socket.on('message-client-disconnected', (id) => {
    console.log("user disconnected!");
    if(mice[id]){
        document.body.removeChild(mice[id]);
    }
})

document.addEventListener("mousemove", (event) => {
    socket.emit('mousemove', {
        x: event.clientX,
        y: event.clientY
    });
});
