

let catsJSON = [{
    title: 'Кот полосатый 1',
    discount: 40,
    liked: false,
    img_src: 'img/cat_1.png',
    color: 'Коричневый окрас',
    age: 1,
    paws: 4,
    price: '30 000',
    to_buy: true,
  },{
    title: 'Кот полосатый 2',
    discount: 0,
    liked: true,
    img_src: 'img/cat_2.png',
    color: 'Коричневый окрас',
    age: 3,
    paws: 4,
    price: '40 000',
    to_buy: false,
  },{
    title: 'Кот полосатый 3',
    discount: 0,
    liked: false,
    img_src: 'img/cat_3.png',
    color: 'Коричневый окрас',
    age: 2,
    paws: 4,
    price: '20 000',
    to_buy: true,
  },{
    title: 'Кот полосатый 4',
    discount: 0,
    liked: false,
    img_src: 'img/cat_1.png',
    color: 'Коричневый окрас',
    age: 6,
    paws: 4,
    price: '25 000',
    to_buy: true,
  },{
    title: 'Кот полосатый 5',
    discount: 40,
    liked: false,
    img_src: 'img/cat_3.png',
    color: 'Коричневый окрас',
    age: 4,
    paws: 4,
    price: '30 000',
    to_buy: true,
  },{
    title: 'Кот полосатый 6',
    discount: 0,
    liked: true,
    img_src: 'img/cat_2.png',
    color: 'Коричневый окрас',
    age: 9,
    paws: 4,
    price: '10 000',
    to_buy: false,
  },
]

Vue.component('el', {
  props: ['cat',],
  template: '<div class="el">'+
    '<img :src="cat.img_src" :alt="cat.title" class="el__img">'+
    '<div class="discount" v-if="cat.discount > 0">-{{cat.discount}}%</div>'+
    '<div class="like" :class="{ liked: cat.liked }" v-on:click="$emit(\'like\')"></div>'+
    '<div class="el__title">{{cat.title}}</div>'+
    '<div class="el__info">'+
      '<div class="el__border"></div>'+
      '<div class="el__color">{{cat.color}}</div>'+
      '<div class="el__age">'+
        '<div class="el__age_bold">{{cat.age}} мес</div>'+
        '<div class="el__age_small">Возраст</div>'+
      '</div>'+
      '<div class="el__paw">'+
        '<div class="el__paw_bold">{{cat.paws}}</div>'+
        '<div class="el__paw_small">Кол-во лап</div>'+
      '</div>'+
    '</div>'+
    '<div class="el__price">{{cat.price}} руб.</div>'+
    '<button v-if="cat.to_buy"  class="buy" v-on:click="$emit(\'buy\')">'+
      'Купить'+
    '</button>'+
    '<button v-else class="buy buy-disabled">'+
      'Продан'+
    '</button>'+
  '</div>'
});

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

var CatApp = new Vue({
  el: '#CatApp',
  data: {
    data: catsJSON,
    filteredBuy: '',
    filteredOrder: '',
    popUp: false,
    popUpText: '',
    email: '',
  },
  methods: {
    filter_age: function () {
      if (this.filteredBuy === 'age') {
        if (this.filteredOrder === 'asc') {
          this.filteredOrder = 'desc';
          catsJSON.sort(function (a, b) {
            return a.age - b.age
          });
        } else {
          this.filteredOrder = 'asc';
          catsJSON.sort(function (a, b) {
            return b.age - a.age
          });
        }
      } else {
        this.filteredBuy = 'age';
        this.filteredOrder = 'asc';
        catsJSON.sort(function (a, b) {
          return b.age - a.age
        });
      }
    },
    filter_price: function () {
      if (this.filteredBuy === 'price') {
        if (this.filteredOrder === 'asc') {
          this.filteredOrder = 'desc';
          catsJSON.sort(function (a, b) {
            return parseInt(a.price) - parseInt(b.price)
          })
        } else {
          this.filteredOrder = 'asc';
          catsJSON.sort(function (a, b) {
            return parseInt(b.price) - parseInt(a.price)
          })
        }
      } else {
        this.filteredBuy = 'price';
        this.filteredOrder = 'asc';
        catsJSON.sort(function (a, b) {
          return parseInt(b.price) - parseInt(a.price)
        })
      }
    },
    like: function (index) {
      if (!this.data[index].liked) {
        this.popUpText = 'Лайкнут ' + this.data[index].title;
        this.popUp = true;
      }
      this.data[index].liked = !this.data[index].liked;
    },
    buy: function (index) {
      this.popUpText = 'Куплен ' + this.data[index].title;
      this.popUp = true;
    },
    subscribe: function () {
      if (this.email == '') {
        this.popUpText = 'Укажите почту';
      } else {
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(this.email)) {
          this.popUpText = 'Вы подписаны';
        } else {
          this.popUpText = 'Неправельный формат почты';
        }
      }
      this.popUp = true;
    },
    onTop:  function (index) {
      scrollTo(document.documentElement, 0, 550);
    },
    handleScroll: function (evt, el) {
      if (window.pageYOffset !== 0) {
        el.classList.add("on_top-show")
      } else {
        el.classList.remove("on_top-show")
      }
    },
  },
  computed: {
    filterAgeClass: function () {
      return {
        'filtered': this.filteredBuy === 'age',
        'desc': this.filteredBuy === 'age' && this.filteredOrder === 'desc'
      }
    },
    filterPriceClass: function () {
      return {
        'filtered': this.filteredBuy === 'price',
        'desc': this.filteredBuy === 'price' && this.filteredOrder === 'desc'
      }
    },
  },
})

