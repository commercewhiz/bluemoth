class Ticker extends HTMLElement {
  constructor () {
    super()
  }

  isEnabledAnimation () {
    const query = '(prefers-reduced-motion: reduce)'
    const hasOSReducedMotion = window.matchMedia(query).matches
    return !hasOSReducedMotion && !this.classList.contains('ticker__disabled')
  }

  connectedCallback () {
    if (this.isEnabledAnimation()) this.classList.add('playing')
  }
}

window.customElements.define('ticker-element', Ticker)
