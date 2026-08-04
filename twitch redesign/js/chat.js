// chat.js
//Handles chat fixes from Ai analysis
// pausing the chat scroll, deleting individual comments and collapsing the chat panel


document.addEventListener('DOMContentLoaded', () => {

    //---- Pause and Play toggle----
    const pauseToggle = document.querySelector('.chat-pause-toggle');
    let chatPaused = false;

    if (pauseToggle) {
        pauseToggle.addEventListener('click', () => {
            chatPaused = !chatPaused;
            pauseToggle.textContent = chatPaused ? '\u23F8' : '\u25B6' ; //pause play symbol===
            pauseToggle.setAttribute('aria-label', chatPaused ? 'Resume chat' : 'Pause Chat');
            //When wiring real chat messages check the chat paused function before appending new messages to the DOM
        });
    }

// --- Send a test message --//
// --- Send a test message ---
const chatInput = document.querySelector('.chat-input');
const chatMessagesEl = document.querySelector('.chat-messages');

if (chatInput && chatMessagesEl) {
  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && chatInput.value.trim() !== '') {
      const row = document.createElement('div');
      row.className = 'chat-message';
      row.innerHTML = `
        <span class="chat-user">You</span>
        <span class="chat-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        <span class="chat-text">${chatInput.value}</span>
        <button class="chat-delete-btn" aria-label="Delete comment">&times;</button>
      `;
      chatMessagesEl.appendChild(row);
      chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
      chatInput.value = '';
    }
  });
}
    //--- Delete Individual Comments---
    //Using event delegation so this works for mesages added later
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages){
        chatMessages.addEventListener('click' , (event) => {
            if (event.target.matches('.chat-delete-btn')){
                const messageRow = event.target.closest('.chat-message');
                if (messageRow) messageRow.remove();
            }
        });
    }


    //---Collapse whole chat panel---
    const chatPanel = document.querySelector('.chat-panel');
    const chatCollapseBtn = document.querySelector('.chat-collapse-toggle');
    if (chatCollapseBtn && chatPanel) {
        chatCollapseBtn.addEventListener('click', () => {
            chatPanel.classList.toggle('collapsed');
        });
    }
});