//!  - important control container, item container, different style, and add more words
//! transfer component to class

class AdaptiveMenu extends HTMLElement {
  static initState = {
    activeDropDown: false,
    dropDownList: [],
    menuList: 0,
  };

  constructor() {
    super();
    this.gap = this.getAttribute('gap') || 30;
    this.logo = this.getAttribute('logo');
    this.uls = Array.from(this.querySelectorAll('ul'));
    this.lis = Array.from(this.querySelectorAll('li'));
    this.a = Array.from(this.querySelectorAll('a'));

    this.state = { ...AdaptiveMenu.initState };
    this.widthContainer = this.offsetWidth;

    this.li = this.addLabel();

    const resizeObserver = new ResizeObserver(this.onResize.bind(this));

    resizeObserver.observe(this.uls[0]);

    //  const mutationObserver = new MutationObserver(this.onMutation.bind(this));
    //  resizeObserver.observe(this.uls[0]);

    this.dropDown = this.initDropDown();
    this.dropDown.append(true);

    this.addLogo();

    if (!document.contains(this.li)) this.uls[0].after(this.li);
  }

  connectedCallback() {
    this.bindEvents();
  }

  disconnectedCallback() {
    this.bindEvents();
  }

  onResize(entries) {
    const entry = entries[0];
    const container = entry.target;
    let widthItems = 0;

    let listItems = container.children;
    let arrayListItem = Array.from(listItems);

    const { dropDownList } = this.state;
    const labelElement = this.querySelector('.dropDown_label');
    arrayListItem.map(item => (widthItems += item.offsetWidth + Number(this.gap)));

    const ITEM_MAX_WIDTH = widthItems / arrayListItem.length;
    labelElement.style.marginLeft = `${ITEM_MAX_WIDTH / 2}px`;

    const itemNeeded = Math.ceil(entry.contentRect.width / ITEM_MAX_WIDTH);
    this.state.dropDownList.push(...arrayListItem.slice(itemNeeded));

    while (listItems.length > itemNeeded) listItems[listItems.length - 1].remove();
    while (listItems.length < itemNeeded) {
      const element = dropDownList.splice(0, 1);
      console.log(element, 'item');

      container.append(...dropDownList.splice(0, 1));
    }

    if (dropDownList.length === 0) this.li.remove();
  }

  addLabel() {
    //create label for dropDown
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

  addLogo() {
    const { menuList, dropDownList } = this.state;
    console.log(dropDownList, 'hhhh');
    //generate img
    const li = document.createElement('li');
    const img = document.createElement('img');

    li.style.width = '50px';

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

    this.dropDown.setContent(dropDownList);
    this.state.activeDropDown = !activeDropDown;

    if (activeDropDown) {
      this.dropDown.show();
    } else {
      this.dropDown.hide();
    }
  }

  bindEvents() {
    const labelElement = this.querySelector('.dropDown_label');
    labelElement.addEventListener('click', () => this.toggleDropDown());
  }
}

customElements.define('adaptive-menu', AdaptiveMenu);
