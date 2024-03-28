class SelectField extends HTMLElement {
  constructor() {
    super()

    this.select?.addEventListener('change', this.onChange.bind(this))
  }

  onChange(event) {
    this.validate()
  }

  connectedCallback() {
    this.validate()
  }

  validate () {
    const value = this.select?.value
    if (value) {
      this.select.classList.add('filled')
    } else {
      this.select.classList.remove('filled')
    }
  }

  get select() {
    return this.querySelector('select')
  }
}

customElements.define('select-field', SelectField)
