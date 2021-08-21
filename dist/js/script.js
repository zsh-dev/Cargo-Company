const btnNavPanel = document.querySelector('.nav-panel__btn'),
        navPanelMenu = document.querySelector('.nav-panel__menu'),
        linksBtn = document.querySelectorAll('[data-link="Open list"]'),
        menuMobile = document.querySelector('.menu__mobile'),
        btnBurger = document.querySelector('.burger'),
        btnCloseMenu = document.querySelector('.menu__btn-close'),
        cards = document.querySelectorAll('.cargo__card'),
		btnOpenModal = document.querySelectorAll('[data-btn="Open modal"]'),
		modal = document.querySelector('.modal');


btnNavPanel.addEventListener('click', () => {
    btnNavPanel.classList.toggle('active');
    navPanelMenu.classList.toggle('active');
})

linksBtn.forEach((item)=> {
   item.addEventListener('click', (e) => {
       e.preventDefault();
       e.target.classList.toggle('active');
       e.target.nextSibling.classList.toggle('active');
   })
})

btnBurger.addEventListener('click', () => {
    menuMobile.classList.add('active');
    document.body.classList.add('lock');
})

btnCloseMenu.addEventListener('click', () => {
    menuMobile.classList.remove('active');
    document.body.classList.remove('lock');
})

maskPhone('[name="num"]')

function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}

btnOpenModal.forEach((item => {
	item.addEventListener('click', ()=> {
		modal.classList.add('modal_active');
		document.body.classList.add('lock');
	})
}));


modal.addEventListener('click', (e)=> {
	if (e.target.closest('.modal__btn-close')  || e.target.classList.contains('modal__overlay')) {
		modal.classList.remove('modal_active');
		document.body.classList.remove('lock');
	}
	console.log(e.target);
})

