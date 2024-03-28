class CardCarousel extends HTMLElement {
  constructor() {
    super()

    this.sliderInited = false

    if (this.breakpoint) {
      this.toggleSlider()
      window.matchMedia(this.breakpoint).addEventListener('change', () => {
        this.toggleSlider()
      });
    } else {
      this.initSlider()
    }
  }

  toggleSlider () {
    if (this.isAvailableBreakPoint()) {
      this.initSlider()
    } else if (this.sliderElement && this.sliderInited) {
      this.sliderElement.destroy(true, true)
    }
  }

  initSlider () {
    this.sliderElement = new Swiper(this.querySelector('.js-slider'), {
      slidesPerView: 'auto',
      initialSlide: 0,
      spaceBetween: 20
    })
    this.sliderInited = true
  }

  isAvailableBreakPoint () {
    return window.matchMedia(this.breakpoint).matches
  }

  get breakpoint () {
    return this.getAttribute('data-breakpoint') || ''
  }
}

customElements.define('card-carousel', CardCarousel)
