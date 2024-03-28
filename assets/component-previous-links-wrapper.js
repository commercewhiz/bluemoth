class PreviousLinksWrapper extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.links.forEach(link => {
      link.addEventListener('click', this.returnToPrevious.bind(this))
    })
  }

  returnToPrevious(e) {
    e.preventDefault()
    window.history.back()
  }

  get links () {
    return this.querySelectorAll('a[href="#previous-page"]')
  }
}

window.customElements.define('previous-links-wrapper', PreviousLinksWrapper)
