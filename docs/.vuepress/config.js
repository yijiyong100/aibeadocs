const { auto } = require("async");
const { text } = require("body-parser");
const moment = require('moment');
moment.locale("zh-cn")


module.exports = {
  base: "/aibeadocs/",
  title: '智能后端和架构',
  description: '智能后端和架构的文档',
  head: [
    ['meta', { name: 'icon', content: '' }],
    ['meta', { name: 'author', content: 'landry -- seo 选项' }],
    ['meta', { name: 'keywords', content: '后端 java 架构 面试 -- seo 选项' }]
  ],
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp) => {
          // 不要忘了安装 moment
          return moment(timestamp).format("LLLL")
        }
      }
    ]
  ],
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