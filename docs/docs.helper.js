/**
 * This is Vue Design System’s JS helper file for docs.
 * You can add more things if/when needed.
 */
import Vue from "vue"
import statusLabels from "./utils/statusLabels"
import activeNav from "./utils/activeNav"
import filterSearch from "./utils/filterSearch"
import "codemirror/mode/jsx/jsx"
import VueLazyload from "vue-lazyload"
import VueMoment from "vue-moment"
import VModal from "vue-js-modal"
import VueAutosize from "vue-autosize"
import WebFontLoader from "../src/utils/webFontLoader" // eslint-disable-line no-unused-vars

import "xe-utils"
import VXETable from "vxe-table"

Vue.config.productionTip = false
Vue.mixin(statusLabels)
Vue.use(VueLazyload)
Vue.use(VueMoment)
Vue.use(VModal)
Vue.use(VueAutosize)
Vue.use(VXETable)

document.addEventListener("DOMContentLoaded", () => {
  filterSearch.methods.init()
  activeNav.methods.init()
})

window.addEventListener("hashchange", () => {
  filterSearch.methods.init()
  activeNav.methods.init()
})
