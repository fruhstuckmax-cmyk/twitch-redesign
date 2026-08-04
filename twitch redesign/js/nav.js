// nav.js
// Handles mobile hamburger drawer and category pill active state.

document.addEventListener('DOMContentLoaded', () => {

    // Hamburger drawer toggle
    const hamburgerBtn = document.querySelector('.hamburger-toggle');
    const drawer = document.querySelector('.hamburger-drawer');

    if (hamburgerBtn && drawer) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = drawer.classList.toggle('open');
            drawer.hidden = !isOpen;
            hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        });

        // Close drawer if the user clicks outside of it
        document.addEventListener('click', (event) => {
            const clickedInsideDrawer = drawer.contains(event.target);
            const clickedHamburger = hamburgerBtn.contains(event.target);
            if (!clickedInsideDrawer && !clickedHamburger && drawer.classList.contains('open')) {
                drawer.classList.remove('open');
                drawer.hidden = true;
            }
        });
    }

    // --- Category pill click: highlight + route to homepage ---
    const pills = document.querySelectorAll('.category-pills button');
    const onHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

    pills.forEach((pill) => {
        pill.addEventListener('click', () => {
            localStorage.setItem('twitchDemoActiveCategory', pill.textContent.trim());

            if (onHomePage) {
                pills.forEach((p) => p.classList.remove('active'));
                pill.classList.add('active');
            } else {
                window.location.href = 'index.html';
            }
        });
    });

    // --- Restore the active pill on page load, based on the last click ---
    const savedCategory = localStorage.getItem('twitchDemoActiveCategory');
    if (savedCategory) {
        pills.forEach((pill) => {
            pill.classList.toggle('active', pill.textContent.trim() === savedCategory);
        });
    }

});