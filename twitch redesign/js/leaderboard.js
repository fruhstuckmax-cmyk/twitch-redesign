//leaderboard.js
//collapsible leaderboard panel 


document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.leaderboard-toggle');
    const content = document.getElementById('leaderboard-content');

    if (toggleBtn && content) {
        toggleBtn.setAttribute('aria-expanded', 'true'); //sets intial state
        toggleBtn.addEventListener('click' ,() => {
            const collapsed = content.classList.toggle('collapsed');
            toggleBtn.setAttribute('aria-expanded', String(!collapsed));
        });
    }

    //Mobile: Default the leaderbaord to collapsed on small screens
    if (content && window.innerWidth < 1024) {
        content.classList.add('collapsed');
    }
});