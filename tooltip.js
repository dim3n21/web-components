class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'This is the tooltip text!';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            div {
                background-color: var(--color-primary);
                padding: 10px;
                margin-top: 5px;
                border-radius: 10px;
                color: var(--color-white);
                position: absolute;
                z-index: 10;
            }

            .tooltip-icon {
                background: var(--color-primary);
                color: white;
                padding: 0.15rem 0.5rem;
                text-align: center;
                border-radius: 50%;
              }

              ::slotted(.highlight) {
                  background-color: var(--color-grey-light-1);
                  padding: 0 5px;
              }
        </style>

        <slot>Some Default</slot>
        <span class="tooltip-icon">?</span>
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