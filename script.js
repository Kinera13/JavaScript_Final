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