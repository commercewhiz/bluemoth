class ProductRecommendation extends HTMLElement {
  constructor() {
    super()

    this.sliderInited = false
    this.initSlider()
  }

  initSlider () {
    this.sliderElement = new Swiper(this.querySelector('.js-slider'), {
      slidesPerView: 'auto',
      initialSlide: 0,
      spaceBetween: 20,
      navigation: {
        nextEl: this.querySelector('.js-slider-next'),
        prevEl: this.querySelector('.js-slider-prev'),
      }
    })
    this.sliderInited = true
  }

  connectedCallback() {
    this.waitVisible()
    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (event.source === 'cart-items') {
        this.getProducts();
      }
    });
  }

  disconnectedCallback() {
    if (this.cartUpdateUnsubscriber) {
      this.cartUpdateUnsubscriber();
    }
  }

  waitVisible() {
    const handleIntersection = (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.unobserve(this);

      this.getProducts()
    };

    new IntersectionObserver(handleIntersection.bind(this), { rootMargin: '0px 0px 400px 0px' }).observe(this);
  }

  getProducts() {
    fetch(this.dataset.url)
      .then((response) => response.text())
      .then((text) => {
        const html = document.createElement('div');
        html.innerHTML = text;
        const recommendations = html.querySelector('[data-render-products]');
        if (recommendations && recommendations.innerHTML.trim().length) {
          this.classList.remove('hidden')
          this.productsTpl.innerHTML = recommendations.innerHTML;
          this.initSlider()
          this.classList.remove('loading')
        } else {
          this.classList.add('hidden')
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  get productsTpl () {
    return this.querySelector('[data-render-products]')
  }
}

customElements.define('product-recommendations', ProductRecommendation)
