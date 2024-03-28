class ScrollWrapper extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.scrollTriggerSelector?.addEventListener('change', this.onTriggerSelectChanged.bind(this))

    this.scrollTriggerLinks.forEach(link => {
      link.addEventListener('click', this.onTriggerClick.bind(this))
    })

    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  onScroll () {
    const currentTop = window.pageYOffset || document.documentElement.scrollTop
    if (this.isMobile()) {
      if (this.scrollTriggerSelector) {
        let activeIndex = this.scrollTriggerSelector?.querySelector('option:nth-child(2)')?.getAttribute('value')
        this.scrollTriggerSelector?.querySelectorAll('option').forEach(option => {
          const index = option.getAttribute('value')
          const targetElement = this.querySelector(`.js-scroll-target[data-index="${index}"]`)
          const top = this.getElementTop(targetElement)

          if ((top - 5) <= currentTop) {
            activeIndex = index
          }
        })

        this.scrollTriggerSelector?.classList.add('disable-scroll')
        this.scrollTriggerSelector.value = activeIndex
        this.scrollTriggerSelector.dispatchEvent(
          new CustomEvent('change', {
            bubbles: true,
            composed: true
          })
        )
      }
    }
  }

  onTriggerSelectChanged (e) {
    if (e.currentTarget?.classList.contains('disable-scroll')) {
      e.currentTarget?.classList.remove('disable-scroll')
      return
    }
    const index = e.currentTarget?.value
    if (index == 'none') {
      const firstIndex = this.scrollTriggerSelector.querySelector('option:nth-child(2)')?.getAttribute('value')
      this.moveToIndex(firstIndex)
    } else {
      this.moveToIndex(index)
    }
  }

  onTriggerClick (e) {
    const index = e.currentTarget?.getAttribute('data-index')
    this.moveToIndex(index)
  }

  moveToIndex (index) {
    const targetElement = this.querySelector(`.js-scroll-target[data-index="${index}"]`)
    if (targetElement) {
      window.scrollTo({
        top: this.getElementTop(targetElement, true),
        behavior: 'smooth'
      })
    }
  }

  getOffset () {
    if (this.isMobile()) {
      return this.header.offsetHeight + 40 + this.scrollTriggerSelector?.offsetHeight
    } else {
      return this.header.offsetHeight + 10
    }
  }

  getElementTop (element) {
    if (element) {
      const { top } = element.getBoundingClientRect()
      const currentTop = window.pageYOffset || document.documentElement.scrollTop
      return top + window.scrollY - this.getOffset()
    } else {
      return 0
    }
  }

  isMobile () {
    return window.matchMedia("(max-width: 749px)").matches
  }

  get scrollTriggerSelector () {
    return this.querySelector('.js-scroll-trigger-select')
  }

  get scrollTriggerLinks () {
    return this.querySelectorAll('.js-scroll-trigger-link')
  }

  get scrollTargets () {
    return this.querySelectorAll('.js-scroll-target')
  }

  get header () {
    return document.querySelector('.section-header');
  }
}

window.customElements.define('scroll-wrapper', ScrollWrapper)
