const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const chatBody = document.getElementById('chatBody');

function sendMessage() {
  const text = messageInput.value.trim();
  if (text) {
    const msg = document.createElement('div');
    msg.classList.add('message', 'sent');
    msg.textContent = text;
    chatBody.appendChild(msg);
    messageInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
