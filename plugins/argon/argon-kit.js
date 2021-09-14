import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import vClickOutside from 'v-click-outside'
import globalDirectives from './globalDirectives'
import globalComponents from './globalComponents'

Vue.use(globalComponents)
Vue.use(globalDirectives)
Vue.use(VueLazyload)
// Replace custom click-outside directive with vClickOutside (IOS fix)
Vue.use(vClickOutside)
