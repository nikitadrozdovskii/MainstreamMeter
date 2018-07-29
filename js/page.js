class Page {
    //... means unknown number of arguments as an array
    constructor(...components) {
    this.components = components;
}

//loads all components that are parts of this page
load() {
    //.all returns a promise while all promises in passed iterable are resolved
    return Promise.all(this.components.map(component => component.load()));
}

//appends each of the components in page to the passed element
show(el) {
    for (let component of this.components) {
        const div = document.createElement('div');
        //put content of component into this div
        component.show(div);
        el.appendChild(div);
    }

    //add event listeners to call ui function upon page load
    const getAlbum = document.getElementById('getAlbum');
    const getArtist = document.getElementById('getArtist');
    const getTrack = document.getElementById('getTrack');

    if (getAlbum){
        getAlbum.addEventListener('click',(event) => ui.displayAlbum(event));
    }

    if (getArtist){
        getArtist.addEventListener('click',(event) => ui.displayArtist(event));    
    }

    if (getTrack){
        getTrack.addEventListener('click', (event) => ui.displayTrack(event));
    }

}
}
