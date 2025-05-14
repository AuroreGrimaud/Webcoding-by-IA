
let sections = document.querySelectorAll('section');
let images = document.querySelectorAll('section img');
let article = document.querySelector('article');
let croix = document.querySelector('#croix')
let aside = document.querySelector('aside');
let grand = document.querySelector('#grand');
//let monImage = monImage.getAttribute('src')


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

/*
croix[i].addEventListener('click', function(){
article.style.display = 'none' ;
aside.style.display = 'none' ;


})*/













/*
	div[i].addEventListener('click', function(){
		// console.log(this)
		this.style.width = "40%";
		this.style.position = "fixed" ;
		this.style.top = "15%" ;
		this.style.left = "30%";
		this.style.zIndex = '10';
		article.style.display = 'block' ;
		 croix[i].style.display = "block"
		croix[i].style.zIndex = "25"

		//this.querySelector('img').style.display = "block";
		//this.querySelector('img').style.zIndex = "25";

		this.querySelector('#croix').addEventListener("click", function(){
			this.parentNode.style.width = "100%";
			this.parentNode.style.position = "static";
			console.log(this.parentNode.getAttribute('style'));
			// console.log(this);

			// this.parentNode.style.top = "auto"
			// this.parentNode.style.left = "auto"
			// this.parentNode.style.zIndex = "2"
			article.style.display = 'none' ;
			// this.style.display = "none" 
			// this.style.zIndex = "20" 	
		});
		
	});
*/
