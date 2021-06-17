module.exports = {
  "/java/":
    [
      {
        title: 'Java基础',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/basic/01-lan-feature',
          '/java/basic/02-oop-feature',
          '/java/basic/03-class'
        ]
      },
      {
        title: 'Java集合类',   // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,    // 可选的, 默认值是 1
        children: [
          '/java/collection/01-intro',
        ]
      }
    ],
  "/building/": [
    {
      title: '完善中',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 0,    // 可选的, 默认值是 1
      children: [
        '/building/',
      ]
    }
  ]
}