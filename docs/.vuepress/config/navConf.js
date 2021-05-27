module.exports = [
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