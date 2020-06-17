
function whenImagesHaveLoaded(el, callback) {
    const images = el.getElementsByTagName('img');
    const len = images.length;

    if (!len) {
        callback();
    }

    let counter = 0;

    Array.prototype.forEach.call(images, function(img) {
    	if (img.complete) {
    		incrementCounter();
    	} else {
    		img.addEventListener('load', incrementCounter, false);
        	img.addEventListener('error', incrementCounter, false);
    	}
    });

    function incrementCounter() {
        counter++;
        if (counter === len) {
            callback();
            Array.prototype.forEach.call(images, function(img) {
                img.removeEventListener('load', incrementCounter, false);
                img.removeEventListener('error', incrementCounter, false);
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {

	var grid = document.querySelector('.grid');

	whenImagesHaveLoaded(grid, function() {
	  	// Setup Masonry
	  	var el = document.querySelector('.grid');
	    if (el) {
	    	var msnry = new Masonry(el, {
		  		itemSelector: '.grid-item',
		  		percentPosition: true,
		  		transitionDuration: 0
			});
	    }
		
		// Setup lightbox
		var lb = new Lightbox();
		lb.setup();

		// Show site
		var grid = document.querySelector('.grid');
		var loader = document.querySelector('.loader');

		grid.classList.remove('hide');
		loader.classList.add('hide');
	});
});

/*
 * A really simple lightbox that works with image elements.
 * If the images have a caption attribute, it will be displayed below the image.
 *
 * The following code needs to be run on document ready:
 *
 * 		var lb = new Lightbox();
 * 		lb.setup();
 *
 */
function Lightbox(selector) {

	this.selector = selector || '.lb';
	this.overlayEl = null;
	this.containerEl = null;

	this.setup = function() {
		this.createOverlay();
		this.createContainer();
		this.listen();
	}.bind(this);

	this.listen = function() {
		var els = document.querySelectorAll('img' + this.selector);
		for (var i = 0; i < els.length; i++ ) {
			var el = els[i];
			els[i].addEventListener('click', function(e) {
				e.stopPropagation();
				this.show(e.target);
			}.bind(this));
		}
	}.bind(this);

	this.createOverlay = function() {
		var el = document.createElement('div');
		el.style.position = 'fixed';
		el.style.top = 0;
		el.style.left = '-1000%';
		el.style.height = window.innerHeight + 'px';
		el.style.width = '100%';
		el.style.background = 'rgba(0,0,0,0.87)';
		el.style.zIndex = 1000;
		el.style.textAlign = 'center';

		// Close on click
		el.addEventListener('click', function(e) {
			if (e.target === el) {
				this.hide();
			}
		}.bind(this));

		// Handle mobile URL bars
		window.addEventListener('resize', function() {
			el.style.height = window.innerHeight + 'px';
			this.hide();
		}.bind(this));

		document.body.appendChild(el);
		this.overlayEl = el;
	}.bind(this);

	this.createClose = function() {
		var el = document.createElement('button');
		el.style.display = 'inline-block';
		el.style.position = 'absolute';
		el.style.top = '16px';
		el.style.right = '16px';
		el.style.zIndex = 1001;
		el.style.border = 'none';
		el.style.outline = 'none';
		el.style.background = 'transparent';
		el.style.color = 'white';
		el.style.fontSize = '12px';
		el.style.cursor = 'pointer';
		el.innerText = 'CLOSE';

		el.addEventListener('click', function() {
			this.hide();
		}.bind(this));

		return el;
	}.bind(this);

	this.createContainer = function() {
		var el = document.createElement('div');
		el.style.position = 'relative';
		el.style.display = 'inline-block';
		el.style.maxWidth = '90%';
		el.style.maxHeight = '90vh';
		el.style.margin = '0 auto';
		el.style.textAlign = 'left';
		el.style.top = '50%';
		el.style.left = '0';
		el.style.right = '0';
		el.style.transform = 'translateY(-50%)';
		el.style.overflow = 'auto';
		this.overlayEl.appendChild(el);
		this.containerEl = el;
	}.bind(this);

	this.createCaption = function(el) {
		if (!el) {
			return;
		}

		var cp = el.getAttribute('caption');

		if (!cp) {
			return;
		}

		cpEl = document.createElement('caption');
		cpEl.innerText = cp;
		cpEl.style.width = '100%';
		cpEl.style.padding = '16px 16px 18px 16px';
		cpEl.style.textAlign = 'left';
		cpEl.style.display = 'block';
		cpEl.style.background = 'white';
		cpEl.style.color = '#555';
		cpEl.style.fontSize = '12px';

		return cpEl;
	}.bind(this);

	this.show = function(el) {
		if (!el || window.innerWidth < 768) {
			return;
		}

		var src = el.getAttribute('src');
		newImgEl = document.createElement('img');
		newImgEl.style.maxWidth = '100%';
		newImgEl.style.maxHeight = (window.innerHeight * .8) + 'px';
		newImgEl.src = src;

		this.containerEl.appendChild(newImgEl);
		this.containerEl.appendChild(this.createClose());
		var cpEl = this.createCaption(el);
		if (cpEl) {
			this.containerEl.appendChild(cpEl);
		}

		// Bring lightbox into view
		this.overlayEl.style.left = 0;
	}.bind(this);

	this.hide = function() {
		// Remove lightbox from view
		this.overlayEl.style.left = '-1000%';
		this.containerEl.innerHTML = null;
	}.bind(this);
}
