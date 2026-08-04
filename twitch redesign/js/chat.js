// chat.js
// Handles chat fixes from A1 analysis:
// pausing the chat scroll, deleting individual comments, collapsing the
// chat panel, sending test messages, and the emoji picker.

document.addEventListener('DOMContentLoaded', () => {

    // --- Pause and Play toggle ---
    const pauseToggle = document.querySelector('.chat-pause-toggle');
    let chatPaused = false;

    if (pauseToggle) {
        pauseToggle.addEventListener('click', () => {
            chatPaused = !chatPaused;
            pauseToggle.textContent = chatPaused ? '\u23F8' : '\u25B6';
            pauseToggle.setAttribute('aria-label', chatPaused ? 'Resume chat' : 'Pause Chat');
        });
    }

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

    // --- Emoji picker ---
    const emojiToggle = document.querySelector('.emoji-toggle');
    const emojiPanel = document.querySelector('.emoji-panel');

    if (emojiToggle && emojiPanel && chatInput) {
      emojiToggle.addEventListener('click', () => {
        emojiPanel.hidden = !emojiPanel.hidden;
      });
      emojiPanel.querySelectorAll('.emoji-option').forEach((btn) => {
        btn.addEventListener('click', () => {
          chatInput.value += btn.textContent;
          chatInput.focus();
        });
      });
    }

    // --- Delete individual comments ---
    // Using event delegation so this works for messages added later.
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        chatMessages.addEventListener('click', (event) => {
            if (event.target.matches('.chat-delete-btn')) {
                const messageRow = event.target.closest('.chat-message');
                if (messageRow) messageRow.remove();
            }
        });
    }

    // --- Collapse whole chat panel ---
    const chatPanel = document.querySelector('.chat-panel');
    const chatCollapseBtn = document.querySelector('.chat-collapse-toggle');
    if (chatCollapseBtn && chatPanel) {
        chatCollapseBtn.addEventListener('click', () => {
            chatPanel.classList.toggle('collapsed');
        });
    }
});