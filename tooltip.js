class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'This is the tooltip text!';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        div {
            background-color: #55c57a;
            padding: 10px;
            border-radius: 10px;
            color: #fff;
            position: absolute;
            z-index: 10;
        }
        </style>
        <slot>Some Default</slot>
        <span> (?) </span>
        `
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        };

        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showToolTip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideToolTip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative';
    }

    _showToolTip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideToolTip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('wc-tooltip', Tooltip);