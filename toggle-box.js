class ToggleBox extends HTMLElement {
    constructor() {
        super();
        this._isOpen;
        this._buttonText = 'toggleButton';
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                .main-button {
                    background-color: var(--color-primary);
                    color: var(--color-white); 
                    width: 100px;
                    padding: 5px;
                    text-align: center;
                    border-radius: 5px;
                }

                .main-button:hover {
                    background-color: var(--color-primary-darker);
                    cursor: pointer;
                }

                .info-box {
                    margin-top: 10px;
                    padding: 30px;
                    border-radius: 10px;
                    background-color: var(--color-primary-gradient);
                    width: 400px;
                }
            </style>
            <div>
                <slot></slot>
                <div class="main-button">${this._buttonText}</div>
                <div id="info-box" class="info-box">
                    Some info
                </div>
            </div>
        `
        this._infoBox = this.shadowRoot.querySelector('#info-box');
        this._toggleButton = this.shadowRoot.querySelector('.main-button');
        this._toggleButton.addEventListener('click', this._onClick.bind(this));
    }

    connectedCallback() {
        if (this.hasAttribute('isOpen')) {
            this._infoBox.style.display = this.getAttribute('isOpen') === 'true' ? 'block' : 'none';
            this._buttonText = this.getAttribute('isOpen') === 'true' ? 'close' : 'open';
        } 
    }

    _onClick() {
        this._isOpen = this._isOpen ? false : true;
        this._infoBox.style.display = this._isOpen ? 'block' : 'none';
    }
}

customElements.define('wc-toggle-box', ToggleBox);