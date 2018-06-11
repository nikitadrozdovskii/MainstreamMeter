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


    //if there is token in SessionStorage, use it for get request, otherwise, parse token from URL hash and persist
    //it to session storage
    getToken(){
        if (window.sessionStorage.token){
            //if there is token in ss, use it
            console.log('there is token in ss');
            this.token = window.sessionStorage.token;
        }
        else{
            //if there is no token in ss - parse it from # and store in ss
            console.log('there is no token in ss');
            if (location.hash.substr(1,6)==="access") {
                this.token = this.parseURLHash();
                window.sessionStorage.token = this.token;
            }
        }
    }

    async getAlbumObject(artist,album){

        // this.getToken();
        //make fetch request to get album's id
        const response = await fetch(`https://api.spotify.com/v1/search?q=album%3A${album}%20artist%3A${artist}&type=album`,
            {method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                }});

        const responseData = await response.json();
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



}