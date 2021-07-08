const moment = require('moment');
moment.locale("zh-cn")
const secret = require('./secret');
const autoSideBar = require('./autoSideBarConf');

module.exports = {
  '@vuepress/last-updated': {
    transformer: (timestamp) => {
      // 不要忘了安装 moment
      return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
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
  //  "vuepress-plugin-auto-sidebar": autoSideBar,  暂时关闭自动侧边栏
  '@vuepress/back-to-top': false,
  '@vuepress/medium-zoom': {
    selector: 'img.zoom-custom-imgs'
  }
}