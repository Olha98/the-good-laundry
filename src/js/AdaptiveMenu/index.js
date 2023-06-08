//!  - important control container, item container, different style, and add more words

class AdaptiveMenu extends HTMLElement {
  static initState = {
    activeDropDown: false,
    dropDownList: [],
    menuList: [],
  };

  constructor() {
    super();
    this.gap = this.getAttribute('gap') || 30;
    this.logo = this.getAttribute('logo');
    this.uls = Array.from(this.querySelectorAll('ul'));
    this.lis = Array.from(this.querySelectorAll('li'));

    this.state = { ...AdaptiveMenu.initState };

    this.controlContainerSize();
    this.putLogo();
    // this.openDropDown();

    this.dropDown = this.initDropDown();
    this.dropDown.append(true);

    // this.bindEvents().bind(this);
  }

  connectedCallback() {
    this.bindEvents();
  }

  disconnectedCallback() {
    this.bindEvents();
  }

  controlContainerSize() {
    const { dropDownList, menuList } = this.state;
    const widthList = this.offsetWidth;
    let menuChild = Array.from(this.uls[0].children);
    let widthItems = 0; // common width all items

    //create label for dropDown
    const li = document.createElement('li');
    li.classList = 'dropDown_label';

    const p = document.createElement('p');
    let labelActiveDropDown = this.getAttribute('label');
    p.innerHTML = labelActiveDropDown;

    const span = document.createElement('span');
    span.innerHTML = '&#9660;';

    // console.log(span.textContent === '&#9650;');

    p.append(span);
    li.append(p);
    //controlling space
    menuChild.forEach(item => (widthItems += item.offsetWidth));
    const spaceBetweenItems = (widthList - widthItems) / menuChild.length;
    console.log(spaceBetweenItems, 'spaceBetweenItems');
    // if (spaceBetweenItems < this.gap) {
    this.uls[0].append(li);
    widthItems += li.offsetWidth;

    let checkSpace = 0;

    menuChild.reverse().map((item, index) => {
      widthItems -= item.offsetWidth;
      const newSlice = menuChild.slice(0, -index).length;

      checkSpace = newSlice && (widthList - widthItems) / newSlice;

      if (parseInt(checkSpace.toFixed()) >= this.gap) {
        menuList.push(item);
      } else {
        this.uls[0].removeChild(item);
        dropDownList.push(item);
      }
    });

    // menuChild.map(item => item.removeChild(item));
    // console.log(this.uls[0].children);
    console.log(menuChild), 'menuChild';

    // this.uls[0].childNodes = [];
    // }
  }

  putLogo() {
    const { menuList } = this.state;

    //generate img
    const li = document.createElement('li');
    const img = document.createElement('img');

    const splitImg = this.logo.split('.');
    const format = splitImg[splitImg.length - 1]; //svg

    const imageAtt = {
      src: this.logo,
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
    console.log(menuList, 'menuList');
    const length = menuList.length > 0 ? menuList.length : this.lis.length;

    const centerElement = Math.floor(length / 2);

    if (menuList.length > 0) {
      this.uls[0].children[centerElement - 1].after(li);
    } else {
      this.uls[0].children[centerElement].before(li);
    }
  }

  initDropDown() {
    const div = document.createElement('div');

    const ul = document.createElement('ul');
    div.classList = 'drop-down_container';
    ul.classList = 'drop-down_list';

    div.append(ul);

    const hide = () => (div.style.display = 'none');

    const setContent = list => {
      list.map(item => ul.append(item));
    };

    return {
      container: div,
      show: () => (div.style.display = 'block'),
      // init: () => (div.style.display = 'block'),
      hide,
      append: isHide => {
        if (isHide) {
          hide();
        }
        this.after(div);
      },
      remove: () => div.remove(),
      setContent,
    };
  }

  openDropDown() {
    const { dropDownList, activeDropDown } = this.state;
    this.state.activeDropDown = !activeDropDown;

    console.log(dropDownList, 'activeDropDown');

    this.dropDown.setContent(dropDownList);

    if (activeDropDown) {
      this.dropDown.show();
    } else {
      this.dropDown.hide();
    }

  }

  bindEvents() {
    const labelElement = this.querySelector('.dropDown_label');

    // as the widths are calculated, we need to resize
    // the carousel when the window is resized
    window.addEventListener('resize', () => console.log(window.innerWidth));
    labelElement.addEventListener('click', this.openDropDown.bind(this));
  }

  updateSizes(e) {
    // console.log(e, 'e');
  }
}

customElements.define('adaptive-menu', AdaptiveMenu);
