class ReviewsCarousel extends HTMLElement {
  constructor() {
    super()

    this.sliderInited = false
    this.device = this.getDevice()

    if (this.mobileOnly) {
      this.toggleSlider()

      window.addEventListener('resize', () => {
        const device = this.getDevice()
        if (device != this.device) {
          this.device = device
          this.toggleSlider()
        }
      })
    } else {
      this.initSlider()
    }
  }

  toggleSlider () {
    if (this.device == 'mobile') {
      this.initSlider()
    } else if (this.sliderElement && this.sliderInited) {
      this.sliderElement.destroy(true, true)
    }
  }

  initSlider () {
    this.sliderElement = new Swiper(this.querySelector('.js-slider'), {
      slidesPerView: 'auto',
      initialSlide: 0,
      spaceBetween: 20,
      navigation: {
        nextEl: this.querySelector('.js-next'),
        prevEl: this.querySelector('.js-prev')
      },
      breakpoints: {
        990: {
          loop: true,
          loopAdditionalSlides: 1
        }
      },
    })
    this.sliderElement.slidePrev(0);
    this.sliderElement.slideNext(0);
    this.sliderInited = true
  }

  getDevice () {
    return (window.innerWidth >= 750) ? 'desktop' : 'mobile'
  }

  get mobileOnly () {
    return (this.getAttribute('data-mobile-only') == 'true')
  }
}

customElements.define('reviews-carousel', ReviewsCarousel)
