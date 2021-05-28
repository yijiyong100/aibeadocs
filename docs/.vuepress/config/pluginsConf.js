const moment = require('moment');
moment.locale("zh-cn")
const secret = require('./secret');
const autoSideBar = require('./autoSideBarConf');

module.exports = {
  '@vuepress/last-updated': {
    transformer: (timestamp) => {
      // 不要忘了安装 moment
      return moment(timestamp).format("L")
    }
  },
  '@vssue/vuepress-plugin-vssue': {
    // 设置 `platform` 而不是 `api`
    platform: 'github-v4',
    // 其他的 Vssue 配置
    owner: secret.owner,
    repo: secret.repo,
    clientId: secret.clientId,
    clientSecret: secret.clientSecret,
    autoCreateIssue: true
  },
  '@vuepress/back-to-top': true,
  '@vuepress/medium-zoom': {
    selector: 'img.zoom-custom-imgs'
  },
  "vuepress-plugin-auto-sidebar": autoSideBar
}