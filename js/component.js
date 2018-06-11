//rename page into component
class Component {
    constructor(url) {
        //views is a relative directory
        this.url = 'views/' + url;
    }

    async load() {
        //gets views asynchronously via Fetch API
        const response = await fetch(this.url,
            {method: 'GET',
                headers: {
                    'Content-Type': 'text/html'
                }});
        const responseHTML = await response.text();
        // console.log(responseHTML);
        this.html = responseHTML;
    }

    //el is an element where content is rendered
    //put content of this component into passed element
    show(el) {
        el.innerHTML = this.html;
    }
}
