//!  - important control container, item container, different style, and add more words
//! transfer component to class

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
    this.widthContainer = this.offsetWidth;

    this.stylesheet();
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

  stylesheet() {
    this.uls[0].style.gap = `${this.gap}px`;
  }

  controlContainerSize(width) {
    let toSmall = false;
    let toLarge = false;
    let toMiddle = false;

    console.log(this.widthContainer, width);

    if (this.widthContainer === width) {
      toMiddle = true;
      console.log('to middle');
    }
    if (this.widthContainer > width && this.widthContainer !== width) {
      toSmall = true;
      toLarge = false;
      console.log('to small');
    }
    if (this.widthContainer < width && this.widthContainer !== width) {
      toLarge = true;
      toSmall = false;
      console.log('to large');
    }
    this.widthContainer = width;

    const { dropDownList, menuList } = this.state;
    const widthList = width;
    let widthItems = 0;
    let menuChild = Array.from(this.uls[0].children);

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
    const spaceBetweenAllItems = (widthList - widthItems) / menuChild.length;
    console.log(spaceBetweenAllItems, 'spaceBetweenAllItems');

    if (spaceBetweenAllItems <= this.gap && (toSmall || toMiddle)) {
      this.uls[0].append(li);
      widthItems += li.offsetWidth;

      let checkMenuSpace = 0;

      menuChild.reverse().map((item, index) => {
        widthItems -= item.offsetWidth;

        const newSlice = menuChild.slice(0, -index).length;

        if (parseInt(checkMenuSpace.toFixed()) <= Number(this.gap) + 10) {
          this.uls[0].removeChild(item);
          checkMenuSpace = newSlice && (widthList - widthItems) / newSlice;

          !item.classList.contains('dropDown_label') && dropDownList.push(item);
        } else {
          menuList.push(item);
        }
      });
    }

    const menuChildToLarge = Array.from(this.uls[0]);
    menuChildToLarge.forEach(item => (widthItems += item.offsetWidth));
    const spaceBetween = (widthList - widthItems) / menuChild.length;

    if (spaceBetween >= this.gap && toLarge && dropDownList.length > 0) {
      console.log('HELLLO@');
      const lastChild = this.uls[0].lastChild;

      let checkMenuSpace = 0;

      console.log(menuChild.length, 'this.uls[0]1');

      this.uls[0].insertBefore(dropDownList[0], lastChild);

      dropDownList.map((item, index) => {
        const element = dropDownList[dropDownList.length - index] || item;
        // widthItems += item.offsetWidth;

        const newSlice = menuChild.slice(0, -index).length;
      });
      // }
    }
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
    let size = this.offsetWidth;

    let resizeId;
    window.addEventListener('resize', () => {
      clearTimeout(resizeId);

      resizeId = setTimeout(() => {
        const dinamicWidth = this.offsetWidth;
        this.controlContainerSize(dinamicWidth);
      }, 50);
    });

    labelElement?.addEventListener('click', () => this.toggleDropDown());
  }
}

customElements.define('adaptive-menu', AdaptiveMenu);
