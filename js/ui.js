class UI {

    displayAlbum(e){
        e.preventDefault();
        // const getAlbum = document.getElementById('getAlbum');
        const albumDiv = document.getElementById('albumDiv');
        const albumSearch = document.getElementById('albumSearch');
        const artistSearch = document.getElementById('artistSearch');
        const message = document.getElementById('message');
        api.getAlbumObject(artistSearch.value,albumSearch.value).then((alb)=>{
            console.log(alb);
            albumDiv.innerHTML = `
        <img src="${alb.images[1].url}" alt="">
        <h2>artist: ${alb.artists[0].name}</h2>
        <h2>name: ${alb.name}</h2>
        <h2>popularity: ${alb.popularity}</h2>`;
        }).catch((e)=>{
            //TBD: catch error when there is no token yet and user tries to get album
            //clear current album, display not appropriate error message, hide it after 2 sec
            if (e.name==='TypeError'){
                albumDiv.innerHTML=``;
                message.innerText='Please log in';
            }
            else{
                albumDiv.innerHTML=``;
                message.innerText='Album not found, please refine your search.';
            }
            // console.log('not found!');
            console.log(`error : ${e.name}`)
            setTimeout(()=>{
                message.innerText='';
            },2000);
        });

    }
}