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
