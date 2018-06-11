//create router with 3 routes content of which will be rendered in main element
//Page allows more than 1 Component to be shown
const r = new Router(
    {
        album: new Page(new Component('album.html')),
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
api.getToken();

const albumPageLink = document.querySelector("[href='#album']");
var getAlbum;
var albumDiv;
var albumSearch;
var artistSearch;
var message;

//console.log(albumPageLink);
//when we click album link in navigation, wait 100ms and then parse all necessary html elements for displaying album
albumPageLink.onclick = ()=>{
    setTimeout(()=>{
        getAlbum = document.getElementById('getAlbum');
        albumDiv = document.getElementById('albumDiv');
        albumSearch = document.getElementById('albumSearch');
        artistSearch = document.getElementById('artistSearch');
        message = document.getElementById('message');
        getAlbum.addEventListener('click',displayAlbum);
    },100);
};

//used to be async function, make async if stops working
//call api object's getAlbumObject function, display data from this object
function displayAlbum(e){
    e.preventDefault();
    let album;
    api.getAlbumObject(artistSearch.value,albumSearch.value).then((alb)=>{
        console.log(alb);
        albumDiv.innerHTML = `
        <img src="${alb.images[1].url}" alt="">
        <h2>artist: ${alb.artists[0].name}</h2>
        <h2>name: ${alb.name}</h2>
        <h2>popularity: ${alb.popularity}</h2>`;
    }).catch((e)=>{
        //TBD: catch error when there is no token yet and user tries to get album
        //clear current album, display not found message, hide it after 2 sec
        console.log('not found!');
        albumDiv.innerHTML=``;
        message.innerText='Album not found, please refine your search.';
        setTimeout(()=>{
            message.innerText='';
    },2000);
    });

}

