const getAlbum = document.getElementById('getAlbum');
const albumDiv = document.getElementById('albumDiv');
const albumSearch = document.getElementById('albumSearch');
const artistSearch = document.getElementById('artistSearch');


let token;

getAlbum.addEventListener('click',displayAlbum);


//extract token
function parseURLHash () {
    var search = location.hash.substring(1);
    var urlHash = search?JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
        function(key, value) { return key===""?value:decodeURIComponent(value) }):{}
    return urlHash;
}


urlHash = parseURLHash();
token = urlHash.access_token;


async function displayAlbum(e){
    e.preventDefault();
    console.log(albumSearch.value);
    //Make fetch GET request to search for album
    console.log(`https://api.spotify.com/v1/search?q=album%3A${albumSearch.value}%20artist%3A${artistSearch.value}&type=album`);
    const response = await fetch(`https://api.spotify.com/v1/search?q=album%3A${albumSearch.value}%20artist%3A${artistSearch.value}&type=album`,
        {method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }});

    const responseData = await response.json();
    console.log(responseData);
    let album_id = responseData.albums.items[0].id;

    //make fetch request to get album's popularity
    const response2 = await fetch(`https://api.spotify.com/v1/albums/${album_id}?market=ES`,
        {method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }});
    const responseData2 = await response2.json();
    console.log(responseData2);


    albumDiv.innerHTML = `
    <img src="${responseData2.images[1].url}" alt="">
    <h2>artist: ${responseData2.artists[0].name}</h2>
    <h2>name: ${responseData2.name}</h2> 
    <h2>popularity: ${responseData2.popularity}</h2>`;
    console.log(responseData2);
}