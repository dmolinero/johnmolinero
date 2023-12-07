class Images {

	selector = 'a.art';

	constructor() {
		this.attach();
	}

	attach() {
		const els = document.querySelectorAll(this.selector);
		els.forEach((el) => {
			const img = el.querySelector('img');
			const imageName = img.src.split('/').pop();
			el.href = `/art-view?image=${imageName}`;
		});
	}
}
