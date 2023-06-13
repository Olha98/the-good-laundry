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

  addLabel() {
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

    return li;
  }

  directionForResize(width) {
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

    return { toSmall, toLarge, toMiddle };
  }

  controlContainerSize(width) {
    const li = this.addLabel();
    const { toSmall, toLarge, toMiddle } = this.directionForResize(width);
    const { dropDownList, menuList } = this.state;

    const widthList = width;
    let widthItems = 0;

    const menuAdd = Array.from(this.uls[0].children);
    console.log(menuAdd, 'menuAdd');

    let menuChild = Array.from(this.uls[0].children);

    const dividedMenu = menuChild.reduce((acc, elem, index) => {
      acc = {
        itemsIndex: index,
        widthItems: (widthItems += elem.offsetWidth + Number(this.gap)),
        freeSpace: (width - acc.widthItems) / index,
        arrayMenu: [],
        arrayDropDown: [],
      };

      const moveToIndexes = index => {
        const saveMenuChild = [...menuChild];
        acc.arrayMenu = saveMenuChild.slice(0, index);

        acc.arrayDropDown = saveMenuChild.splice(acc.arrayMenu.length, menuChild.length);

        this.state.dropDownList = acc.arrayDropDown;
        this.state.menuList = acc.arrayMenu;

        this.uls[0].replaceChildren(...acc.arrayMenu);
        if (!document.contains(li)) this.uls[0].append(li);
      };

      console.log(acc.freeSpace, 'acc.freeSpace');

      if (acc.freeSpace >= Number(this.gap) && !toLarge) {
        moveToIndexes(acc.itemsIndex);
      }

      if (toLarge) {
        location.reload();
      }
      // if (acc.arrayDropDown === 0) {
      //   console.log('first');

      // }

      return acc;
    }, {});
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
    //  labelElement?.addEventListener('mouseup', () => window.reloude);
  }
}

customElements.define('adaptive-menu', AdaptiveMenu);
