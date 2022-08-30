import route from '../router.js';


class AppNav extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
            <nav>
                <ul>
                    <li><a href="/" class="secondary">Introduction</a></li>
                    <li><hr></li>
                    <li><a href="/consolidated" class="secondary">Consolidated Calls</a></li>
                    <li>
                        Separated Calls
                        <ol>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ol>
                    </li>
                </ul>
            </nav>
        `;

        this.listenForRoute();
        this.listenForSelection();
    }


    listenForRoute() {
        document.addEventListener('route', this.handleRoute);
    }

    listenForSelection() {
        this.removeEventListener('click', this.handleSelection);
        this.addEventListener('click', this.handleSelection);
    }

    handleRoute() {
        const navLinks = this.querySelectorAll('a');
        for (const link of navLinks) {
            if (link.matches(`[href='${location.pathname}']`)) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        }

        const matchingLink = this.querySelector(`a[href='${location.pathname}']`);
        matchingLink?.setAttribute('aria-current', 'page');
    }

    handleSelection(event) {
        if (event.target.matches('li a')) {
            event.preventDefault();
            history.pushState('', '', event.target.href);
            route();
        }
    }
}


customElements.define("app-nav", AppNav);
