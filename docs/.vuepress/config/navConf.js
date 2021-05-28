module.exports = [
  { text: '首页', link: '/' },
  { text: '关于', link: '/about' },
  {
    text: '测试分组',
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
  { text: '链接', link: 'https://google.com' },
]