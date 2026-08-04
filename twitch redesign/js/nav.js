// nav.js
//handles mobile hamburger drawer and category pill active state

document.addEventListener('DOMContentLoaded', () => {

    //Hamburger drawer toggle
    const hamburgerBtn = document.querySelector('.hamburger-toggle');
    const drawer = document.querySelector ('.hamburger-drawer');

    if (hamburgerBtn && drawer) {
        hamburgerBtn.addEventListener ('click', (event) => {
            const isOpen = drawer.classList.toggle('open');
            drawer.hidden = !isOpen;
            hamburgerBtn.setAttribute('aria-expanded' , String(isOpen));
        });

        //Close Drawer if the user clicks outside of it
        document. addEventListener('click' , (event) => {
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

pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    // Remember which category was picked so it stays highlighted
    // after the page reload (a JS class alone won't survive navigation).
    localStorage.setItem('twitchDemoActiveCategory', pill.textContent.trim());
    window.location.href = 'index.html';
  });
});

// --- Restore the active pill on page load, based on the last click ---
const savedCategory = localStorage.getItem('twitchDemoActiveCategory');
if (savedCategory) {
  pills.forEach((pill) => {
    pill.classList.toggle('active', pill.textContent.trim() === savedCategory);
  });
}
