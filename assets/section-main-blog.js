class BlogFilter extends HTMLElement {
  constructor() {
    super()

    this.select.addEventListener('change', this.onSelectChange.bind(this))
  }

  onSelectChange (e) {
    location.href = e.target.value
  }

  get select () {
    return this.querySelector('.js-select')
  }
}

customElements.define('blog-filter', BlogFilter)

class BlogSearch extends HTMLElement {
  constructor() {
    super()

    this.input.addEventListener('keyup', this.onInputChange.bind(this))
    this.form?.addEventListener('submit', this.onSubmitForm.bind(this))
    this.onCardsChanged()
  }

  onSubmitForm (e) {
    e.preventDefault()
  }

  onInputChange (e) {
    const value = e.target?.value
    if (!value) {
      document.querySelectorAll('.js-article-items .article-card').forEach(element => {
        element.classList.remove('hidden')
      })
      this.onCardsChanged()
      this.updateURLHash('')

      return false
    } else {
      document.querySelectorAll('.js-article-items .article-card__title').forEach(titleElement => {
        if (titleElement.innerText.indexOf(value) != -1) {
          titleElement.closest('.article-card').classList.remove('hidden')
        } else {
          titleElement.closest('.article-card').classList.add('hidden')
        }
      })
      this.updateURLHash(`q=${value}`)
    }

    this.onCardsChanged()
  }

  updateURLHash(searchParams) {
    history.pushState(
      { searchParams },
      '',
      `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`
    )
  }

  onCardsChanged() {
    if (document.querySelectorAll('.js-article-items .article-card:not(.hidden)').length > 0) {
      this.articleEmpty?.classList.add('hidden')
    } else {
      this.articleEmpty?.classList.remove('hidden')
    }
  }

  get articleEmpty () {
    return document.querySelector('.js-article-empty')
  }

  get input () {
    return this.querySelector('.js-search-input')
  }

  get form () {
    return this.querySelector('.js-blog-search-form')
  }
}

customElements.define('blog-search', BlogSearch)
