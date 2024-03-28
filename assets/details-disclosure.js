class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends HTMLElement {
  constructor() {
    super()

    this.summary = this.el?.querySelector('summary')
    this.content = this.el?.querySelector('summary ~ *')
    this.header = document.querySelector('.header-wrapper');

    this.animation = null
    this.isClosing = false
    this.isExpanding = false
  }

  connectedCallback() {
    this.summary.addEventListener('click', (e) => this.onClick(e))
    this.addEventListener('mouseover', this.open.bind(this))
    this.addEventListener('mouseleave', this.shrink.bind(this))
  }

  onClick(e) {
    e?.preventDefault()
  }

  close() {
    if (this.el.hasAttribute('open')) {
      this.shrink()
    }
  }

  shrink() {
    this.isClosing = true

    if (this.animation) {
      clearTimeout(this.animation)
      this.isClosing = false
    }

    this.summary.setAttribute('aria-expanded', false);
    this.animation = setTimeout(() => this.onAnimationFinish(false), this.animationDuration);
  }

  open() {
    this.el.open = true
    this.summary.setAttribute('aria-expanded', true);
  }

  onAnimationFinish(open) {
    this.el.open = open
    this.animation = null
    this.isClosing = false
    this.isExpanding = false
    this.el.style.height = this.el.style.overflow = ''
  }

  get el () {
    return this.querySelector('details')
  }

  get animationDuration () {
    return this.getAttribute('data-time') || 200
  }

  onToggle() {
    console.log('prevented')
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}

customElements.define('header-menu', HeaderMenu);
