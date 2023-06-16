class Logo {
  constructor(logo) {
    this.li = document.createElement('li');
    this.logo = logo;
  }

  init() {
    this.li.classList = 'menu__logo';
    const img = document.createElement('img');

    this.li.style.width = '70px';

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
    this.li.appendChild(img);
  }

  append(isHide) {
    if (isHide) {
      this.hide();
    }
    this.after(this.li);
  }

  hide() {
    this.li.style.display = 'none';
  }
  show() {
    this.li.style.display = 'block';
  }
  remove() {
    this.li.remove();
  }
}

export const Logo = new Logo();
export default Logo;
