document.addEventListener('DOMContentLoaded', () => {
  console.log('Site loaded.');

  const panelButtons = document.querySelectorAll('[data-panel]');
  const sidePanel = document.getElementById('side-panel');

  panelButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!sidePanel) return;
      sidePanel.classList.add('mobile-open');

      const target = sidePanel.querySelector(`.${btn.dataset.panel}-panel`);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth' });

      // If this is the chat panel and it's currently collapsed, expand it
      if (target.classList.contains('chat-panel') && target.classList.contains('collapsed')) {
        target.classList.remove('collapsed');
      }

      // If this panel contains a collapsible section (leaderboard) and it's
      // collapsed, expand it and keep the toggle button's aria state in sync
      const collapsibleContent = target.querySelector('.collapsible-content');
      if (collapsibleContent && collapsibleContent.classList.contains('collapsed')) {
        collapsibleContent.classList.remove('collapsed');
        const toggleBtn = target.querySelector('.leaderboard-toggle');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
});