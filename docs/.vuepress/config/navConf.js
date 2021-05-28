module.exports = [
  { text: '首页', link: '/' },
  { text: '关于', link: '/about' },
  {
    text: '测试分组',
    ariaLabel: 'Language Menu',
    items: [
      {
        text: '分组1', items:
          [
            { text: '分组1内容 aa', link: '/group1/aa' }
            , { text: '分组2内容 group', link: '/group1/group' }
          ]
      },
      {
        text: '分组2', items:
          [{ text: '分组2内容 bb', link: '/group2/bb' }
            , { text: '分组2内容 group', link: '/group2/group' }]
      },
    ]
  },
  { text: '链接', link: 'https://baidu.com' },
]