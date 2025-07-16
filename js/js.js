document.addEventListener('DOMContentLoaded', function () {

	window.addEventListener('scroll', () => {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrollPercent = (scrollTop / scrollHeight) * 100;
		document.getElementById('progress-bar').style.width = scrollPercent + '%';
	});
	
	let sections = document.querySelectorAll('section');
	let images = document.querySelectorAll('section img');
	let article = document.querySelector('article');
	let croix = document.querySelector('#croix')
	let aside = document.querySelector('aside');
	let grand = document.querySelector('#grand');

	for(let i=0; i<images.length; i++){
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
		let errorCount = 0;

		const errorCountElement = document.getElementById('error-count');
		errorCountElement.style.display = 'none'; // par défaut

		const fields = [
		{ id: 'name', message: 'Un prénom un peu plus long serait plus parlant, non ?' },
		{ id: 'email', message: 'Pas d’e-mail, pas de réponse...' },
		{ id: 'message', message: "Je sens que tu as plus à dire que ça. N'hésite pas !" }
		];
	
		fields.forEach(field => {
		const input = document.getElementById(field.id);
		const error = input.parentElement.querySelector('.error-message');
	
		if (!input.value.trim() || (field.id === 'email' && !validateEmail(input.value))) {
			error.textContent = field.message;
			error.style.display = 'block';
			isValid = false;
			errorCount++;
		} else {
			error.textContent = '';
			error.style.display = 'none';
		}
		});

		if (errorCount > 0) {
		errorCountElement.textContent = `⚠️ Il reste ${errorCount} erreur${errorCount > 1 ? 's' : ''} à corriger.`;
		errorCountElement.style.display = 'block';
		} else {
		errorCountElement.style.display = 'none';
		}
	
		if (isValid) {
		alert("Merci pour votre message !");
		this.reset();
		}
	});

	
	function validateEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}
	
	const toggleTemoignages = document.getElementById('toggle-temoignages');
	const temoignagesContent = document.getElementById('temoignages-content');
	
	toggleTemoignages.addEventListener('click', function () {
		toggleTemoignages.classList.toggle('active');
		temoignagesContent.classList.toggle('visible');
	});

	const backToTop = document.getElementById('back-to-top');

	window.addEventListener('scroll', function () {
		if (window.scrollY > 400) {
			backToTop.style.display = 'flex';
		} else {
			backToTop.style.display = 'none';
		}
	});

	backToTop.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});



	const bookData = {
		harrypotter: {
		image: "images/harrypotter.jpg",
		title: "Harry Potter à l’école des sorciers",
		summary: "Harry, jeune orphelin, découvre qu’il est un sorcier. Il entre à Poudlard, une école de magie, où il se lie d’amitié, affronte des mystères et découvre son passé… Une aventure qui marquera toute une génération."
		},
		eragon: {
		image: "images/eragon.jpeg",
		title: "Eragon",
		summary: "Eragon découvre un œuf de dragon, héritant d’un destin hors du commun. Il devient dragonnier et s’engage dans une lutte contre l’empire maléfique de Galbatorix."
		},
		narnia: {
		image: "images/narnia.jpeg",
		title: "Le Lion, la Sorcière et l’Armoire Magique",
		summary: "Quatre enfants traversent une armoire magique et découvrent le monde de Narnia. Là-bas, ils affrontent une sorcière glaciale et aident Aslan à restaurer la paix."
		}
	};

	const modal = document.getElementById('book-modal');
	const closeModal = document.querySelector('.close-modal');
	const modalImage = document.getElementById('modal-image');
	const modalTitle = document.getElementById('modal-title');
	const modalSummary = document.getElementById('modal-summary');
	const addToListBtn = document.getElementById('add-to-list');
	const main = document.querySelector('main');
	const gallery = document.getElementById('reco-gallery');
	const filterButtons = document.querySelectorAll('.filter-buttons button');

	const addedBooks = new Set();

	const books = [
	{
		title: "Harry Potter à l’école des sorciers",
		image: "images/harrypotter.jpg",
		summary: "Un jeune orphelin découvre qu’il est un sorcier. Il entre à Poudlard, une école de magie…",
		category: "fantasy"
	},
	{
		title: "Eragon",
		image: "images/eragon.jpeg",
		summary: "Un garçon découvre un œuf de dragon et devient dragonnier contre l’empire.",
		category: "fantasy"
	},
	{
		title: "Le Lion, la Sorcière et l’Armoire Magique",
		image: "images/narnia.jpeg",
		summary: "Quatre enfants entrent dans un monde magique où ils doivent sauver Narnia.",
		category: "jeunesse"
	},
	{
		title: "Ne tirez pas sur l'oiseau moqueur",
		image: "images/oiseaumoqueur.jpeg",
		summary: "Une jeune fille grandit en apprenant la justice dans l’Amérique du Sud ségrégationniste.",
		category: "classique"
	}
	
	];

	function createCard(book) {
	const card = document.createElement('div');
	card.className = 'reco-card';
	card.dataset.category = book.category;

	card.innerHTML = `
		<img src="${book.image}" alt="${book.title}">
		<h3 class="book-title">${book.title}</h3>
		<p class="book-summary">${book.summary}</p>
		<button class="open-modal">En savoir plus</button>
	`;

	if (addedBooks.has(book.title)) {
		card.classList.add('added');
	}

	card.querySelector('.open-modal').addEventListener('click', function () {
		modalImage.src = book.image;
		modalTitle.textContent = book.title;
		modalSummary.textContent = book.summary;
		modal.style.display = 'flex';

		addToListBtn.onclick = () => {
			if (!addedBooks.has(book.title)) {
			const newSection = document.createElement('section');
			newSection.classList.add('fade-in');
			newSection.innerHTML = `
				<img src="${book.image}" alt="image">
				<h2>"${book.title}"</h2>
				<p>${book.summary}</p>
			`;
			main.insertBefore(newSection, main.firstChild);
			setTimeout(() => newSection.classList.add('active'), 100);
		
			addedBooks.add(book.title);
		
			// Supprimer visuellement la carte
			card.remove();
			}
		
			modal.style.display = 'none';
		};
		
	});

	return card;
	}

	function renderGallery(filter = 'all') {
	gallery.innerHTML = '';

	let filteredBooks;

	if (filter !== 'all') {
		filteredBooks = books.filter(b => b.category === filter);
	} else {
		const fantasy = books.find(b => b.category === 'fantasy');
		const jeunesse = books.find(b => b.category === 'jeunesse');
		const classique = books.find(b => b.category === 'classique');
		const rest = books.filter(b => ![fantasy, jeunesse, classique].includes(b));
		filteredBooks = [fantasy, jeunesse, classique, ...rest].filter(Boolean);
	}

	filteredBooks.forEach(book => gallery.appendChild(createCard(book)));
	}

	renderGallery();

	filterButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		filterButtons.forEach(b => b.classList.remove('active'));
		btn.classList.add('active');
		renderGallery(btn.dataset.filter);
	});
	});

	closeModal.addEventListener('click', () => {
	modal.style.display = 'none';
	});
	window.addEventListener('click', e => {
	if (e.target === modal) {
		modal.style.display = 'none';
	}
	});

	const todoForm = document.getElementById('todo-form');
	const todoInput = document.getElementById('todo-input');
	const todoList = document.getElementById('todo-list');

	todoForm.addEventListener('submit', function(e) {
	e.preventDefault();

	const bookTitle = todoInput.value.trim();
	if (bookTitle === '') return;

	const li = document.createElement('li');
	li.innerHTML = `
	<span>${bookTitle}</span>
	<i class="fas fa-trash todo-delete" title="Supprimer"></i>
	`;


	li.querySelector('.todo-delete').addEventListener('click', () => {
		li.remove();
	});

	todoList.appendChild(li);
	todoInput.value = '';
	});
});
