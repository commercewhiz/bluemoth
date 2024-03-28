class AnimatedDetails extends HTMLElement {
  constructor() {
    super()

    this.el = this.querySelector('details')
    this.summary = this.el.querySelector('summary')
    this.content = this.el.querySelector('.accordion__content')

    this.animation = null
    this.isClosing = false
    this.isExpanding = false
  }

  connectedCallback() {
    this.summary.addEventListener('click', (e) => this.onClick(e))
  }

  onClick(e) {
    e?.preventDefault()
    this.el.style.overflow = 'hidden'
    if (this.isClosing || !this.el.open) {
      this.open()
    } else if (this.isExpanding || this.el.open) {
      this.shrink()
    }
  }

  close() {
    this.el.style.overflow = 'hidden'
    this.shrink()
  }

  shrink() {
    this.isClosing = true

    const startHeight = `${this.el.offsetHeight}px`
    const endHeight = `${this.summary.offsetHeight}px`

    if (this.animation) {
      this.animation.cancel()
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: 'ease-out',
      }
    )

    this.animation.onfinish = () => this.onAnimationFinish(false)
    this.animation.oncancel = () => (this.isClosing = false)
  }

  open() {
    const wrapper = this.closest('.js-items')
    wrapper?.querySelectorAll('.js-animated-details').forEach(item => item.close())

    this.el.style.height = `${this.el.offsetHeight}px`
    this.el.open = true
    window.requestAnimationFrame(() => this.expand())
  }

  expand() {
    this.isExpanding = true
    const startHeight = `${this.el.offsetHeight}px`
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight
    }px`

    if (this.animation) {
      this.animation.cancel()
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: 'ease-out',
      }
    )
    this.animation.onfinish = () => this.onAnimationFinish(true)
    this.animation.oncancel = () => (this.isExpanding = false)
  }

  onAnimationFinish(open) {
    this.el.open = open
    this.animation = null
    this.isClosing = false
    this.isExpanding = false
    this.el.style.height = this.el.style.overflow = ''
  }
}

window.customElements.define('animated-details', AnimatedDetails)