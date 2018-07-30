class UI {
    constructor() {
        
    }


    //get necessary DOM elements, call API class' getAlbumObject function, use returned object to display album,
    //catch errors from Promise based on error name, display error message
    displayAlbum(e){
        e.preventDefault();
        // const getAlbum = document.getElementById('getAlbum');
        const albumDiv = document.getElementById('albumDiv');
        const card = document.querySelector('.card');
        const artist = document.querySelector('.card_stat--artist');
        const albumName = document.querySelector('.card_stat--album');
        const image = document.querySelector('.card_img');

        const albumSearch = document.getElementById('albumSearch');
        const artistSearch = document.getElementById('artistSearch');
        
        //validate input
        if (artistSearch.value==='' || albumSearch.value===''){
            this.displayError('Please fill in all the fields');
        }

        api.getAlbumObject(artistSearch.value,albumSearch.value).then((alb)=>{
            image.src = alb.images[1].url;
            card.style.opacity = 1;
            artist.innerText = `${alb.artists[0].name}`;
            albumName.innerText = `${alb.name}`;
            // score.innerText = `Score: ${alb.popularity}`;

            //dynamic score display
            this.countScore(alb.popularity);
            //clear inputs
            artistSearch.value='';
            albumSearch.value='';
            this.scroll();

        }).catch((e)=>{
            //clear current album, display appropriate error message, hide it after 2 sec
            if (e.name==='TypeError'){
                this.displayError('Please log in');
            }
            else{
                this.displayError('Album not found, please refine your search.');
            }
            console.log(`error : ${e.name}`);
        });

    }


    //get necessary DOM elements, call API' class' getArtistObject function, use returned object to display artist,
    //catch errors from Promise based on error name and status returned from Fetch, display error message
    displayArtist(e){
        e.preventDefault();
        const card = document.querySelector('.card');
        const artistDiv = document.getElementById('artistDiv');
        const artistName = document.querySelector('.card_stat--name');
        const artistImage = document.querySelector('.card_img');
        const artistSearch = document.getElementById('artistSearch');
        let status;

        //validate input
        if (artistSearch.value===''){
            this.displayError('Please fill in all the fields');
        }

        api.getArtistObject(artistSearch.value).then((artistObject)=>{
            status = artistObject.status;
            let art = artistObject.art;
            artistImage.src = art.artists.items[0].images[1].url;
            card.style.opacity = 1;

            // console.log(`response status in ui: ${status}`);
            artistName.innerText = `${art.artists.items[0].name}`;
            
            //dynamic score display
            this.countScore(art.artists.items[0].popularity);

            //clear input
            artistSearch.value='';
            this.scroll();

        }).catch((e)=>{
            console.log(`error name in ui: ${e}`);
            // console.log(`response status in ui: ${status}`);
            if (e.name ==='TypeError' && status===401){
                this.displayError('Please log in');
            }
            else if (e.name ==='TypeError' && (status===400 || status===200)){
                this.displayError('Artist not found, please refine your search');
            }
        });

    }

    //get necessary DOM elements, call API class' getTrackObject function, use returned object to display track
    displayTrack(e){
        e.preventDefault();
        const trackDiv = document.getElementById('trackDiv');
        const artist = document.querySelector('.card_stat--artist');
        const trackName = document.querySelector('.card_stat--track');
        const image = document.querySelector('.card_img');
        const card = document.querySelector('.card');


        const trackSearch = document.getElementById('trackSearch');
        const artistSearch = document.getElementById('artistSearch');
        let status;
        let track;

        //validate input
        if (artistSearch.value==='' || trackSearch.value===''){
            this.displayError('Please fill in all the fields');
        }

        api.getTrackObject(artistSearch.value,trackSearch.value).then((trackObject)=>{
            track = trackObject.track;
            status = trackObject.status;
            //if track not found, display error message
            if (trackObject.track.tracks.items.length===0){
                this.displayError('Track not found, please refine your search');
            }

            image.src = track.tracks.items[0].album.images[1].url;
            artist.innerText = `${track.tracks.items[0].artists[0].name}`;
            trackName.innerText = `${track.tracks.items[0].name}`;
            card.style.opacity = 1;

            //dynamic score display
            this.countScore(track.tracks.items[0].popularity);
            this.scroll();


        //clear inputs
        artistSearch.value = '';
        trackSearch.value = '';
        }).catch((e)=>{
            if (e.name ==='TypeError' && status===401){
                this.displayError('Please log in');
            }
        });
    }

    displayError(text) {
        const message = document.querySelector('.form_error');
        message.style.opacity = 1;
        message.innerText = text;
        setTimeout(()=>{
        message.style.opacity = 0;
        },2000);
    }

    countScore(score){
        const scoreElement = document.querySelector('.card_stat--score');
        var scoreCounter = 0;
            var scoreInterval = setInterval(() => {
                if (scoreCounter === score) {
                    clearInterval(scoreInterval);
                }
                scoreElement.innerText = scoreCounter;
                scoreCounter++;
            },15)
    }

    scroll(){
        const body = document.body;
        const html = document.documentElement;

        const height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
                       console.log(height);
        window.scroll({
            top: height, 
            behavior:'smooth'
          });

    }

}