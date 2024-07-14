const navButton = document.getElementById('nav-button');
const navBar = document.getElementById('nav-bar');
const filter = document.getElementById('filter');

navButton.setAttribute('open', 'false');

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    navBar.style.display = 'flex';
    navButton.style.display = 'none';
    document.body.style.overflow = 'visible';
    navButton.setAttribute('open', 'false');
    navButton.src = './images/nav-button.svg';
    if (filter.classList.contains('filter')) filter.classList.remove('filter');
  } else {
    navBar.style.display = 'none';
    navButton.style.display = 'flex';
    document.body.style.overflow = 'visible';
  }
});

navButton.addEventListener('click', () => {
  if (navButton.getAttribute('open') === 'false') {
    navBar.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    navButton.setAttribute('open', 'true');
    navButton.src = './images/close-nav-icon.svg'
    filter.classList.add('filter');
  } else {
    navBar.style.display = 'none';
    document.body.style.overflow = 'visible';
    navButton.setAttribute('open', 'false');
    navButton.src = './images/nav-button.svg';
    filter.classList.remove('filter');
  }
});
