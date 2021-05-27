const { auto } = require("async");
const { text } = require("body-parser");
const moment = require('moment');
moment.locale("zh-cn")


module.exports = {
  title: '智能后端和架构',
  description: '智能后端和架构的文档',
  head: [
    ['meta', { name: 'icon', content: '' }],
    ['meta', { name: 'author', content: 'landry -- seo 选项' }],
    ['meta', { name: 'keywords', content: '后端 java 架构 面试 -- seo 选项' }]
  ],
  plugins: {
    '@vuepress/last-updated': {
      transformer: (timestamp) => {
        // 不要忘了安装 moment
        return moment(timestamp).format("LLLL")
      }
    },
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github-v4',
      // 其他的 Vssue 配置
      owner: 'yijiyong100',
      repo: 'aibeadocs',
      clientId: '38fc681f3b83868f76c6',
      clientSecret: '9f67078aecce20a2327f0da9f9e0fb5bbe4e1e87',
      autoCreateIssue: true
    },
    '@vuepress/back-to-top': true
  },
  themeConfig: {
    logo: '/assets/img/logo.png',
    sidebar: 'auto',
    lastUpdated: '更新时间', // string | boolean
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/about' },
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          {
            text: '分组1', items:
              [{ text: 'Chinese', link: '/language/chinese/' },
              { text: 'Japanese', link: '/language/japanese/' }]
          },
          {
            text: '分组1', items:
              [{ text: 'Chinese', link: '/language/chinese/' },
              { text: 'Japanese', link: '/language/japanese/' }]
          },
        ]
      },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}