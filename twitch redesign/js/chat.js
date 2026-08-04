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