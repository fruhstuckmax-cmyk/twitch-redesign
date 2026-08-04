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

    // --- Category Pill active state sends user to main menu as no category pages yet built-- 
    const pills = document.querySelectorAll('.category-pills button');
    pills.forEach((pill) => {
        pill.addEventListener('click' , () => {
            window.location.href = 'index.html';
        });
    });


});


