/**
 * @type {typeof import('vue')}
 */
let Vue = require("vue/dist/vue") //require("vue")
require("bootstrap")
let fs = require("fs")
let {spawn} = require("child_process")
var vm = new Vue({
  // el: "#app",
  data() {
    return {
      warn: "",
      list: JSON.parse(localStorage["list"] || "[]"),
      item: {
        path: "",
        index: undefined,
        edit: false,
        warn: ""
      },
      child: undefined
    }
  },
  methods: {
    // addMenu() {

    // },
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
      }
    },
    delItem(index) {
      Vue.delete(this.list, index)
    },
    editItem(item, index) {
      this.item = JSON.parse(JSON.stringify(item))
      this.item.index = index

      if (!(this.item.path && fs.existsSync(this.item.path))) {
        this.item.warn = "文件不存在~?~"
        return
      }

      this.item.edit = true
    },
    openPath(path) {

      this.child = spawn(`explorer.exe`, [path])
      var bat = this.child
      bat.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      bat.stderr.on('data', (data) => {
        console.log(data.toString());
      });

      bat.on('exit', (code) => {
        // console.log(`Child exited with code ${code}`);
      });
      // child_process.
      // function (err, stdout, stderr) {
      //   if (err) {
      //     this.warn = "打开失败"
      //   } else {
      //     console.log(stdout, stderr)
      //   }
      // }
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