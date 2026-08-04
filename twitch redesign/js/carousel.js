// carousel.js
// Wires the left/right arrow buttons on each carousel row to
// scroll the track smoothly, rather than jumping between frames.

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card)=> {
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex','0');
    card.addEventListener('click',()=> {
      window.location.href = 'stream.html';
    });
    card.addEventListener('keydown',(event)=> {
      if(event.key === 'Enter' || event.key === ' '){
        window.location.href = 'stream.html';
      }
    });
  });
  const carousels = document.querySelectorAll('.carousel-row');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const leftArrow = carousel.querySelector('.carousel-arrow:first-child');
    const rightArrow = carousel.querySelector('.carousel-arrow:last-child');

    const scrollAmount = 300;

    if (leftArrow) {
      leftArrow.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (rightArrow) {
      rightArrow.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });

});