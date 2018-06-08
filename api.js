class Api{
    constructor(){
    }

    //extract token from URL
    parseURLHash () {
        var search = location.hash.substring(1);
        var urlHash = search?JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
            function(key, value) { return key===""?value:decodeURIComponent(value) }):{}
        let token = urlHash.access_token;
        return token;
    }



}