export class AppView {
    selector = 'app';

    constructor() {
        this.render()
    }

    render() {
        document.getElementById(this.selector).innerHTML = `
            <header class="header"></header>
            <main class="main">
                <div class="container">
                    <nav class="main--nav"></nav>
                    <div class="main--content"></div>
                </div>
            </main>
        `;
    }
}