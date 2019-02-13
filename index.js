/**
 * @type {typeof import('vue')}
 */
let Vue = require("vue/dist/vue") //require("vue")
require("bootstrap")
let fs = require("fs")
// let data = localStorage
var vm = new Vue({
  // el: "#app",
  data() {
    return {
      list: JSON.parse(localStorage["list"] || "[]"),
      item: {
        path: "",
        index: undefined,
        edit: false,
        warn: ""
      }
    }
  },
  methods: {
    addMenu() {

    },
    changItem(item) {
      if (!(item.path && fs.existsSync(item.path))) {
        item.warn = "文件不存在~?~"
        return
      }
      // require
      if (item.edit == false) {
        this.list.push(item)
      } else {
        Vue.set(this.list, item.index, item)
        // []
      }
    },
    delItem(index) {
      Vue.delete(this.list, index)
    },
    editItem(item) {
      this.item = item
      this.item.edit = true
    }
  },
  watch: {
    list: {
      handler(val) {
        localStorage["list"] = JSON.stringify(val)
      },
      deep: true,
    }
  }
}).$mount(document.querySelector("#app"))