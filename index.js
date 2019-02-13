let Vue = require("vue/dist/vue") //require("vue")
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
        edit: false
      }
    }
  },
  methods: {
    addMenu() {

    },
    changItem(item) {
      if (item.edit == false) {
        this.list.push(item)
      } else {
        Vue.set(this.list, item.index, item)
        // []
      }
    }
  },
  // computed: {
  //   list: {
  //     get() {
  //       return localStorage
  //     }
  //   }
  // },
  watch: {
    list: {
      handler(val) {
        localStorage["list"] = JSON.stringify(val)
      },
      deep: true,
    }
  }
}).$mount(document.querySelector("#app"))