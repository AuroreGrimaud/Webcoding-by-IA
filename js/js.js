
let sections = document.querySelectorAll('section');
let images = document.querySelectorAll('section img');
let article = document.querySelector('article');
let croix = document.querySelector('#croix')
let aside = document.querySelector('aside');
let grand = document.querySelector('#grand');

for(let i=0; i<images.length; i++){
	console.log("adding listener to section "+i)
	images[i].addEventListener('click', function(event) {
		if (!aside.style.display) {
			aside.style.display = 'block' ;
			article.style.display = 'block' ;
			grand.src = event.target.src
		}
	})
}

croix.addEventListener('click', function(){
	aside.style.display = '' ;
	article.style.display = '' ;
})

window.addEventListener('scroll', function() {
	const elements = document.querySelectorAll('.fade-in');
	
	elements.forEach(element => {
	  if (element.getBoundingClientRect().top < window.innerHeight * 0.8) {
		element.classList.add('active');
	  }
	});
  });
  
const staggerElements = document.querySelectorAll('.scroll-stagger');

const staggerObserver = new IntersectionObserver((entries, observer) => {
  let delay = 0;

  entries
    .filter(entry => entry.isIntersecting)
    .forEach(entry => {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      delay += 150; 
      observer.unobserve(entry.target); 
    });
}, {
  threshold: 0.1
});

staggerElements.forEach(el => staggerObserver.observe(el));

const carousel = document.querySelector('.carousel');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');
const cards = document.querySelectorAll('.temoignage');

let index = 0;
const visibleCount = 3;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 32; 
  carousel.style.transform = `translateX(-${index * cardWidth}px)`;
}

function next() {
  const maxIndex = cards.length - visibleCount;
  index = index >= maxIndex ? 0 : index + 1;
  updateCarousel();
}

function prev() {
  const maxIndex = cards.length - visibleCount;
  index = index <= 0 ? maxIndex : index - 1;
  updateCarousel();
}

rightArrow.addEventListener('click', next);
leftArrow.addEventListener('click', prev);

let autoScroll = setInterval(next, 6000);

[leftArrow, rightArrow].forEach(btn => {
  btn.addEventListener('click', () => {
    clearInterval(autoScroll);
    autoScroll = setInterval(next, 6000);
  });
});

window.addEventListener('resize', updateCarousel);

const services = document.querySelectorAll('.service');

services.forEach(service => {
  service.addEventListener('click', function() {
    this.classList.toggle('active');
  });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
	e.preventDefault();
	let isValid = true;
  
	const fields = [
	  { id: 'name', message: 'Un prénom un peu plus long serait plus parlant, non ?' },
	  { id: 'email', message: 'Pas d’e-mail, pas de réponse...' },
	  { id: 'message', message: "Je sent que tu as plus à dire que ça. N'hésite pas !" }
	];
  
	fields.forEach(field => {
	  const input = document.getElementById(field.id);
	  const error = input.parentElement.querySelector('.error-message');
  
	  if (!input.value.trim() || (field.id === 'email' && !validateEmail(input.value))) {
		error.textContent = field.message;
		error.style.display = 'block';
		isValid = false;
	  } else {
		error.textContent = '';
		error.style.display = 'none';
	  }
	});
  
	if (isValid) {
	  alert("Merci pour votre message !");
	  this.reset();
	}
  });
  
function validateEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
