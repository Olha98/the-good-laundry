//!  - important control container, item container, different style, and add more words

class DropDown {
  constructor(container) {
    this.container = container;
    // init().bind(this);
    // append().bind(this);
    // setContent().bind(this);

    // hide().bind(this);
    // show().bind(this);
    // remove().bind(this);
  }

  init() {
    const ul = document.createElement('ul');
    this.container.classList = 'drop-down_container';
    ul.classList = 'drop-down_list';
    this.container.this.append(ul);
  }

  append(isHide) {
    if (isHide) {
      hide();
    }
    this.after(this.ul);
  }

  setContent = list => {
    list.map(item => this.ul.append(item));
  };

  hide() {
    this.container.style.display = 'none';
  }
  show() {
    this.container.style.display = 'block';
  }
  remove() {
    this.container.remove();
  }
}

// const dropDown = new DropDown();

class AdaptiveMenu extends HTMLElement {
  static initState = {
    // dropDown: new DropDown(),
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

    // this.controlContainerSize();

    // this.openDropDown();
    this.controlContainerSize(this.offsetWidth);
    this.putLogo();
    this.dropDown = this.initDropDown();
    this.dropDown.append(true);
  }

  connectedCallback() {
    this.bindEvents();
  }

  disconnectedCallback() {
    this.bindEvents();
  }

  controlContainerSize(width) {
    console.log(width, 'width');
    const { dropDownList, menuList } = this.state;
    // const widthList = this.offsetWidth;
    const widthList = width;
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

    p.append(span);
    li.append(p);
    //controlling space
    menuChild.forEach(item => (widthItems += item.offsetWidth));
    const spaceBetweenItems = (widthList - widthItems) / menuChild.length;

    // console.log(spaceBetweenItems, 'spaceBetweenItems');

    if (spaceBetweenItems <= this.gap) {
      console.log('NO SPACE');
      // console.log(this.uls[0].children, '(this.uls[0].children');

      this.uls[0].append(li);
      widthItems += li.offsetWidth;

      let checkSpace = 0;

      menuChild.reverse().map((item, index) => {
        widthItems -= item.offsetWidth;

        const newSlice = menuChild.slice(0, -index).length;

        console.log(checkSpace, 'checkSpace');

        if (parseInt(checkSpace.toFixed()) <= Number(this.gap)) {
          checkSpace = newSlice && (widthList - widthItems) / newSlice;

          this.uls[0].removeChild(item);
          dropDownList.push(item);
        } else {
          menuList.push(item);
        }
      });
    } else {
      let widthDynamic = 0;
      const spaceBetweenItems = (widthList - widthDynamic) / menuList.length;

      console.log(spaceBetweenItems, 'spaceBetweenItems');
      console.log(menuList, 'menuList');

      if (spaceBetweenItems >= this.gap) {
        dropDownList.map(item => {
          // widthDynamic += item.offsetWidth;
          this.uls[0].append(item);
          console.log('OOOOOO');
          // menuList.push(item);
        });
      }

      if (dropDownList.length === 0) {
        const label = document.querySelector('.dropDown_label');
        label && label.remove();
      }

      // item.style.display = 'inline-block';
      // this.uls[0].removeChild();
      // li.style.background = 'none';
      // li.remove();
      // p.remove();
      // console.log(saveNav, 'saveNav');
      // console.log('aalalqlalqllq');
      // console.log(this.uls[0].children, 'HERE!');
    }

    // let commonWidth = 0;
    // const nav = [];

    // menuChild.map(item => {
    //   console.log(commonWidth, 'commonWidth');
    //   if (commonWidth <= this.gap) {
    //     commonWidth += item.offsetWidth + this.gap;
    //     nav.push(item);
    //   }
    // });
    // console.log(this.lis, 'this.lis');
    // console.log(nav, 'hghgh');
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

  toggleDropDown() {
    const { dropDownList, activeDropDown } = this.state;
    this.state.activeDropDown = !activeDropDown;

    this.dropDown.setContent(dropDownList);

    if (activeDropDown) {
      this.dropDown.show();
    } else {
      this.dropDown.hide();
    }
  }

  bindEvents() {
    const labelElement = this.querySelector('.dropDown_label');
    // console.log(header__container, 'header__container');
    // as the widths are calculated, we need to resize
    // the carousel when the window is resized
    //  const widthList = this.offsetWidth;
    window.addEventListener('resize', e => {
      const width = this.offsetWidth;
      this.controlContainerSize(width);
    });
    // window.addEventListener('resize', () => this.updateSizes.bind(this));
    labelElement?.addEventListener('click', () => this.toggleDropDown());
  }
}

customElements.define('adaptive-menu', AdaptiveMenu);
