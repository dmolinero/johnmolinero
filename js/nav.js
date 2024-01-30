class Nav {

    items = [
        {
            'url': '/',
            'title': 'Illustration',
        },
        {
            'url': '/about',
            'title': 'About',
        },
        {
            'url': 'https://www.artstation.com/johnmolinero',
            'title': 'ArtStation',
        },
        {
            'url': 'https://etsy.com/shop/JohnMolineroArt',
            'title': 'Store',
        }
    ];

    constructor(host) {
        this.items.forEach((item) => {
            const el = document.createElement('a');
            el.setAttribute('href', item.url);
            el.innerText = item.title;
            host.appendChild(el);
        });
    }
}
