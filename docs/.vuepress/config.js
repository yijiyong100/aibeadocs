const { auto } = require("async");
const { text } = require("body-parser");

const headConf = require("./config/headConf")
const pluginsConf = require("./config/pluginsConf")
const navConf = require("./config/navConf")


module.exports = {
  title: '智能后端和架构',
  description: '智能后端和架构的文档',
  head: headConf,
  plugins: pluginsConf,
  themeConfig: {
    logo: '/assets/img/logo.png',
    lastUpdated: '更新时间', // string | boolean
    nav: navConf
  }
}