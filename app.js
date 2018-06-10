const getAlbum = document.getElementById('getAlbum');
const albumDiv = document.getElementById('albumDiv');
const albumSearch = document.getElementById('albumSearch');
const artistSearch = document.getElementById('artistSearch');
const message = document.getElementById('message');

const api = new Api();

//when page is loaded, get token
window.onload = ()=>{
    api.getToken();
};
getAlbum.addEventListener('click',displayAlbum);




//used to be async function, make async if stops working
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
        //clear current album, display not found message, hide it after 2 sec
        console.log('not found!');
        albumDiv.innerHTML=``;
        message.innerText='Album not found, please refine your search.';
        setTimeout(()=>{
            message.innerText='';
        },2000);
    });





    // console.log(responseData2);
}