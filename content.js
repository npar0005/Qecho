const MAX_SPEED = 10; // max 16
let last_selection = 1;

const saveSelectedItem = function() {
	last_selection = +this.value;
}

const observer = new MutationObserver(([e]) => {
	let select;
	if (e.addedNodes.length) { // settings popup open
		select = document.getElementById("speed-select");

		let options = ``;
		for(let speed = 2.5; speed <= MAX_SPEED; speed+=0.5) {
			options += `<option value="${speed}">${speed}</option>`;
		}
		select.innerHTML += options; // appen built string to the DOM
		select.value = last_selection;
		select.addEventListener('change', saveSelectedItem);
	}

	if(e.removedNodes.length && select) { // settings dialogue closed & event listener bound
		select.removeEventListener('change', saveSelectedItem);
	}
});

observer.observe(document.querySelector('.settings-menu'), {childList: true});