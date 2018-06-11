class Router {
    //el is main element where the content will be rendered
    constructor(routes, el) {
        this.routes = routes;
        this.el = el;
        //if hash changes in address line of browser
        //calling .bind creates Bound Function, which is called. this way we listen to onhashchange
        //we need bind because
        window.onhashchange = this.hashChanged.bind(this);
        // window.onhashchange = this.hashChanged();

        //this line makes calls hashChanged once when page is first loaded
        this.hashChanged();
    }

    async hashChanged() {
        //if hash is not empty
        if (window.location.hash.length > 0 && window.location.hash.substr(1,6)!=='access') {
            //get page name from hash omitting #
            const pageName = window.location.hash.substr(1);
            //(method of Router, do not confuse with method of page or layout)
            this.show(pageName);
            //if hash is empty and default is defined, go to default
        // } else if (this.routes['#default']) {
        } else {
            this.show('default');
        }
    }

    async show(pageName) {
        const page = this.routes[pageName];
        await page.load();
        this.el.innerHTML = '';
        page.show(this.el);
    }
}

