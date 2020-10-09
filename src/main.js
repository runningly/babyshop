import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "amfe-flexible"
import 'vant/lib/index.css'

import doglazy from './assets/img/doglazy.gif'



// 引入Vant-ui
import { Tabbar, TabbarItem, NavBar, Swipe, SwipeItem, Lazyload, Grid, GridItem, Image as VanImage, Card, PullRefresh, Toast, Icon, List, Search, Sidebar, SidebarItem, Cell, CellGroup, GoodsAction,GoodsActionButton,  GoodsActionIcon, Sku, Form ,Button, Field, ActionSheet,ContactCard, ContactList,  ContactEdit,AddressList, AddressEdit } from 'vant'
// 按需引入

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: doglazy
})
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(VanImage)
Vue.use(VanImage)
Vue.use(Card)
Vue.use(PullRefresh)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(List)
Vue.use(Search)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Sku)
Vue.use(Form)
Vue.use(Button)
Vue.use(Field)
Vue.use(ActionSheet)
Vue.use(ContactCard)
Vue.use(ContactList)
Vue.use(ContactEdit)
Vue.use(AddressList)
Vue.use(AddressEdit)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
