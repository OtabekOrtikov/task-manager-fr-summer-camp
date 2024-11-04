import './header.scss';
import logo from "../../assets/logo.svg"

export class HeaderView {
    selector = 'header';

    constructor() {
        this.render();
    }

    render() {
        document.querySelector(this.selector).innerHTML = `
        <div class="header--top">
            <div class="container">
                <div class="header--logo logo">
                    <img class="logo--image" src="${logo}" alt="Logo">
                    <h1 class="logo--heading">TaskTrack</h1>    
                </div>
                <div class="header--burger-menu">
                    <input type="checkbox" id="burger-toggle" class="burger-toggle" />
                    <div class="burger-menu">
                        <div id="lines" class="burger-menu--first-line"></div>
                        <div id="lines" class="burger-menu--second-line"></div>
                        <div id="lines" class="burger-menu--third-line"></div>
                    </div>
                        <div class="burger-menu--content">
                            <div class="burger-menu--container">
                                <div class="personal-info--top">
                                <h2 class="personal-info--name">Jane Cooper!</h2>
                                <p class="personal-info--role">Editor</p>
                                </div>
                                <p class="phone-number">+9998 99 212 12 12</p>
                                <button id="burger-logout" class="logout-button"><i class="fa-solid fa-arrow-right-from-bracket"></i>Log out</button>
                            </div>
                        </div>
                </div>
                <div class="header--logout logout">
                    <a href="#" id="header-logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
                </div>
            </div>
        </div>
        <div class="header--bottom">
            <div class="container">
                <div class="personal-info">
                    <div class="personal-info--top">
                    <h2 class="personal-info--name">Welcome Jane!</h2>
                    <p class="personal-info--role">Editor</p>
                    </div>
                    <p class="personal-info--question">What is on due today?</p>
                </div>
                <div class="phone-number">
                    <p class="phone-number--top">User phone number:</p>
                    <p class="phone-number--bottom">+998 99 212 12 12</p>
                </div>
            </div>
        </div>
        `;
    }
}
