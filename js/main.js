//create router with 3 routes content of which will be rendered in main element
//Page allows more than 1 Component to be shown
const r = new Router(
    {
        album: new Page(new Component('album.html')),
        artist: new Page(new Component('artist.html')),
        track: new Page(new Component('track.html')),
        login: new Page(new Component('login.html')),
        default: new Page(new Component('login.html')),
    },
    document.querySelector('main')
);

//extract token from URL
const api = new Api();
const ui = new UI();
api.getToken();

const albumPageLink = document.querySelector("[href='#album']");
const artistPageLink = document.querySelector("[href='#artist']");
const trackPageLink = document.querySelector("[href='#track']");

