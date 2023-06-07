//!  - important control container, item container, different style, and add more words

class AdaptiveMenu extends HTMLElement {
  static initState = {
    devise: '',
    reset: '',
    activeDropDown: false,
    itemsSize: 1,

    menuContainerStyle: {},
    menuListStyle: {},
    dropZoneStyle: {},
  };

  constructor() {
    super();

    this.uls = Array.from(this.querySelectorAll('ul'));
    this.lis = Array.from(this.querySelectorAll('li'));

    console.log('hi');
  }

  static get observedAttributes() {
    return ['logo', 'label'];
  }

  connectedCallback() {
    let logo = this.getAttribute('logo');
    this.putLogo(logo);

    // let label = this.getAttribute('label');
    // console.log(logo, label, 'LOGO');

    this.bindEvents();
  }

  putLogo(logo) {
    //generate img
    const li = document.createElement('li');
    const img = document.createElement('img');

    const splitImg = logo.split('.');
    const format = splitImg[splitImg.length - 1]; //svg

    const imageAtt = {
      src: logo,
      alt: 'Logo',
      class: 'logo__svg',
      width: '77',
      height: '50',
      tabindex: '0',
      itemprop: 'url',
    };

    Object.keys(imageAtt).map(att => {
      img.setAttribute(att, imageAtt[att]);
    });

    if (format == 'svg') img.setAttribute('role', 'img');
    li.appendChild(img);

    // find middle position and  put in center of list
    const centerElement = Math.floor(this.lis.length / 2);
    this.uls[0].children[centerElement].after(li);
  }

  controlSizeContainer() {}

  bindEvents() {
    // as the widths are calculated, we need to resize
    // the carousel when the window is resized
    window.addEventListener('resize', () => console.log(window.innerWidth));
    // window.addEventListener('DOMContentLoaded', this.updateSizes);
  }

  updateSizes(e) {
    console.log(e, 'e');
  }
}

customElements.define('adaptive-menu', AdaptiveMenu);

// Container where I will controll al main settings
// List
// DropDown window

// customElements.define('expanding-list', ExpandingList);

// customElements.define('word-count', WordCount, { extends: 'p' });
// connectedCallback - будет вызван, когда пользовательский элемент оказывается впервые встроен в DOM
// attributeChangedCallback -вызывается, когда пользовательскому элементу добавляют, удаляют или изменяют какой-то атрибут
//  shadowRoot.appendChild(templateContent.cloneNode(true)); - cretae template
