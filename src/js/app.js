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
