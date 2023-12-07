class Footer {

    social = [
        {
            'url': 'https://www.linkedin.com/in/john-molinero-abaa07119',
            'img': 'img/social-media/ln.png',
            'alt': 'LinkedIn',
        },
        {
            'url': 'https://www.artstation.com/johnmolinero',
            'img': 'img/social-media/as.png',
            'alt': 'ArtStation',
        },
    ];

    constructor(host) {
        this.setSocial(host);
        this.setCopyrigth(host);

    }

    setCopyrigth(host) {
        const copy = document.createElement('div');
        copy.classList.add('copy');
        const year = new Date().getFullYear();
        copy.innerText = `© ${year} John Molinero`;
        host.appendChild(copy);
    }

    setSocial(host) {
        const social = document.createElement('div');
        social.classList.add('social');
        host.appendChild(social);

        this.social.forEach((item) => {
            const el = document.createElement('a');
            el.setAttribute('href', item.url);
            const img = document.createElement('img');
            img.setAttribute('src', item.img);
            img.setAttribute('alt', item.alt);
            el.appendChild(img);
            social.appendChild(el);
        });
    }
}
