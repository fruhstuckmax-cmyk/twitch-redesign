// main.js
// shared init logic that runs for all pages

document.addEventListener('DOMContentLoaded',()=> {
    console.log('Site Loaded');
    //Add any site wide init calls here as features are built
    //Mobile: Live chat/ leaderboard quick access buttons----
    //On Mobile, chat + leaderboard start hidden  inside #side-panel.
    //Tappingeither button reveals the panel and scrolls to the relevant section within it

    const panelButtons = document.querySelectorAll('[data-panel]');
    const sidePanel = document.getElementById('side-panel');

    panelButtons.forEach((btn) => {
        btn.addEventListener('click' ,() => {
            if (!sidePanel) return;
            sidePanel.classList.add('mobile-open');
            const target =sidePanel.querySelector('.${btn.dataset.panel}-panel');
            if (target) target.scrollIntoView({ behaviour: 'smooth'});
        });
    });
});