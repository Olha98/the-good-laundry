class AdaptiveMenu extends HTMLElement {
  static initState = {
    activeDropDown: false,
    dropDownList: [],
  };

  static get observedAttributes() {
    return ['menu-length', 'data-list'];
  }

  constructor() {
    super();
    this.gap = this.getAttribute('gap') || 30;
    this.logo = this.getAttribute('logo');
    this.uls = Array.from(this.querySelectorAll('ul'));
    this.lis = Array.from(this.querySelectorAll('li'));

    this.menuLength = 0;

    this.state = { ...AdaptiveMenu.initState };
    this.widthContainer = this.offsetWidth;

    const resizeObserver = new ResizeObserver(this.onResize.bind(this));
    resizeObserver.observe(this.uls[0]);

    this.wrappers = this.initWrappers();
    this.wrappers.append(true);
    this.wrappers.show();

    this.dropDown = this.initDropDown();
    this.dropDown.append(true);

    this.logo = this.initLogo();
    this.logo.append(true);

    this.li = this.addLabel();
    if (!document.contains(this.li)) this.uls[0].after(this.li);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'menu-length' && +oldValue !== +newValue) {
      this.menuLength = newValue;

      this.logo.remove();
      this.addLogo();
    }
  }

  connectedCallback() {
    this.bindEvents();
  }

  disconnectedCallback() {
    this.bindEvents();
  }

  onResize(entries) {
    window.requestAnimationFrame(() => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }

      const { dropDownList } = this.state;

      const entry = entries[0];
      const container = entry.target;
      let listItems = container.children;

      let widthItems = 0;

      const arrayListItem = Array.from(listItems).reduce((acc, item) => {
        const children = [];
        if (item.childNodes.length > 0 && item.tagName !== 'LI') {
          children.push(Array.from(item.children));
        }

        acc.push(...children);
        return acc.flat();
      }, []);

      arrayListItem.map(item => (widthItems += item.offsetWidth + Number(this.gap)));
      const ITEM_MAX_WIDTH = widthItems / arrayListItem.length;

      const itemNeeded = Math.ceil(entry.contentRect.width / ITEM_MAX_WIDTH);

      console.log(arrayListItem.filter(item => item.classList.contains('display-none')));
      console.log(arrayListItem.length - itemNeeded, 'arrayListItem.length');

      arrayListItem.reduce((acc, item, index, arr) => {
        const first = this.wrappers.first_wrapper.children.length;
        const second = this.wrappers.second_wrapper.children.length;

        let middle = itemNeeded % 2 === 0 ? itemNeeded / 2 : Math.ceil(itemNeeded / 2);
        arrayListItem[first - 2].style.background = 'red';
        const contains = arrayListItem.filter(item => item.classList.contains('display-none'));

        // console.log(contains, 'contains');

        if (index > first - middle && index < first) {
          arrayListItem[index].style.background = 'red';
          item.classList.add('display-none');
          // console.log(item);
        }

        if (index >= first + second - middle && index <= first + second) {
          arrayListItem[index].style.background = 'blue';
          item.classList.add('display-none');
        }
        // if (listItems.length < itemNeeded){
        //   item.classList.remove('display-none');
        // }

        if (contains === itemNeeded) return acc;


      }, []);

      // while (listItems.length < itemNeeded && dropDownList.length > 0) container.append(...dropDownList.splice(0, 1));

      this.setAttribute('menu-length', listItems.length);

      if (entry.contentRect.width === 0)
        container.append(...dropDownList.splice(dropDownList[dropDownList.length - 1], 1));
      if (dropDownList.length === 0 || listItems.length === 0) this.li.remove();

      // if (window.matchMedia('screen and (max-width: 768px)').matches == true) {
      //   this.li.style.opacity = '0';
      // } else {
      //   this.li.style.opacity = '1';
      // }
    });
  }

  initWrappers() {
    const first_wrapper = document.createElement('div');
    const second_wrapper = document.createElement('div');

    first_wrapper.classList = 'links-animate-wrapper';
    second_wrapper.classList = 'links-animate-wrapper';

    const menu = Array.from(this.uls[0].children);

    const splitArr = (arr, chunks) => [...Array(chunks)].map((_, c) => arr.filter((n, i) => i % chunks === c));

    this.uls[0].append(first_wrapper);
    this.uls[0].append(second_wrapper);

    const hide = () => {
      first_wrapper.style.display = 'none';
      second_wrapper.style.display = 'none';
    };

    const show = () => {
      first_wrapper.style.display = 'flex';
      second_wrapper.style.display = 'flex';
      first_wrapper.append(...splitArr(menu, 2)[0]);
      second_wrapper.append(...splitArr(menu, 2)[1]);
    };

    const append = isHide => {
      if (isHide) {
        hide();
      }
    };

    const remove = () => {
      first_wrapper.remove();
      second_wrapper.remove();
    };

    return {
      first_wrapper,
      second_wrapper,
      getChunksArr: (arr = menu, chunks = 2) => {
        return splitArr(arr, chunks);
      },
      hide,
      append,
      remove,
      show,
    };
  }

  // addWrappers() {
  //   console.log('first')
  //   this.uls[0].append(this.wrappers.first_wrapper);
  //   this.uls[0].append(this.wrappers.second_wrapper);
  // }

  addLabel() {
    const li = document.createElement('li');
    li.classList = 'dropDown_label menu__label';

    const a = document.createElement('a');
    let labelActiveDropDown = this.getAttribute('label');
    a.innerHTML = labelActiveDropDown;

    const span = document.createElement('span');
    span.innerHTML = '&#9660;';

    a.append(span);
    li.append(a);

    return li;
  }

  initLogo() {
    const li = document.createElement('li');
    li.classList = 'menu__logo';
    const img = document.createElement('img');

    li.style.width = '70px';

    const splitImg = this.logo.split('.');
    const format = splitImg[splitImg.length - 1];

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

    const hide = () => (li.style.display = 'none');

    return {
      container: li,
      show: () => (li.style.display = 'block'),
      hide,
      append: isHide => {
        if (isHide) {
          hide();
        }
        this.after(li);
      },

      remove: () => li.remove(),
    };
  }

  addLogo() {
    console.log('ello');
    this.logo.show();
    const menuLength = this.getAttribute('menu-length');
    const centerElement = Math.floor(menuLength / 2);

    if (menuLength > 0) {
      this.uls[0].children[centerElement - 1].after(this.logo.container);
    } else {
      this.uls[0].children[centerElement].before(this.logo.container);
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

    this.dropDown.setContent(dropDownList);
    this.state.activeDropDown = !activeDropDown;

    if (activeDropDown) {
      this.dropDown.show();
    } else {
      this.dropDown.hide();
    }
  }

  bindEvents() {
    this.li.addEventListener('click', () => this.toggleDropDown());
  }
}

customElements.define('adaptive-menu', AdaptiveMenu);
