class Api{
    constructor(){
    }

    //extract token from URL
    parseURLHash () {
        var search = location.hash.substring(1);
        var urlHash = search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
            function (key, value) {
                return key === "" ? value : decodeURIComponent(value)
            }) : {}
        return urlHash.access_token;
    }


    //if current URL contains URL hash, update token in local Storage
    //else if there is token in local storage, check if it is expired and use it if it's not
    getToken(){
        const loginStatus = document.querySelector('.login_status');
            if (location.hash.substr(1,6)==="access") {
                this.token = this.parseURLHash();
                let now = Date.now();
                const expiresAt = new Date(now + (3600 * 1000));
                const formattedDate = expiresAt.toISOString();
                loginStatus.innerText = "You are logged in!";
                window.location.href = "#album";

                setTimeout(() => {
                    window.location.href = "#album";
                    loginStatus.style.opacity = 0;  
                },2000);
                window.localStorage.token = this.token;
                window.localStorage.expiresAt = formattedDate;
            } else if (window.localStorage.getItem('expiresAt')){
                //check if token is expired
                    const expiresAt = window.localStorage.getItem('expiresAt');
                    const expiresAtDate = new Date(expiresAt);
                    const expiresMS = expiresAtDate.getTime();
                    //if token expired
                    if (expiresMS < Date.now()){
                        console.log('token expired');
                        loginStatus.innerText = "Please log in";
                        return 1;
                    }
                console.log('token valid');
                loginStatus.innerText = "You are logged in!";
                 window.location.href = "#album";

                setTimeout(() => {

                    loginStatus.style.display = 'none';  
                },2000);
                this.token = window.localStorage.getItem('token'); 
            } else {
                loginStatus.innerText = "Please log in";
            }

        // }
    }

    //use Fetch API and passed-in artist and album search parameters to form a Spotify API GET request,
    //use it's response to get album's id to use in another Spotify API GET request to get a more detailed
    //album object and return it. If albums's array in second response is empty, through 'not found' error
    async getAlbumObject(artist,album){
        //make fetch request to get album's id
        const response = await fetch(`https://api.spotify.com/v1/search?q=album%3A${album}%20artist%3A${artist}&type=album`,
            {method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                }});

        const responseData = await response.json();
        // console.log(`response status: ${response.status}`);

        if (responseData.albums.items[0]) {
            let album_id = responseData.albums.items[0].id;


            //make fetch request to get album's detailed object
            const response2 = await fetch(`https://api.spotify.com/v1/albums/${album_id}?market=ES`,
                {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${this.token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                });
            const responseData2 = await response2.json();
            return responseData2;
        }
        else{
            throw 'Not found';
        }
    }

    //use Fetch API and passed-in artist search parameters to form a Spotify API GET request,
    //artist object and return it in an object along with GET request response status for error display purposes
    async getArtistObject(artist){
            const response = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`,
                {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.token}`
                    }
                });
            const responseData = await response.json();
            // console.log(`response status: ${response.status}`);
            return {art:responseData,
                    status:response.status};
    }



    async getTrackObject(artist,track){
        //make fetch request to get track's id
        const response = await fetch(`https://api.spotify.com/v1/search?q=track%3A${track}%20artist%3A${artist}&type=track`,
            {method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                }});

        const responseData = await response.json();
        // console.log(response.status);
        return {track: responseData,
                status:response.status};
    }


}