const socket = io();

const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');

const params = new URLSearchParams(window.location.search);
const room = params.get('room');

socket.emit('joinRoom', room);

socket.on('message', (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerText = message;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('chatMessage', { room, message });
    messageInput.value = '';
    messageInput.focus();
});
