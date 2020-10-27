//  const data =[
//   {
//     "breakPoint":
//     {
//       "width": 0,
//       "item": 1
//     }
//   },
//   {
//     "breakPoint":
//     {
//       "width": 374,
//       "item": 3
//     }
//   },
//   {
//     "breakPoint":
//     {
//       "width": 767,
//       "item": 5
//     }
//   }
// ];

//export default data;

//module.exports = data;

//====== Element selector ======//

function $(selector) {
  return document.querySelector(selector);
}

//====== Show/hide mobile menu ======//

function toggleEl(el, className) {
  $(el).classList.toggle(className);
}

$('.js_menu').addEventListener('click', () => toggleEl('.js_nav_mob', 'show'));
$('.js_close').addEventListener('click', () => toggleEl('.js_nav_mob', 'show'));

//====== Slider ======//

class Slider {
  constructor() {
    this.responsive = [{ breakPoint: { width: 0, item: 1 } }, //if width greater than 0 (1 item will show)
    { breakPoint: { width: 374, item: 3 } }, //if width greater than 374 (3  item will show)
    { breakPoint: { width: 767, item: 5 } //if width greater than 767 (5 item will show)
    }];
    this.container = $(".js_slider_container");
    this.nextBtn = $('.js_slider_next');
    this.prevBtn = $('.js_slider_prev');
    this.containerWidth = 0;
    this.margin = 18;
    this.items = 0;
    this.totalItems = 0;
    this.jumpSlideWidth = 0;
    this.slideNum = 1;
    this.containerWidth = this.container.offsetWidth;
    this.setNumItems();
    this.calculateContainer();
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
  }
  setNumItems() {
    for (let i = 0; i < this.responsive.length; i++) {
      if (window.innerWidth > this.responsive[i].breakPoint.width) {
        this.items = this.responsive[i].breakPoint.item;
      }
    }
  }
  calculateContainer() {
    let totalItemsWidth = 0;
    const allBox = this.container.children;

    for (let i = 0; i < allBox.length; i++) {
      allBox[i].style.width = this.containerWidth / this.items - this.margin + 'px';
      allBox[i].style.margin = this.margin / 2 + 'px';
      totalItemsWidth += this.containerWidth / this.items;
      this.totalItems++;
    }
    this.container.style.width = totalItemsWidth + 'px';
  }
  next() {
    const allSlides = Math.ceil(this.totalItems / this.items);
    if (allSlides > this.slideNum) {
      this.jumpSlideWidth = -this.containerWidth * this.slideNum;
      this.container.style.marginLeft = this.jumpSlideWidth + 'px';
      this.slideNum++;
    }
  }
  prev() {
    if (this.slideNum > 1) {
      this.slideNum--;
      this.jumpSlideWidth = this.jumpSlideWidth + this.containerWidth;
      this.container.style.marginLeft = this.jumpSlideWidth + 'px';
    }
  }
}

let slider = new Slider();
