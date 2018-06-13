//create router with 3 routes content of which will be rendered in main element
//Page allows more than 1 Component to be shown
const r = new Router(
    {
        album: new Page(new Component('album.html')),
        artist: new Page(new Component('artist.html')),
        login: new Page(new Component('login.html')),
        default: new Page(new Component('login.html')),
    },
    document.querySelector('main')
);

//extract token from URL
if (window.location.hash.substr(1,6)==='access'){
    console.log('I see token!');
}
const api = new Api();
const ui = new UI();
api.getToken();

const albumPageLink = document.querySelector("[href='#album']");
const artistPageLink = document.querySelector("[href='#artist']");



//when we click album link in navigation, wait 100ms for page to load and then parse all necessary html elements
// for displaying album
albumPageLink.onclick = ()=>{
    setTimeout(()=>{
        const getAlbum = document.getElementById('getAlbum');
        getAlbum.addEventListener('click',ui.displayAlbum);
    },100);
};

//when we click artist link in navigation, wait 100ms for page to load and then parse all necessary html elements
// for displaying artist
artistPageLink.onclick = ()=>{
    setTimeout(()=>{
        const getArtist = document.getElementById('getArtist');
        getArtist.addEventListener('click',ui.displayArtist);
    },100);
};
