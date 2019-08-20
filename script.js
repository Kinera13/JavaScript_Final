let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i=1; i<101; i++){
	let exel = document.createElement('div');
	field.appendChild(exel);
	exel.classList.add('exel');
}

let exel = document.getElementsByClassName('exel');
let x = 1;
let y = 10;

for (let i = 0; i < exel.length; i++){
	if (x > 10){
		x = 1;
		y--;
	}
	exel[i].setAttribute('posX', x);
	exel[i].setAttribute('posY', y);
	x++;
}

var generalSnake =() => {
	let posX = Math.round(Math.random() * (10-3) + 3);
	let posY = Math.round(Math.random() * (10-1) + 1);
	return [posX, posY];
}

let coordinaters = generalSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinaters[0] + '"][posY = "' + coordinaters[1] + '"]'),
document.querySelector('[posX = "' + (coordinaters[0]-1) + '"][posY = "' + coordinaters[1] + '"]'),
document.querySelector('[posX = "' + (coordinaters[0]-2) + '"][posY = "' + coordinaters[1] + '"]')];

for(let i = 1; i < snakeBody.length; i++){
	snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

let mouse;
var createMouse = ()=>{
	var generalMouse = () => {
		let posX = Math.round(Math.random() * (10-3) + 3);
		let posY = Math.round(Math.random() * (10-1) + 1);
		return [posX, posY];
	}
	let mouseCoordinaters = generalMouse();
	mouse = document.querySelector('[posX = "' + mouseCoordinaters[0] + '"][posY = "' + mouseCoordinaters[1] + '"]');
	
	while(mouse.classList.contains('snakeBody')){
		let mouseCoordinaters = generalMouse();
		mouse = document.querySelector('[posX = "' + mouseCoordinaters[0] + '"][posY = "' + mouseCoordinaters[1] + '"]');
	}
	
	mouse.classList.add('mouse');
}
 createMouse();
 
let direction = 'right';
let steps = false;
let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
	margin: auto;
	margin-top: 40px;
	font-size: 30px;
	display: block;
`;

let score = 0;
input.value = `Ваши очки: ${score}`;
 
 var move = () => {
	 let snakeCoordinaters = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
	 snakeBody[0].classList.remove('head');
	 snakeBody[snakeBody.length-1].classList.remove('snakeBody');
	 snakeBody.pop();
	if (direction == 'right'){ 
	 if(snakeCoordinaters[0] < 10){
		 snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinaters[0] +1) + '"][posY = "' + snakeCoordinaters[1] + '"]'));
	 }
	 else{
		  snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinaters[1] + '"]'));
	 }
	}
	
	if (direction == 'left'){ 
	 if(snakeCoordinaters[0] > 1){
		 snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinaters[0] - 1) + '"][posY = "' + snakeCoordinaters[1] + '"]'));
	 }
	 else{
		  snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinaters[1] + '"]'));
	 }
	}
	
	if (direction == 'up'){ 
	 if(snakeCoordinaters[1] < 10){
		 snakeBody.unshift(document.querySelector('[posX = "' +snakeCoordinaters[0] + '"][posY = "' + (+snakeCoordinaters[1]+1) + '"]'));
	 }
	 else{
		  snakeBody.unshift(document.querySelector('[posX = "' +snakeCoordinaters[0] + '"][posY = "1"]'));
	 }
	}
	
	if (direction == 'down'){ 
	 if(snakeCoordinaters[1] > 1){
		 snakeBody.unshift(document.querySelector('[posX = "'+snakeCoordinaters[0] + '"][posY = "' + (snakeCoordinaters[1] - 1) + '"]'));
	 }
	 else{
		  snakeBody.unshift(document.querySelector('[posX = "'+snakeCoordinaters[0] + '"][posY = "10"]'));
	 }
	}
	
	if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')){
		mouse.classList.remove('mouse');
		let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
		let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
		snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
		createMouse();
		score++;
		input.value = `Ваши очки: ${score}`;
	}
	
	if (snakeBody[0].classList.contains('snakeBody')){
		setTimeout(() => {
			alert(`Игра окончена! Ваши очки: ${score}`);
		}, 200);
		
		clearInterval(interval);
		snakeBody[0].style.background = '#f41d0f center no-repeat';
		snakeBody[0].style.backgroundSize = "cover";
	}
	
	 snakeBody[0].classList.add('head');
	 for(let i = 1; i < snakeBody.length; i++){
		snakeBody[i].classList.add('snakeBody');
	}
	steps = true;
 }
 
 let interval = setInterval(move, 300);
 
window.addEventListener('keydown', function(e){
		if(steps == true){if (e.keyCode == 37 && direction != 'right'){
			direction = 'left';
			steps = false;
		}
		
		else if (e.keyCode == 38 && direction != 'down'){
			direction = 'up'
			steps = false;
		}
		
		else if (e.keyCode == 39 && direction != 'left'){
			direction = 'right';
			steps = false;
		}
		
		else if (e.keyCode == 40 && direction != 'up'){
			direction = 'down';
			steps = false;
		}
	}
	
});