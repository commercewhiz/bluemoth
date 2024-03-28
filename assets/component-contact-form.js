class ContactForm extends HTMLElement {
  constructor() {
    super()

    this.forms.forEach(form => {
      this.disableRecaptcha(form)
      form.addEventListener('submit', this.onSubmit.bind(this))
    })
  }

  onSubmit(event) {
    const form = event.target
    const requiredFields = form.querySelectorAll('.js-field.required')
    let formValid = true

    this.clearForm(form)

    requiredFields.forEach((field) => {
      let fieldValid = true
      const input = field.querySelector('input') || field.querySelector('select') || field.querySelector('textarea')
      if (!input) return false
      const inputType = input.getAttribute('type')

      if (!input.value) {
        formValid = false
        fieldValid = false
      }

      if (inputType == 'email' && !this.validEmailAddress(input.value)) {
        formValid = false
        fieldValid = false
      }

      if (!fieldValid) {
        field.querySelectorAll('.js-field-error').forEach(element => {
          element.classList.remove('hidden')
        })
        input.setAttribute('aria-describedby', input?.getAttribute('data-aria-describedby'))
        input.setAttribute('aria-invalid', true)
      }
    })

    if (!formValid) {
      event.preventDefault()
    }
  }

  disableRecaptcha(form) {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && (mutation.target.getAttribute('onsubmit'))) {
          mutation.target.setAttribute('onsubmit', '')
        }
      });
    });

    observer.observe(form, {
      attributes: true
    });
  }

  validEmailAddress(value) {
    return value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  }

  clearForm (form) {
    form.querySelectorAll('.js-field-error').forEach(element => {
      element.classList.add('hidden')
    })

    form.querySelectorAll('.js-field input, .js-field select, .js-field textarea').forEach(element => {
      element.removeAttribute('aria-invalid')
      element.removeAttribute('aria-describedby')
    })
  }

  get forms() {
    return this.querySelectorAll('form')
  }
}

customElements.define('contact-form', ContactForm)
