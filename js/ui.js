class UI {

    //get necessary DOM elements, call API class' getAlbumObject function, use returned object to display album,
    //catch errors from Promise based on error name, display error message
    displayAlbum(e){
        e.preventDefault();
        // const getAlbum = document.getElementById('getAlbum');
        const albumDiv = document.getElementById('albumDiv');
        const card = document.querySelector('.card');
        const artist = document.querySelector('.card_stat--artist');
        const albumName = document.querySelector('.card_stat--album');
        const score = document.querySelector('.card_stat--score')
        const image = document.querySelector('.card_img');

        const albumSearch = document.getElementById('albumSearch');
        const artistSearch = document.getElementById('artistSearch');
        const message = document.querySelector('.form_error');

        //validate input
        if (artistSearch.value==='' || albumSearch.value===''){
            message.style.opacity = 1;
            console.log(message.style.opacity);
            message.innerText = 'Please fill in all the fields';
            setTimeout(()=>{
            message.style.opacity = 0;
            },2000);
            throw 'invalid input';
        }

        api.getAlbumObject(artistSearch.value,albumSearch.value).then((alb)=>{
            console.log(alb);
            image.src = alb.images[1].url;
            card.style.opacity = 1;
            artist.innerText = `${alb.artists[0].name}`;
            albumName.innerText = `${alb.name}`;
            // score.innerText = `Score: ${alb.popularity}`;

            //dynamic score display
            var scoreCounter = 0;
            var scoreInterval = setInterval(() => {
                if (scoreCounter === alb.popularity) {
                    clearInterval(scoreInterval);
                }
                score.innerText = scoreCounter;
                scoreCounter++;
                
            },15)
            // albumDiv.innerHTML = `
            // <img src="${alb.images[1].url}" alt="">
            // <h2>${alb.artists[0].name}</h2>
            // <h2>${alb.name}</h2>
            // <h2>Score: ${alb.popularity}</h2>`;
            //clear inputs
            artistSearch.value='';
            albumSearch.value='';
        }).catch((e)=>{
            //clear current album, display appropriate error message, hide it after 2 sec
            if (e.name==='TypeError'){
                message.style.opacity=1;
                message.innerText='Please log in';
            }
            else{
                message.style.opacity=1;
                message.innerText='Album not found, please refine your search.';
            }
            // console.log('not found!');
            console.log(`error : ${e.name}`);
            setTimeout(()=>{
                message.style.opacity=0;
            },2000);
        });

    }


    //get necessary DOM elements, call API' class' getArtistObject function, use returned object to display artist,
    //catch errors from Promise based on error name and status returned from Fetch, display error message
    displayArtist(e){
        e.preventDefault();
        const card = document.querySelector('.card');
        const message = document.querySelector('.form_error');
        const artistDiv = document.getElementById('artistDiv');
        const artistName = document.querySelector('.card_stat--name');
        const artistScore = document.querySelector('.card_stat--score');
        const artistImage = document.querySelector('.card_img');
        const artistSearch = document.getElementById('artistSearch');
        let status;

        //validate input
        if (artistSearch.value===''){
            message.style.opacity = 1;
            message.innerText = 'Please fill in all the fields';
            setTimeout(()=>{
            message.style.opacity = 0;
            },2000);
            throw 'invalid input';
        }

        api.getArtistObject(artistSearch.value).then((artistObject)=>{
            status = artistObject.status;
            let art = artistObject.art;
            artistImage.src = art.artists.items[0].images[1].url;
            card.style.opacity = 1;

            // console.log(`response status in ui: ${status}`);
            artistName.innerText = `${art.artists.items[0].name}`;
            
            //dynamic score display
            var scoreCounter = 0;
            var scoreInterval = setInterval(() => {
                if (scoreCounter === art.artists.items[0].popularity) {
                    clearInterval(scoreInterval);
                }
                artistScore.innerText = scoreCounter;
                scoreCounter++;
                
            },15)

            // artistDiv.innerHTML = `
            // <img src=${art.artists.items[0].images[1].url}>
            // <h2>${art.artists.items[0].name}</h2>
            // <h2>Score: ${art.artists.items[0].popularity}</h2>
            // `;
            //clear input
            artistSearch.value='';
        }).catch((e)=>{
            console.log(`error name in ui: ${e}`);
            // console.log(`response status in ui: ${status}`);
            if (e.name ==='TypeError' && status===401){
                message.style.opacity=1;
                message.innerText='Please log in';
            }
            else if (e.name ==='TypeError' && (status===400 || status===200)){
                message.style.opacity=1;                
                message.innerText='Artist not found, please refine your search';
            }
            setTimeout(()=>{
                message.style.opacity=0;
            },2000);
        });

    }

    //get necessary DOM elements, call API class' getTrackObject function, use returned object to display track
    displayTrack(e){
        e.preventDefault();

        const trackDiv = document.getElementById('trackDiv');
        const artist = document.querySelector('.card_stat--artist');
        const trackName = document.querySelector('.card_stat--track');
        const score = document.querySelector('.card_stat--score')
        const image = document.querySelector('.card_img');
        const card = document.querySelector('.card');


        const trackSearch = document.getElementById('trackSearch');
        const artistSearch = document.getElementById('artistSearch');
        const message = document.querySelector('.form_error');
        let status;
        let track;

        //validate input
        if (artistSearch.value==='' || trackSearch.value===''){
            message.style.opacity = 1;
            message.innerText = 'Please fill in all the fields';
            setTimeout(()=>{
                message.style.opacity = 0;
            },2000);
            throw 'invalid input';
        }

        api.getTrackObject(artistSearch.value,trackSearch.value).then((trackObject)=>{
            track = trackObject.track;
            status = trackObject.status;
            //if track not found, display error message
            if (trackObject.track.tracks.items.length===0){
                message.style.opacity=1;
                message.innerText='Track not found, please refine your search';
                setTimeout(()=>{
                     message.style.opacity=0;
                },2000);
            }

            image.src = track.tracks.items[0].album.images[1].url;
            artist.innerText = `${track.tracks.items[0].artists[0].name}`;
            trackName.innerText = `${track.tracks.items[0].name}`;
            card.style.opacity = 1;

            //dynamic score display
            var scoreCounter = 0;
            var scoreInterval = setInterval(() => {
                if (scoreCounter === track.tracks.items[0].popularity) {
                    clearInterval(scoreInterval);
                }
                score.innerText = scoreCounter;
                scoreCounter++;
                
            },15)


        //     trackDiv.innerHTML = `
        // <img src="${track.tracks.items[0].album.images[1].url}" alt="">
        // <h2>${track.tracks.items[0].artists[0].name}</h2>
        // <h2>${track.tracks.items[0].name}</h2>
        // <h2>Score: ${track.tracks.items[0].popularity}</h2>`;
        //clear inputs
        artistSearch.value = '';
        trackSearch.value = '';
        }).catch((e)=>{
            if (e.name ==='TypeError' && status===401){
                message.style.opacity=1;
                message.innerText='Please log in';
            }
            setTimeout(()=>{
                message.style.opacity=0;
            },2000);
        });
    }


}