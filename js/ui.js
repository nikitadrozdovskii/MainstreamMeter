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
            //clear current album, display appropriate error message, hide it after 2 sec
            if (e.name==='TypeError'){
                albumDiv.innerHTML=``;
                message.innerText='Please log in';
            }
            else{
                albumDiv.innerHTML=``;
                message.innerText='Album not found, please refine your search.';
            }
            // console.log('not found!');
            console.log(`error : ${e.name}`);
            setTimeout(()=>{
                message.innerText='';
            },2000);
        });

    }

    //TBD: implement catch block based on Fetch response status
    displayArtist(e){
        e.preventDefault();

        const artistDiv = document.getElementById('artistDiv');
        const artistSearch = document.getElementById('artistSearch');
        const message = document.getElementById('message');
        let status;
        api.getArtistObject(artistSearch.value).then((artistObject)=>{
            status = artistObject.status;
            let art = artistObject.art;
            console.log(art);
            // console.log(`response status in ui: ${status}`);
            artistDiv.innerHTML = `
            <img src=${art.artists.items[0].images[1].url}>
            <h2>artist: ${art.artists.items[0].name}</h2>
            <h2>popularity: ${art.artists.items[0].popularity}</h2>
            `;
        }).catch((e)=>{
            console.log(`error name in ui: ${e.name}`);
            console.log(`response status in ui: ${status}`);
            if (e.name ==='TypeError' && status===401){
                artistDiv.innerHTML=``;
                message.innerText='Please log in';
            }
            else if (e.name ==='TypeError' && (status===400 || status===200)){
                artistDiv.innerHTML=``;
                message.innerText='Album not found, please refine your search';
            }
            setTimeout(()=>{
                message.innerText='';
            },2000);
        });

    }
}