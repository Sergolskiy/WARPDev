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


