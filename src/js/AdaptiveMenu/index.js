//!  - important control container, item container, different style, and add more words
//! transfer component to class
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
    this.size = this.offsetWidth;

    // this.controlContainerSize();

    // this.openDropDown();
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
    // let moveToLarge;
    // let moveToSmall;
    // if (width >= this.size) {
    //   moveToLarge = true;
    //   moveToSmall = false;
    //   // console.log('to large');
    // } else {
    //   moveToSmall = true;
    //   moveToLarge = false;
    //   // console.log('to small');
    // }
    // console.log(moveToLarge, 'moveToLarge');
    // console.log(moveToSmall, 'moveToSmall');

    const { dropDownList, menuList } = this.state;
    const widthList = width;
    let widthItems = 0; // common width all items
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
    const spaceBetweenItems = (widthList - widthItems) / menuChild.length;

    //* start logic


    if (spaceBetweenItems <= this.gap) {
      console.log('NO SPACE');
        console.log(spaceBetweenItems, 'spaceBetweenItems');
      // console.log(spaceBetweenItems, 'spaceBetweenItems');

      this.uls[0].append(li);
      widthItems += li.offsetWidth;

      let checkSpace = 0;

      menuChild.reverse().map((item, index) => {
        widthItems -= item.offsetWidth;

        const newSlice = menuChild.slice(0, -index).length;

        if (parseInt(checkSpace.toFixed()) <= Number(this.gap)) {
          this.uls[0].removeChild(item);
          checkSpace = newSlice && (widthList - widthItems) / newSlice;

          !item.classList.contains('dropDown_label') && dropDownList.push(item);
        } else {
          menuList.push(item);
        }
      });
    } else {
      let widthDynamic = 0;
      console.log('HELLLO@');
        console.log(spaceBetweenItems, 'spaceBetweenItems2');
      if (spaceBetweenItems >= this.gap) {
        const lastChild = this.uls[0].lastChild;
        // lastChild.previousElementSibling.after(dropDownList[dropDownList.length - 1]);

        // this.uls[0].append(dropDownList[dropDownList.length - 1]);
        console.log(dropDownList.length, 'dropDownList');

        dropDownList.reverse().map(item => {
          // widthItems += item.offsetWidth;
          // this.uls[0].append(item);
          // menuList.push(item);
          // console.log(item.textCont);
          // widthItems += item.offsetWidth;
          // this.uls[0].append(item);
          // menuList.push(item);
        });
      }
      console.log(menuChild.length, 'menuChild');
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
    // console.log(menuList, 'menuList');

    const length = menuList.length > 0 ? menuList.length : this.lis.length;

    const centerElement = Math.floor(length / 2);

    // if (menuList.length > 0) {
    //   this.uls[0].children[centerElement - 1].after(li);
    // } else {
    //   this.uls[0].children[centerElement].before(li);
    // }
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
    // document.addEventListener('DOMContentLoaded', () => {
    //   ItcSlider.getOrCreateInstance('.slider');
    // });
  }
}

customElements.define('adaptive-menu', AdaptiveMenu);
