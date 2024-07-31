class ArtView {

    illustration = {
        'john-molinero-john-molinero-the-sun-in-the-darkness.jpg': {
            title: 'Sun in the Darkness',
            description: 'No AI used for any portion.'
        },
        'john-molinero-anita.jpg': {
            title: 'Anita',
            description: 'No AI used for any portion.'
        },
        'john-molinero-burning-city.jpg': {
            title: 'Burning City',
            description: 'No AI used for any portion.'
        },
        'john-molinero-half-spirit.jpg': {
            title: 'Half Spirit',
            description: 'No AI used for any portion.'
        },
        'john-molinero-john-molinero-goblin-lookout.jpg': {
            title: 'Goblin Lookout',
            description: 'No AI used for any portion.'
        },
        'john-molinero-ranger.jpg': {
            title: 'Ranger',
            description: 'No AI used for any portion.'
        },
        'john-molinero-shambler-wight.jpg': {
            title: 'Shambler Wight',
            description: 'No AI used for any portion.'
        },
        'john-molinero-the-lost-tomb-of-the-wights.jpg': {
            title: 'Lost Tomb of the Wights',
            description: 'No AI used for any portion.'
        },
        'john-molinero-torchlight-full.jpg': {
            title: 'Torchlight',
            description: 'No AI used for any portion.'
        },
    };

    constructor(host) {
        this.render(host);
    }

    render(host) {
        const urlParams = new URLSearchParams(window.location.search);
        const imageName = urlParams.get('image');

        const h2 = document.createElement('h2');
        h2.innerText = this.illustration[imageName].title;
        host.appendChild(h2);

        const img = document.createElement('img');
        img.setAttribute('src', `/img/art/${imageName}`);
        img.setAttribute('alt', this.illustration[imageName].title);
        host.appendChild(img);

        const p = document.createElement('p');
        p.innerText = this.illustration[imageName].description;
        host.appendChild(p);
    }
}
