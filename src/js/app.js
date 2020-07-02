// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js
// Feel free with using ES6 here.
import Charts from './modules/Charts';
import Menu from './modules/menu';
import TabsInit from './modules/tabsInit';
import DropdownMenu from './modules/dropdownMenu';
import LoadImg from './modules/loadImg';
import formValidation from './modules/formValidation';
import DishMenu from './modules/dishMenu';
import Accordion from './modules/accordion';
import MenuManagement from './modules/menuManagement';
import RestaurantManagement from './modules/restaurantManagement';
import Orders from './modules/orders';
import OrdersPopUp from './modules/ordersPopUp';
import Pagination from './modules/pagination';
import UserMapPopUp from './modules/userMapPopup';
import RestaurantStatsMobilePopup from './modules/restaurantStatsMobilePopup';
import Multiselect from './modules/multisecelect';
import MSFmultiSelect from './modules/MSFmultiSelect';

const menu = new Menu();
const tabs = new TabsInit();
const charts = new Charts();
const dropdownMenu = new DropdownMenu();
const loadImg = new LoadImg();
const dishMenu = new DishMenu();
const accordion = new Accordion();
const menuManagement = new MenuManagement();
const restaurantManagement = new RestaurantManagement();
const orders = new Orders();
const ordersPopUp = new OrdersPopUp();
const userMapPopUp = new UserMapPopUp();
const restaurantStatsMobilePopup = new RestaurantStatsMobilePopup();
const multiselect = new Multiselect();
const selectMulti = document.querySelector('#multiselect') ? document.querySelector('#multiselect') : false;
if (selectMulti) {
  new MSFmultiSelect(
    document.querySelector('#multiselect'),
    {
      appendTo: '#example',
      // options here
    }
  );
}
const selectMulti2 = document.querySelector('#multiselect2') ? document.querySelector('#multiselect2') : false;
if (selectMulti2) {
  new MSFmultiSelect(
    document.querySelector('#multiselect2'),
    {
      appendTo: '#example2',
      // options here
    }
  );
}

(($) => {
  // When DOM is ready
  $(() => {
    menu.init();
    tabs.init();
    charts.init();
    dropdownMenu.init();
    loadImg.loadImg();
    formValidation.init();
    dishMenu.init();
    accordion.init();
    menuManagement.init();
    restaurantManagement.init();
    orders.init();
    multiselect.init();
    ordersPopUp.init();
    userMapPopUp.init();
    restaurantStatsMobilePopup.init();
    // FmultiSelect.init();
    const paginationArr = Array.from(document.querySelectorAll('.js-pagination'));
    if (paginationArr.length > 0) {
      paginationArr.forEach((pagination) => {
        const paginate = new Pagination(pagination, {
          itemsOnPage: 4,
          activePage: 1,
        });
        paginate.init();
      });
    }
  });
})(jQuery);



$('.restaurant-management .restaurant-tables-items-wrapper .styled-checkbox').change(function () {
  $(this).closest('.restaurant-tables-item').toggleClass('hover');
});

$('.restaurant-management .restaurant-tables-heading .styled-checkbox').change(function () {
  if($(this).is(':checked')){
    $(this).closest('.restaurant-tables').find('input[type="checkbox"]').prop('checked', true)
      .closest('.restaurant-tables-item').toggleClass('hover');
  } else {
    $(this).closest('.restaurant-tables').find('input[type="checkbox"]').prop('checked', false)
      .closest('.restaurant-tables-item').toggleClass('hover');
  }
});

$('.restaurant-management .restaurant-tables .visible-icon').click(function () {
  $(this).toggleClass('active');
});

$('.graph-select').change(function () {
  $('.restaurant-best-selling-chart-wrapper').removeClass('active');
  $('.restaurant-best-selling-chart-wrapper').eq($(this).val()).addClass('active');

});

$('.order-right__minus').click(function (e) {
  e.preventDefault();
  if($(this).closest('.order-right__counter').find('.order-right__count').val() > 0 ){
    $(this).closest('.order-right__counter').find('.order-right__count').val(parseInt($(this).closest('.order-right__counter').find('.order-right__count').val()) - 1);
  }

});

$('.order-right__plus').click(function (e) {
  e.preventDefault();
  $(this).closest('.order-right__counter').find('.order-right__count').val(parseInt($(this).closest('.order-right__counter').find('.order-right__count').val()) + 1);
});

$('.order-right__close').click(function (e) {
  e.preventDefault();
  $(this).closest('.order-right__item').slideUp();
});

$('.custom-select-js .dropdown-menu-item').click(function () {

  $(this).closest('.dropdown-menu-wrapper').prev().html($(this).html());
});

$('.undelay-orders-field').click(function () {
  $(this).closest('.delay-orders-field').removeClass('delay-orders-field');
  $(this).addClass('disable-delay');
});

$('.input-count-wrap input').each(function () {
  $(this).keypress(function (e) {
    var min = $(this).next().find('.count-min');
    var max = parseInt($(this).next().find('.count-max').html());
    var count = $(this).val().length;
    console.log(max);
    console.log(count);
    if(count >= max){
      e.preventDefault();
      return;
    }

  });
  $(this).keyup(function () {
    $(this).next().find('.count-min').html($(this).val().length);
  });
});


$('.select-box__option-add').click(function () {
  $('.popup-add-category').addClass('open');
});

$('.popup-add-category__btn a').click(function () {


  if($('.popup-add-category__input input').val().length > 0){

    var num = parseInt($('.select-box.sort-select.active .select-box__value').last().find('input').val());
    num = num + 1;

    var txt = $('.popup-add-category__input input').val();
    var name = $('.select-box.sort-select.active .select-box__value').last().find('input').attr('name');

    $('<li><label class=\"select-box__option\" for=\"dish' + num + '\" aria-hidden=\"aria-hidden\">'+txt+'</label><a href="#" class="rem-i">+</a></li>')
      .insertBefore($('.select-box.sort-select.active .select-box__option-add').parent());

    $(`<div class="select-box__value"><input class="select-box__input" type="radio" id="dish${num}" value="${num}"
      name="${name}"  />
        <p class="select-box__input-text">${txt}</p>
      </div>`).insertBefore($('.select-box.sort-select.active .select-box__value').last());


    $('.popup-add-category').removeClass('open');
  }
});

$('.popup-add-category__close').click(function () {
  $('.popup-add-category').removeClass('open');
});

$('.ingredient-input-i').keyup(function () {
  if($(this).val().length > 3){
    $('.ingredient-input-i_capt').addClass('open');
  } else {
    $('.ingredient-input-i_capt').removeClass('open');
  }

});

$('.ingredient-input-i_capt-i').click(function () {
  $('.ingredient-input-i').val($(this).html());
  $('.ingredient-input-i_capt').removeClass('open');
});

$('.pop-up-payment-status button').click(function () {
  $('.pop-up-payment-status button').removeClass('selected');
  $(this).addClass('selected')
});

$(document).on('click', '.rem-i',function (e) {
  e.preventDefault();
  $('input[id="'+$(this).prev().attr('for')+'"]').parent().remove();
  $(this).parent().remove();
});

$('.orders-table-list').click(function (e) {
  if($(e.target).closest('.order-expand-btn').length > 0){
    e.preventDefault();
  }
});
